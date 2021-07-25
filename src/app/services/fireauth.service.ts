import firebase from 'firebase/app';
import { FireService } from './fire.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})


export class FireauthService {
  constructor(
    private firebaseService: FireService,
    public afAuth: AngularFireAuth
  ) { }


  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email,
        value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email,
        value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  doLogout() {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.signOut()
        .then(() => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          console.log(error);
          reject();
        });
    })
  }
}