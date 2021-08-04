import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingspopComponent } from 'src/app/components/settingspop/settingspop.component';
import { PopoverController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import firebase from 'firebase/app';
import { isNgTemplate } from '@angular/compiler';
import { userDetails } from 'src/app/details';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  profilepic: string;
  images: string[];
  nposts: number;
  nfollowing: number;
  nfollowers: number;
  public userInfo: userDetails = null;
  public isLoaded=false;



  constructor(private router: Router, private popCtrl: PopoverController,
    private fser: FireService, private authService: FireauthService) {
    //this.username = "SofiaCotter";
    //this.profilepic = "../assets/images/cottagecore1.jpeg";
    this.nposts = 15;
    this.nfollowers = 456;
    this.nfollowing = 36;
    this.images = ["../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
      "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg"];
  }




  ngOnInit() {
      this.fser.getUserDetails().subscribe(data => {
        console.log(data)
        data.map(e => {
          this.userInfo = {

            uid: e.payload.doc.data()['uid'],
            email: e.payload.doc.data()['email'],
            username: e.payload.doc.data()['username'],
            profilephoto: e.payload.doc.data()['profilephoto']
          };
        });
        this.isLoaded = true;
        console.log("User Info: ", this.userInfo);
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


  OpenPost() {
    console.log("You clicked on an image!");
    this.router.navigate(["/post"]);
  }
}
