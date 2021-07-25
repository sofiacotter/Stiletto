import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import firebase from 'firebase/app';
import { userDetails } from '../details';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private snapshotChangesSubscription: any;
  
  constructor(public af: AngularFirestore) {
    
   }


   unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    console.log("Snapshot: ", this.snapshotChangesSubscription);
    this.snapshotChangesSubscription.unsubscribe();
  }


  createUsername(details: userDetails){
    return this.af.collection('userDetails').add(details);
  }

  getUsernames(){
    return this.af.collectionGroup('userDetails').snapshotChanges()
  }
}






/*
getTasks() {
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
  }




  createTask(t: Task) {
    let currentUser = firebase.auth().currentUser;
    return this.af.collection('people').doc(currentUser.uid).collection('tasks').add(t);
  }




  updateTask(TaskID: any, t: Task) {
    let currentUser = firebase.auth().currentUser;

    this.af.collection('people').doc(currentUser.uid).collection('tasks').doc(TaskID).set(t);
    //this.af.doc('tasks/' + TaskID).update(t);
  }


  

  deleteTask(TaskID: any) {
    let currentUser = firebase.auth().currentUser;

    this.af.collection('people').doc(currentUser.uid).collection('tasks').doc(TaskID).delete();
    //this.af.doc('tasks/' + TaskID).delete();
  }

*/
