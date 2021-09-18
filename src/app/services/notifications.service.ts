import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { FireService } from './fire.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private router: Router,
    private fser: FireService,
    private platform: Platform,
    private toastController: ToastController
  ) {}

  async presentToast(message) {
    const toast = await this.toastController.create({
      header: message.title,
      message: "They said: "+message.body,
      duration: 10000,
      color: 'dark',
      position: 'top'
    });
    toast.present();
  }

  public initNotifications() {
    if (this.platform.is('mobile')) {
      this.registerPushNotifications();
    }
  }

  private async registerPushNotifications() {
    await PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register().then(() =>
          console.log('Registered for push')
        );
      } else {
        console.error('Failed to register PushNotifications');
      }
    });

    // On success, we get our token which can be used on firestore
    await PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      this.fser.setToken(token.value);  
    });

    // Some issue with our setup and push will not work
    await PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //fazer com toast
        this.presentToast(notification);
        console.log('toast presented', JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    /* A ideia é fazer um routing ao Post quando o utilizador clicar na notifição */
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        this.router.navigate(["/post/" + notification.notification.data.idpost]);
      }
    );
  }
}