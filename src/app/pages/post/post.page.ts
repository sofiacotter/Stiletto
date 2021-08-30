import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { PostpopComponent } from 'src/app/components/postpop/postpop.component';
import { PopoverController } from '@ionic/angular';
import { Comment, PostInfo, userDetails } from 'src/app/details';
import { FireService } from 'src/app/services/fire.service';


@Component({
  selector: 'app-post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  idpost: string; 
  public isLoaded = false;
  public isLiked: boolean;
  public isSaved: boolean;
  public commentsList: Comment[] = [];
  public userInfo: userDetails = null;
  myUid: string;
  postInfo: PostInfo;
  public dateString: string;

  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private location: Location, 
    private popCtrl: PopoverController, private activatedRoute: ActivatedRoute,
    private fser: FireService) {
    
      //this.idpost = "CCJSlDnG7vecDDHLyXgC";
      console.log("Idpost post.page: ", this.idpost);
      this.idpost = this.activatedRoute.snapshot.paramMap.get('idpost'); 
  }




  ngOnInit() {
    this.myUid = this.fser.getUid();
    console.log("My UID: ", this.myUid);


    /*
    BUSCAR POST + COMENTÁRIOS
    */
    this.fser.getPost(this.idpost).subscribe(data => {
      data.map(e => {
        console.log("GetPosts() data raw ----> ", e.payload.doc.data());
        this.postInfo = {
          uid: e.payload.doc.data()['uid'],
          idpost: e.payload.doc.id,
          imagepath: e.payload.doc.data()['imagepath'],
          username: e.payload.doc.data()['username'],
          profilephoto: e.payload.doc.data()['profilephoto'],
          description: e.payload.doc.data()['description'],
          hashtags: e.payload.doc.data()['hashtags'],
          datetime: e.payload.doc.data()['datetime'],
          likes: e.payload.doc.data()['likes'],
          saves: e.payload.doc.data()['saves'],
          comments: null
        };
      });
      this.fser.getCommentsInPost(this.idpost).subscribe(data => {
        console.log(data)
        this.commentsList = [];
        data.map(e => {
          this.commentsList.push({
            uid: e.payload.doc.data()['uid'],
            username: e.payload.doc.data()['username'],
            imagepath: e.payload.doc.data()['imagepath'],
            comment: e.payload.doc.data()['comment'],
            datetime: e.payload.doc.data()['datetime']
          });
        });

        let ts = this.postInfo.datetime.toDate();
        let date = `${ts.getDate()}/${ts.getMonth()}/${ts.getFullYear()}`; 
        let time = `${ts.getHours()}:${ts.getMinutes()}`; 
        this.dateString = date +  " " + time;
        this.isLoaded = true;
        console.log("Post Info: ", this.postInfo);
        console.log("Comments List: ", this.commentsList);
        // Definir se há LIKE ou SAVE neste post
        if(this.postInfo.likes.includes(this.myUid)) this.isLiked = true;
        if(!this.postInfo.likes.includes(this.myUid)) this.isLiked = false;

        if(this.postInfo.saves.includes(this.myUid)) this.isSaved = true;
        if(!this.postInfo.saves.includes(this.myUid)) this.isSaved = false;
      });
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
      this.fser.Deslike(this.idpost, this.postInfo.likes).then( res => {
        this.isLiked = false;
      }, err => {
        console.log("ERRO AO DAR LIKE!");
      })
    } 
    else{
      this.fser.Like(this.idpost, this.postInfo.likes).then( res => {
        this.isLiked = true;
      }, err => {
        console.log("ERRO AO DAR LIKE!");
      })
    }
    console.log("isLiked: ", this.isLiked);
  }








  Save(){
    if (this.isSaved){
      this.fser.UnsaveUserInPost(this.idpost, this.postInfo.saves).then( res => {
      }, err => {
        console.log("ERRO AO DAR UNSAVE 1!");
      })
      this.fser.Unsave(this.idpost).then( res => {
      }, err => {
        console.log("ERRO AO DAR UNSAVE 2!");
      })
      this.isSaved = false;
    } 







    else{
      this.fser.Save(this.idpost, this.postInfo.imagepath).then( res => {
      }, err => {
        console.log("ERRO AO DAR SAVE 1!");
      })
      this.fser.SaveUserInPost(this.idpost, this.postInfo.saves).then( res => {
      }, err => {
        console.log("ERRO AO DAR SAVE 2!");
      })
      this.isSaved = true;
    }
    console.log("isSaved: ", this.isSaved);
  }












  OpenComments(){
    this.router.navigate(["/comments",{id: this.idpost}]);
  }






  GoToProfilePage(){
    console.log("Clicou em GoToProfilePage()!");
    this.router.navigate(["/profileother/"+this.postInfo.uid]);
  }
}
