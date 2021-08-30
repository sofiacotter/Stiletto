import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { FireService } from 'src/app/services/fire.service';
import { Comment, userDetails } from 'src/app/details';
import { stringify } from '@angular/compiler/src/util';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  myUid:string;
  idpost: any;
  public userInfo: userDetails = null;
  public isLoaded1 = false;
  public isLoaded2 = false;
  public commentList: Comment[] = [];
  validations_form: FormGroup;

  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private activatedRouter: ActivatedRoute, 
    private location: Location, private fser: FireService, 
    private formBuilder: FormBuilder, public toastController: ToastController) {

    this.idpost = this.activatedRouter.params.subscribe(params => {
      this.idpost = params['id']; 
      console.log("Id: ", this.idpost);
    });
  }





  ngOnInit() {
    this.myUid = this.fser.getUid();



    this.validations_form = this.formBuilder.group({
      comment: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(1)
      ])),
    });





    // BUSCAR A MINHA INFO
    this.fser.getUserDetails(this.myUid).subscribe(data => {
      console.log(data)
      data.map(e => {
        this.userInfo = {
          uid: e.payload.doc.data()['uid'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          profilephoto: e.payload.doc.data()['profilephoto'],
          followers: e.payload.doc.data()['followers'],
          following: e.payload.doc.data()['following']
        };
      });
      this.isLoaded1 = true;
      console.log("User Info: ", this.userInfo);
    });



   
    


    // BUSCAR COMENTÁRIOS JÁ FEITOS
    this.fser.getCommentsInPost(this.idpost).subscribe(data => {
      console.log(data)
      this.commentList = [];
      data.map(e => {
        this.commentList.push({
          uid: e.payload.doc.data()['uid'],
          username: e.payload.doc.data()['username'],
          imagepath: e.payload.doc.data()['imagepath'],
          comment: e.payload.doc.data()['comment'],
          datetime: e.payload.doc.data()['datetime']
        });
      });
      this.isLoaded2 = true;
      console.log("Comments made: ", this.commentList);
    });
  }








  BackPage(){
    this.location.back();
    //this.router.navigate(["/tabs/search"]);
  }





  SendComment(){
    let commentstring = this.validations_form.controls['comment'].value;
    this.fser.WriteComment(this.idpost, this.userInfo.username, this.userInfo.profilephoto, commentstring).then( async res => {

        const toast = await this.toastController.create({
          message: 'Your comment was posted!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present();
        this.validations_form.controls['comment'].reset();

    }, async err => {
      const toast = await this.toastController.create({
        message: 'An error occured! Try again.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      console.log("ERRO AO COMENTAR!");
    })
  }



  GoToProfilePage(uid: string){
    console.log("Clicou em GoToProfilePage()!");
    if(this.myUid === uid){
        console.log("It´s the same user!");
        //this.router.navigate(["/tabs/profile"]);
    }
    else{
        console.log("It´s a different user! "+ uid);
        this.router.navigate(["/profileother/"+uid]);
    }
  }

}
