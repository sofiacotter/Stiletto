import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingspopComponent } from 'src/app/components/settingspop/settingspop.component';
import { PopoverController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { Location } from "@angular/common";
import { SearchResults, userDetails } from 'src/app/details';


@Component({
  selector: 'app-profileother',
  templateUrl: './profileother.page.html',
  styleUrls: ['./profileother.page.scss'],
})
export class ProfileotherPage implements OnInit {

  uid: string;
  myUid: string;
  nposts: number = 0;
  public isLoaded1 =false;
  public isLoaded2 =false;
  public results: SearchResults[] = [];
  public isFollow: boolean = false;
  public buttonFollowValid: boolean = true;
  public userInfo: userDetails = null;



  constructor(private router: Router, private popCtrl: PopoverController,
    private fser: FireService, private location: Location,  
    private activatedRoute: ActivatedRoute) {

    
  }




  ngOnInit() {

    this.uid = this.activatedRoute.snapshot.paramMap.get('uid'); 
    this.myUid = this.fser.getUid();


    //Se não for o meu user, revela o botão Follow
    if(this.uid === this.myUid){
      this.buttonFollowValid = false;
    }





    this.fser.getUserDetails(this.uid).subscribe(data => {
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
      if(this.userInfo.followers.includes(this.myUid)){
        this.isFollow = true;
      }
      else{
        this.isFollow = false;
      }
    });











    this.fser.getProfilePictures(this.uid).subscribe(data => {
      data.map(e => {
        this.results.push({
          //idpost: e.payload.doc.id,
          idpost: e.payload.doc.data()['idpost'],
          imagepath: e.payload.doc.data()['imagepath'],
        });
      });
      this.nposts = this.results.length;
      this.isLoaded2 = true;
    });

  }












  async OpenSettingsPopup(ev: any) {
    console.log("Here are your options...");

    const popover = await this.popCtrl.create({
      component: SettingspopComponent,
      event: ev
    });
    return await popover.present();
  }








  OpenPost(idpost: string){
    console.log("Idpost category.page: ", idpost);
    this.router.navigate(["/post/"+idpost]);
  }






  ClickOnFollow(){
    if(!this.isFollow) {
      this.Follow();
    }
    else {
      this.Unfollow();
    }
    console.log("Follow: ", this.isFollow);
  }



  Follow(){
    this.isFollow = true;
    this.fser.Follow1(this.uid, this.userInfo.following).then( res => {
    }, err => {
      console.log("ERRO AO FOLLOW 1!");
    })
    this.fser.Follow2(this.uid, this.userInfo.followers).then( res => {
    }, err => {
      console.log("ERRO AO FOLLOW 2!");
    });
  }


  Unfollow(){
    this.isFollow = false;
    this.fser.Unfollow1(this.uid, this.userInfo.following).then( res => {
    }, err => {
      console.log("ERRO AO UNFOLLOW 1!");
    })
    this.fser.Unfollow2(this.uid, this.userInfo.followers).then( res => {
    }, err => {
      console.log("ERRO AO UNFOLLOW 2!");
    });
  }









  BackPage(){
    this.location.back();
    //this.router.navigate(["/tabs/search"]);
  }
}