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
  nfollowing: number = 0;
  nfollowers: number = 0;
  public isLoaded1 =false;
  public isLoaded2 =false;
  public isLoaded3 =false;
  public isLoaded4 =false;
  public results: SearchResults[] = [];
  public isFollow: boolean = false;
  public userInfo: userDetails = null;
  public followers: string [] = [];
  public followings: string [] = [];



  constructor(private router: Router, private popCtrl: PopoverController,
    private fser: FireService, private location: Location,  
    private activatedRoute: ActivatedRoute) {

    
  }




  ngOnInit() {

    this.uid = this.activatedRoute.snapshot.paramMap.get('uid'); 
    this.myUid = this.fser.getUid();





    this.fser.getUserDetails(this.uid).subscribe(data => {
      data.map(e => {
        this.userInfo = {

          uid: e.payload.doc.data()['uid'],
          email: e.payload.doc.data()['email'],
          username: e.payload.doc.data()['username'],
          profilephoto: e.payload.doc.data()['profilephoto']
        };
      });
      this.isLoaded1 = true;
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



    this.fser.GetFollowers(this.uid).subscribe(data => {
      this.followers = [];
      data.map(e => {
        this.followers.push(e.payload.doc.data()['uid']);
      });
      this.nfollowers = this.followers.length;
      this.isLoaded3 = true;
      if(this.followers.includes(this.myUid)){
        this.isFollow = true;
      }
      else{
        this.isFollow = false;
      }
    });

    this.fser.GetFollowings(this.uid).subscribe(data => {
      this.followings = [];
      data.map(e => {
        this.followings.push(e.payload.doc.data()['uid']);
      });
      this.nfollowing = this.followings.length;
      this.isLoaded4 = true;
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
    this.fser.Follow1(this.uid).then( res => {
    }, err => {
      console.log("ERRO AO FOLLOW 1!");
    })
    this.fser.Follow2(this.uid).then( res => {
    }, err => {
      console.log("ERRO AO FOLLOW 2!");
    });
  }


  Unfollow(){
    this.isFollow = false;
    this.fser.Unfollow1(this.uid).then( res => {
    }, err => {
      console.log("ERRO AO UNFOLLOW 1!");
    })
    this.fser.Unfollow2(this.uid).then( res => {
    }, err => {
      console.log("ERRO AO UNFOLLOW 2!");
    });
  }









  BackPage(){
    this.location.back();
    //this.router.navigate(["/tabs/search"]);
  }
}