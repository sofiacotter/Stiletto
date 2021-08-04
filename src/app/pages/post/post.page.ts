import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { PostpopComponent } from 'src/app/components/postpop/postpop.component';
import { PopoverController } from '@ionic/angular';
import { PostInfo } from 'src/app/details';
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
  ncommented: number = 0;
  public isLoaded1 = false;
  public isLoaded2 = false;
  public isLoaded3 = false;

  public isLiked = false;
  public isSaved = false;
  usernamesLiked: any[];
  usernamesSaves: any[];
  postsSavedByMe: any[];
  uid: string;


  postInfo: PostInfo;

  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private location: Location, 
    private popCtrl: PopoverController, private activatedRoute: ActivatedRoute,
    private fser: FireService) {
    
      this.idpost = "CCJSlDnG7vecDDHLyXgC";
      console.log("IDPOST: ", this.idpost);
      //this.idpost = this.activatedRoute.snapshot.paramMap.get('idpost'); 
  }

  ngOnInit() {

    this.uid = this.fser.getUid();


    /*
    BUSCAR IMAGEM, USERNAME, DESCRIÇÃO, HASHTAGS, FOTO DE PERFIL E DATA/HORA
    */
    this.fser.getPost(this.idpost).subscribe(data => {
      data.map(e => {
        this.postInfo = {
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
      console.log("usernamesLiked: ", this.usernamesLiked);
      console.log("Likes: ", this.nliked);
    });




    /*
    BUSCAR LISTA DE USERNAMES QUE FEZ SAVE
    */
   /*
    this.fser.getUsersSaves(this.idpost).subscribe(data =>{
      this.usernamesSaves = data.map(e => {
        return  e.payload.doc.data()['uid']
      })
      this.isSaved = this.usernamesSaves.includes(this.uid);
      this.nsaved = this.usernamesSaves.length;
      this.isLoaded3 = true;
      console.log("usernamesSaved: ", this.usernamesSaves);
      console.log("Saved: ", this.nsaved);
    });
    */






    this.fser.getUsersSaves(this.idpost).subscribe(data =>{
      this.postsSavedByMe = data.map(e => {
        return  e.payload.doc.data()['idpost']
      })
      this.isSaved = this.postsSavedByMe.includes(this.idpost);
      this.isLoaded3 = true;
      console.log("PostsSavedByMe: ", this.postsSavedByMe);
      console.log("Saved: ", this.nsaved);
    });




  this.fser.getAllSaves(this.idpost);




    this.nsaved = 8;

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
    if (this.isLiked) this.isLiked = false;
    else this.isLiked = true;
    console.log("Clicou no Like!");
    console.log("isLiked: ", this.isLiked);
  }

  Save(){
    if (this.isSaved) this.isSaved = false;
    else this.isSaved = true;
    console.log("Clicou no Saved!");
    console.log("isSaved: ", this.isSaved);
  }

}
