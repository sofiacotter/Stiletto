import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PostpopComponent } from '../postpop/postpop.component';
import { Router } from '@angular/router';
import { Comment} from 'src/app/details';
import { FireService } from 'src/app/services/fire.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {




  @Input()
  uid: string;

  @Input()
  idpost: string;

  @Input()
  username: string;

  @Input()
  profilephoto: string;

  @Input()
  imagepath: string;

  @Input()
  description: string;

  @Input()
  hashtags: string;

  @Input()
  datetime: string;

  @Input()
  saves: string[];

  @Input()
  likes: string[];

  @Input()
  comments: Comment[];

  myUid: string;
  isSaved: boolean;
  isLiked: boolean;
  nsaves: number;
  nlikes: number;
  
 
 







  constructor(private popCtrl: PopoverController, private router: Router, private fser: FireService) {}


  ngOnInit() {
    this.myUid = this.fser.getUid();
    this.nsaves = this.saves.length;
    this.nlikes = this.likes.length;
    if(this.likes.includes(this.myUid)) this.isLiked = true;
    if(!this.likes.includes(this.myUid)) this.isLiked = false;
    if(this.saves.includes(this.myUid)) this.isSaved = true;
    if(!this.saves.includes(this.myUid)) this.isSaved = false;
  }



  async OpenPostOptions(ev: any){
    console.log("Here are your options...");
    const popover = await this.popCtrl.create({
      component: PostpopComponent,
      event: ev
      });
      return await popover.present();
  }


  OpenComments(){
    this.router.navigate(["/comments",{id: this.idpost}]);
  }




  Like(){
    if (this.isLiked){
      this.fser.Deslike(this.idpost, this.likes).then( res => {
        this.isLiked = false;
        this.nlikes -= 1;
        console.log("isLiked: ", this.isLiked);

      }, err => {
        console.log("ERRO AO DAR LIKE!");
      })
    } 
    else{
      this.fser.Like(this.idpost, this.likes).then( res => {
        this.isLiked = true;
        this.nlikes += 1;
        console.log("isLiked: ", this.isLiked);

      }, err => {
        console.log("ERRO AO DAR LIKE!");
      })
    }
  }








  Save(){
    if (this.isSaved){
      this.fser.UnsaveUserInPost(this.idpost, this.saves).then( res => {
      }, err => {
        console.log("ERRO AO DAR UNSAVE 1!");
      })
      this.fser.Unsave(this.idpost).then( res => {
      }, err => {
        console.log("ERRO AO DAR UNSAVE 2!");
      })
      this.nsaves -= 1;
      this.isSaved = false;
    } 

    else{
      this.fser.Save(this.idpost, this.imagepath).then( res => {
      }, err => {
        console.log("ERRO AO DAR SAVE 1!");
      })
      this.fser.SaveUserInPost(this.idpost, this.saves).then( res => {
      }, err => {
        console.log("ERRO AO DAR SAVE 2!");
      })
      this.nsaves += 1;
      this.isSaved = true;
    }
    console.log("isSaved: ", this.isSaved);
  }









  GoToProfilePage(){
    console.log("GoToProfilePage()!");
    this.router.navigate(["/profileother/"+this.uid]);
  }


}
