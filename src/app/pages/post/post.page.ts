import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { PostpopComponent } from 'src/app/components/postpop/postpop.component';
import { PopoverController } from '@ionic/angular';
import { CommentsResults, PostInfo, userDetails } from 'src/app/details';
import { FireService } from 'src/app/services/fire.service';


@Component({
  selector: 'app-post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  idpost: string; 
  nsaved: number = 0;
  nliked: number = 0;
  ncommented: number = 2;
  public isLoaded1 = false;
  public isLoaded2 = false;
  public isLoaded3 = false;
  public isLoaded4 = false;

  public isLiked: boolean;
  public isSaved: boolean;
  usernamesLiked: any[];
  usernamesSaves: any[];
  public comments: CommentsResults[] = [];
  public userInfo: userDetails = null;
  allSaves: any;
  uid: string;

  isUsernameLoaded: boolean = false;
  postInfo: PostInfo;

  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private location: Location, 
    private popCtrl: PopoverController, private activatedRoute: ActivatedRoute,
    private fser: FireService) {
    
      //this.idpost = "CCJSlDnG7vecDDHLyXgC";
      console.log("Idpost post.page: ", this.idpost);
      this.idpost = this.activatedRoute.snapshot.paramMap.get('idpost'); 
  }

  ngOnInit() {

    this.uid = this.fser.getUid();
    console.log("UID: ", this.uid);


    /*
    BUSCAR IMAGEM, USERNAME, DESCRIÇÃO, HASHTAGS, FOTO DE PERFIL E DATA/HORA
    */
    this.fser.getPost(this.idpost).subscribe(data => {
      data.map(e => {
        this.postInfo = {
          uid: e.payload.doc.data()['uid'],
          idpost: e.payload.doc.id,
          imagepath: e.payload.doc.data()['imagepath'],
          username: e.payload.doc.data()['username'],
          profilephoto: e.payload.doc.data()['profilephoto'],
          description: e.payload.doc.data()['description'],
          hashtags: e.payload.doc.data()['hashtags'],
          datetime: e.payload.doc.data()['datetime']
        };
      });
      this.isLoaded1 = true;
      console.log("Post Info: ", this.postInfo);
    });





    /*
    BUSCAR LISTA DE USERNAMES QUE DEU LIKE
    */
    this.fser.getUsersLikes(this.idpost).subscribe(data =>{
      this.usernamesLiked = data.map(e => {
        return  e.payload.doc.data()['uid']
      })
      this.isLiked = this.usernamesLiked.includes(this.uid);
      this.nliked = this.usernamesLiked.length;
      this.isLoaded2 = true;
      console.log("this.usernamesLiked: ", this.usernamesLiked);
      console.log("Likes: ", this.nliked);
    });




    /*retorna lista de uids que guardaram este post */
    this.fser.getSavesByPost(this.idpost).subscribe(data =>{
      this.usernamesSaves = data.map(e => {
        return  e.payload.doc.data()['uid']
      })
      this.isSaved = this.usernamesSaves.includes(this.uid);
      this.nsaved = this.usernamesSaves.length;
      this.isLoaded3 = true;
      console.log("this.usernamesSaves: ", this.usernamesSaves);
      console.log("Saved: ", this.nsaved);
    });









    // BUSCAR CONTAGEM DE COMENTÁRIOS
    this.fser.getComments(this.idpost).subscribe(data => {
      console.log(data)
      this.comments = [];
      data.map(e => {
        this.comments.push({
          username: e.payload.doc.data()['username'],
          imagepath: e.payload.doc.data()['imagepath'],
          comment: e.payload.doc.data()['comment'],
          datetime: e.payload.doc.data()['datetime']
        });
      });
      this.ncommented = 2 + this.comments.length;
      this.isLoaded4 = true;
      console.log("Comments made: ", this.comments);
    });



    this.fser.getUserDetails(this.uid).subscribe(data => {
      data.map(e => {
        this.userInfo = {

          uid: e.payload.doc.data()['uid'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          profilephoto: e.payload.doc.data()['profilephoto']
        };
      });
      this.isUsernameLoaded = true;  
    });

  }


















  BackPage(){
    this.location.back();
    //this.router.navigate(["/tabs/search"]);
  }



  async OpenPostOptions(ev: any){
    console.log("Here are your options...");

    const popover = await this.popCtrl.create({
      component: PostpopComponent,
      event: ev
      });
      
      return await popover.present();
  }



  Like(){
    if (this.isLiked){
      this.fser.Deslike(this.idpost).then( res => {
        this.isLiked = false;
      }, err => {
        console.log("ERRO AO DAR LIKE!");
      })
    } 
    else{
      this.fser.Like(this.idpost).then( res => {
        this.isLiked = true;
      }, err => {
        console.log("ERRO AO DAR LIKE!");
      })
    }
    console.log("Clicou no Like!");
    console.log("isLiked: ", this.isLiked);
  }








  Save(){

    if (this.isSaved){
      this.fser.UnsavePostInUser(this.idpost).then( res => {
      }, err => {
        console.log("ERRO AO DAR UNSAVE 1!");
      })
      this.fser.UnsaveUserInPost(this.idpost).then( res => {
      }, err => {
        console.log("ERRO AO DAR UNSAVE 2!");
      })
      this.isSaved = false;
    } 







    else{
      this.fser.SavePostInUser(this.idpost, this.postInfo.imagepath).then( res => {
      }, err => {
        console.log("ERRO AO DAR SAVE 1!");
      })
      this.fser.SaveUserInPost(this.idpost).then( res => {
      }, err => {
        console.log("ERRO AO DAR SAVE 2!");
      })
      this.isSaved = true;
    }





    console.log("Clicou no Save!");
    console.log("isSaved: ", this.isSaved);
  }












  OpenComments(){
    this.router.navigate(["/comments",{id: this.idpost}]);
  }






  GoToProfilePage(){
    console.log("GoToProfilePage()!");

    if(this.uid === this.postInfo.uid){
        console.log("It´s the same user!");
        //this.router.navigate(["/tabs/profile"]);
    }
    else{
        console.log("It´s a different user! "+ this.postInfo.uid);
        this.router.navigate(["/profileother/"+this.postInfo.uid]);
    }
  }

}
