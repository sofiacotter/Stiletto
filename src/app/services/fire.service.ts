import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { userDetails } from '../details';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

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





  getUid(){
    return firebase.auth().currentUser.uid;
  }






  createUsername(details: userDetails){

    let currentUser = firebase.auth().currentUser;
    details = {...details, uid:currentUser.uid}

    return this.af.collection('userDetails').doc(currentUser.uid).set(details);
  }

  getUsernames(){
    return this.af.collectionGroup('userDetails').snapshotChanges();
  }

  getUserDetails(){
    let currentUser = firebase.auth().currentUser;
    console.log("getUserDetails() --> ", this.af.collection('userDetails', ref => ref.where('uid', '==', currentUser.uid)).snapshotChanges());
    return this.af.collection('userDetails', ref => ref.where('uid', '==', currentUser.uid)).snapshotChanges();
  }


  getSearchResults(category: string){
    console.log("getSearchResults() --> ", this.af.collection('searches').doc(category).collection('Posts').snapshotChanges());
    return this.af.collection('searches').doc(category).collection('Posts').snapshotChanges();
  }


  getProfilePictures(){
    let uid = firebase.auth().currentUser.uid;
    console.log("getProfilePictures() --> ", this.af.collection('profiles').doc(uid).collection('Posts').snapshotChanges());
    return this.af.collection('profiles').doc(uid).collection('Posts').snapshotChanges();
  }



  getPost(idpost: string){
    console.log("getPost() --> ", this.af.collection('posts', ref => ref.where('idpost', '==', idpost)).snapshotChanges());
    return this.af.collection('posts', ref => ref.where('idpost', '==', idpost)).snapshotChanges();

  }



  getUsersLikes(idpost: string){
    console.log("getUsersLikes() --> ", this.af.collection('likes').doc(idpost).collection('users').snapshotChanges());
    return this.af.collection('likes').doc(idpost).collection('users').snapshotChanges();
  }


  
  getSavesByPost(idpost: string){
    console.log("getSavesByPost() --> ", this.af.collection('savesByPost').doc(idpost).collection('users').snapshotChanges());
    return this.af.collection('savesByPost').doc(idpost).collection('users').snapshotChanges();

  }



  getSavesByUser(){
    let uid = firebase.auth().currentUser.uid;
    console.log("getSavesByUser() --> ", this.af.collection('saves').doc(uid).collection('posts').snapshotChanges());
    return this.af.collection('saves').doc(uid).collection('posts').snapshotChanges();
  }




  Like(idpost:string){

    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('likes').doc(idpost).collection('users').doc(userID).set({uid: userID});
  }

  Deslike(idpost:string){

    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('likes').doc(idpost).collection('users').doc(userID).delete();
  }





  SavePostInUser(idpost:string, filename:string){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('saves').doc(userID).collection('posts').doc(idpost).set({
      uid: userID,
      imagepath: filename
    });
  }

  SaveUserInPost(idpost: string){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('savesByPost').doc(idpost).collection('users').doc(userID).set({uid: userID});
  }





  UnsaveUserInPost(idpost:string){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('savesByPost').doc(idpost).collection('users').doc(userID).delete();
  }


  UnsavePostInUser(idpost: string){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('saves').doc(userID).collection('posts').doc(idpost).delete();
  }



  // Usar para obter a contagem de comentários
  getComments(idpost: string){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('comments').doc(idpost).collection('commentsInPost').snapshotChanges();
  }


  WriteComment(idpost: string, username1: string, imagepath1: string, comment1: string){
    const datetime = new Date().toJSON("yyyy/MM/dd HH:mm");
    const hour = datetime.slice(0, 10);
    const time = datetime.slice(11, 19);
    const publicationDate = hour + " " + time;
    console.log("Data de Publicação: ", publicationDate);
    return this.af.collection('comments').doc(idpost).collection('commentsInPost').add({
      username: username1,
      imagepath: imagepath1,
      datetime: publicationDate,
      comment: comment1
    });
  }










  










  /* Observable base API with Reactive
  valueChanges() ----> Retorna um Observale. Valores da coleção e não o id dela. Vantagem:
  A conexão à database é em tempo-real, ou seja, se houver algum update, ocorre logo a
  mudança. Vários valores são enviados no tempo. Ligação permanentemente aberta e em procura
  de mudanças. Não se recebem metadados (ids). Usar para display de dados numa aplicação.

  snapshotChanges() ---->

  get() ---->



  The major difference between valuechanges() and snapshotChanges() is that 
  the later one provides us with unique document ID assigned to document whereas 
  the former one only supplies us with document values but not with document id.
  */




  getCategories() {
    console.log("Received: ", this.af.collection('categories'));
    //return this.af.collection('categories');
    return this.af.collection('categories').snapshotChanges();
    //af.collection('items', ref => ref.where('size', '==', 'large'))
    //return this.af.collection('categories').doc(currentUser.uid).collection('tasks').snapshotChanges();
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
