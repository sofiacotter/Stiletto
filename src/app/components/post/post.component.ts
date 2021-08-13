import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PostpopComponent } from '../postpop/postpop.component';
import { Router } from '@angular/router';
import { CommentsResults, PostInfo } from 'src/app/details';
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
  ncommented: number;

  @Input()
  nlikes: number;

  @Input()
  nsaves: number;

  @Input()
  isSaved: boolean;

  @Input()
  isLiked: boolean;



  constructor(private popCtrl: PopoverController, private router: Router, private fser: FireService) {}

  ngOnInit() {
    this.ncommented += 2;
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
      this.fser.SavePostInUser(this.idpost, this.imagepath).then( res => {
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









  GoToProfilePage(){
    console.log("GoToProfilePage()!");
    this.router.navigate(["/profileother/"+this.uid]);
  }


}
