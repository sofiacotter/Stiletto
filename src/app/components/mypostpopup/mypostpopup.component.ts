import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-mypostpopup',
  templateUrl: './mypostpopup.component.html',
  styleUrls: ['./mypostpopup.component.scss'],
})
export class MypostpopupComponent implements OnInit {


  @Input() idpost: string;
  @Input() hashtags: string;
  @Input() uid: string;
  @Input() popover: PopoverController;

  categories: string[] = [];


  constructor(private fser: FireService, private router: Router, public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
 
    const arr1 = this.hashtags.split(" ");
    
    for (let i = 0; i < arr1.length; i++) {
      const element = arr1[i];
      const elementSliced = element.slice(1, element.length);
      this.categories.push(elementSliced[0].toUpperCase() + elementSliced.slice(1, elementSliced.length));
    }

    console.log("Categorias: ", this.categories);
    console.log("ROUTER: ", this.router);
  }



  async RemovePost(){
    console.log("Idpost: ", this.idpost);


    
    // Eliminar post dos searches
    for (let i = 0; i < this.categories.length; i++) {
      this.fser.RemovePostSearch(this.idpost, this.categories[i]).then(res => {
        console.log("POST REMOVED SUCCESSFULLY FROM SEARCH");
      }, err => {
        console.log("ERROR REMOVING POST FROM SEARCH");
      });
    }



    // Eliminar post individual
    this.fser.RemovePostPosts(this.idpost).then(res => {
      console.log("POST REMOVED SUCCESSFULLY");
    }, err => {
      console.log("ERROR REMOVING POST");
    });

    // Eliminar post de perfil
    this.fser.RemovePostProfile(this.idpost, this.uid).then(res => {
      console.log("POST REMOVED SUCCESSFULLY FROM PROFILE");
    }, err => {
      console.log("ERROR REMOVING POST FROM PROFILE");
    });

    // Eliminar post dos meus salvados
    this.fser.RemovePostFromSaves(this.idpost).then(res => {
      console.log("POST REMOVED SUCCESSFULLY FROM SAVES (THIS USER)");
    }, err => {
      console.log("ERROR REMOVING POST FROM PROFILE");
    });




    /*
    const toast = await this.toastController.create({
      message: 'Your post is being deleted! Please wait...',
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    toast.present();
    
    */
    this.popover.dismiss();
    await this.delay(3000);
    this.router.navigate(["/tabs/timeline"]);
  
     

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }





  async popupAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure',
      message: 'you want to eliminate this post permanently?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('CANCEL');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('OKAY DELETE');
            this.RemovePost();
          }
        }
      ]
    });

    await alert.present();
  }

}
