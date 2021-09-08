import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { userDetails } from '../details';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private snapshotChangesSubscription: any;
  private idpostRandom: string;
 
  constructor(public af: AngularFirestore, private storage: AngularFireStorage) {
   }


   unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    console.log("Snapshot: ", this.snapshotChangesSubscription);
    this.snapshotChangesSubscription.unsubscribe();
  }





  getUid(){return firebase.auth().currentUser.uid;}



  
  getCategories() {
    console.log("Received: ", this.af.collection('categories'));
    //return this.af.collection('categories');
    return this.af.collection('categories').snapshotChanges();
    //af.collection('items', ref => ref.where('size', '==', 'large'))
    //return this.af.collection('categories').doc(currentUser.uid).collection('tasks').snapshotChanges();
  }

  getReviews(idgame: string) {
    return this.af.collection('Reviews', ref => ref.where('idgame', '==', idgame)).snapshotChanges();
  }

  writeReview(idgame: string, myusername: string, myavatar: string, myreview: string, myscore: number) {
    const datetime = new Date().toJSON("yyyy/MM/dd HH:mm");
    const hour = datetime.slice(0, 10);
    const time = datetime.slice(11, 19);
    const publicationDate = hour + " " + time;
    console.log("Data de Publicação: ", publicationDate);
    return this.af.collection('Reviews').doc(idgame).set({
      idgame: idgame,
      uid: firebase.auth().currentUser.uid,
      username: myusername,
      avatar: myavatar,
      review: myreview,
      score: myscore,
      publishdate: publicationDate
    });
  }

  writeCommentReview(idgame: string, idreview: string, myusername: string, myavatar: string, mycomment: string) {
    const datetime = new Date().toJSON("yyyy/MM/dd HH:mm");
    const hour = datetime.slice(0, 10);
    const time = datetime.slice(11, 19);
    const publicationDate = hour + " " + time;
    console.log("Data de Publicação: ", publicationDate);
    return this.af.collection('Reviews').doc(idgame).collection('Comments').add({
      idreview: idreview,
      uid: firebase.auth().currentUser.uid,
      username: myusername,
      avatar: myavatar,
      comment: mycomment,
      publishdate: publicationDate
    });
  }









  /* REGISTO E LOGIN */
  
  createUsername(details: userDetails){
    let currentUser = firebase.auth().currentUser;
    details = {...details, uid:currentUser.uid}
    return this.af.collection('userDetails').doc(currentUser.uid).set(details);
  }

  getUsernames(){
    return this.af.collectionGroup('userDetails').snapshotChanges();
  }

  getUserDetails(uid: string){
    //let currentUser = firebase.auth().currentUser;
    console.log("getUserDetails() --> ", this.af.collection('userDetails', ref => ref.where('uid', '==', uid)).snapshotChanges());
    return this.af.collection('userDetails', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }



  getSearchResults(category: string){
    console.log("getSearchResults() --> ", this.af.collection('searches').doc(category).collection('Posts').snapshotChanges());
    return this.af.collection('searches').doc(category).collection('Posts').snapshotChanges();
  }


  getProfilePictures(uid: string){
    //return this.af.collection('profiles').doc(uid).collection('Posts').snapshotChanges();
    /*
    return this.af.collection('profiles').doc(uid).collection('posts', ref => {
      return ref.orderBy("datetime", "desc");
   }).get(); */

    const bb = this.af.collection('profiles').doc(uid).collection('Posts', ref => ref.orderBy('datetime', 'desc'));
    return bb.snapshotChanges();
  }




  getPost(idpost: string){
    console.log("getPost() --> ", this.af.collection('posts', ref => ref.where('idpost', '==', idpost)).snapshotChanges());
    return this.af.collection('posts', ref => ref.where('idpost', '==', idpost)).snapshotChanges();
  }


  loadMorePosts(users: string[], lastPostShowedDate:Date){
    var today = lastPostShowedDate;
    console.log(" lastPostShowedDate: ",  lastPostShowedDate);
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), lastPostShowedDate.getDate() - 7);
    return this.af.collection('posts', ref => {
      return ref
             .where('uid', 'in', users)
             .where('datetime', '<', today)
             .where('datetime', '>', lastWeek).orderBy("datetime", "desc").limit(5);
   }).get();
  }

  getFirstTimelinePost(users: string[]){
    var today = new Date();
    return this.af.collection('posts', ref => {
      return ref
             .where('uid', 'in', users)
             .where('datetime', '<', today).orderBy("datetime", "desc").limit(1);
   }).get();
  }


  







  /* MÉTODOS DE LIKE */

  Like(idpost:string, likesList: string[]){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('posts').doc(idpost).update({
      likes: [...likesList, userID]
    });
  }

  Deslike(idpost:string, likesList: string[]){
    let userID = firebase.auth().currentUser.uid;
    //index = likesList.indexOf(userID);
    return this.af.collection('posts').doc(idpost).update({
      likes: likesList.filter(function(uid) { return uid != userID; })
    });
  }



  /* MÉTODOS DE SAVE */

  GetSavesByUser(){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('saves').doc(userID).collection('posts').snapshotChanges();
  }

  Save(idpost:string, filename:string){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('saves').doc(userID).collection('posts').doc(idpost).set({
      uid: userID,
      imagepath: filename
    });
  }

  Unsave(idpost: string){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('saves').doc(userID).collection('posts').doc(idpost).delete();
  }

  SaveUserInPost(idpost: string, savesList: string[]){
    let userID = firebase.auth().currentUser.uid;
    return this.af.collection('posts').doc(idpost).update({
      saves: [...savesList, userID]
    });
  }

  UnsaveUserInPost(idpost:string, savesList: string[]){
    let userID = firebase.auth().currentUser.uid;
    let index = savesList.indexOf(userID);
    return this.af.collection('posts').doc(idpost).update({
      saves: savesList.filter(function(uid) { return uid != userID; })
    });
  }





  /* MÉTODOS DE COMENTÁRIOS */

  WriteComment(idpost: string, username1: string, imagepath1: string, comment1: string){
    const datetime = new Date().toJSON("yyyy/MM/dd HH:mm");
    const hour = datetime.slice(0, 10);
    const time = datetime.slice(11, 19);
    const publicationDate = hour + " " + time;
    console.log("Data de Publicação: ", publicationDate);
    return this.af.collection('posts').doc(idpost).collection('Comments').add({
      uid: firebase.auth().currentUser.uid,
      username: username1,
      imagepath: imagepath1,
      datetime: publicationDate,
      comment: comment1
    });
  }

  getCommentsInPost(idpost: string){
    return this.af.collection('posts').doc(idpost).collection("Comments").snapshotChanges();
  }








  Follow1(otherUid: string, followingList: string[]){
    let myID = firebase.auth().currentUser.uid;
    return this.af.collection('userDetails').doc(myID).update({
      following: [...followingList, otherUid]
    });
  }


  Follow2(otherUid: string, followersList: string[]){
    let myID = firebase.auth().currentUser.uid;
    return this.af.collection('userDetails').doc(otherUid).update({
      followers: [...followersList, myID]
    });
  }

  /*
  return this.af.collection('posts').doc(idpost).update({
      saves: savesList.filter(function(uid) { return uid != userID; })
    });
  */
  Unfollow1(otherUid: string, followingList: string[]){
    let myID = firebase.auth().currentUser.uid;
    return this.af.collection('userDetails').doc(myID).update({
      following: followingList.filter(function(uid) { return uid != otherUid; })
    });
  }

  //followings --> id --> Os que o id anterior segue
  Unfollow2(otherUid: string, followersList: string[]){
    let myID = firebase.auth().currentUser.uid;
    return this.af.collection('userDetails').doc(otherUid).update({
      followers: followersList.filter(function(uid) { return uid != myID; })
    });
  }















   UploadToStorage(photoBase64String: string, filename: string){
    var donwloadURLFinal = "";
    var uploadTask = firebase.storage().ref('uploaded/'+filename).putString(photoBase64String, 'base64');

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      console.log("ERROR!! Upload was not done...")
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        donwloadURLFinal = downloadURL;
      });
    });
    return donwloadURLFinal;
  }


  /*
  async getPhotoUrl(filename: string) {
    return this.storage.refFromURL('gs://stiletto-5b547.appspot.com/uploaded/'+filename).getDownloadURL().toPromise();
  }
  */





  PublishPost(usern: string, profilep: string, hash: string, desc: string, filename: string){
    let userID = firebase.auth().currentUser.uid;
    this.idpostRandom = this.af.createId();
    return this.af.collection('posts').doc(this.idpostRandom).set({
      idpost: this.idpostRandom,
      uid: userID,
      imagepath: filename,
      datetime: firebase.firestore.Timestamp.fromDate(new Date()),
      hashtags: hash,
      description: desc,
      likes: [],
      saves: [],
      profilephoto: profilep,
      username: usern
    });
  }

  PublishPostSearch(category: string, filename: string){
    return this.af.collection('searches').doc(category).collection('Posts').doc(this.idpostRandom).set({
      idpost: this.idpostRandom,
      imagepath: filename,
    });
  }

  PublishPostProfile(uid: string, filename: string){
  
    return this.af.collection('profiles').doc(uid).collection('Posts').doc(this.idpostRandom).set({
      idpost: this.idpostRandom,
      datetime: firebase.firestore.Timestamp.fromDate(new Date()),
      imagepath: filename,
    }); 
  }








  RemovePostPosts(idpost: string){
    return this.af.collection('posts').doc(idpost).delete();
  }
  RemovePostSearch(idpost: string, category: string){
    console.log("REMOVEPOSTSEARCH");
    return this.af.collection('searches').doc(category).collection('Posts').doc(idpost).delete();
  }
  RemovePostProfile(idpost: string, uid: string){
    console.log("REMOVEPOSTSEARCH");
    return this.af.collection('profiles').doc(uid).collection('Posts').doc(idpost).delete();
  }
  RemovePostFromSaves(idpost: string){
    let userID = firebase.auth().currentUser.uid;
    console.log("REMOVEPOSTSAVES");
    return this.af.collection('saves').doc(userID).collection('posts').doc(idpost).delete();
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

}


