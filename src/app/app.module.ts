import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from "@angular/fire/storage";




export const firebaseConfig = {
  apiKey: "AIzaSyAJQDt2T1Bl6KrCoKJOAfb3q0Sun8z9dOQ",
  authDomain: "stiletto-5b547.firebaseapp.com",
  projectId: "stiletto-5b547",
  storageBucket: "stiletto-5b547.appspot.com",
  messagingSenderId: "691695889948",
  appId: "1:691695889948:web:e6aec6452cbdf05e0cf9d9",
  measurementId: "G-J3F01GCM0F"
};




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
   ],
   providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})



export class AppModule {}
