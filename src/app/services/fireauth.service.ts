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
    public afAuth: AngularFireAuth,
  ) { }


  doRegister(value) {
    return this.afAuth.createUserWithEmailAndPassword(
      value.email,
      value.password
    );
  }

  doLogin(value) {
    return this.afAuth.signInWithEmailAndPassword(value.email, value.password);
  }

  doLogout() {
    return this.afAuth.signOut();
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}