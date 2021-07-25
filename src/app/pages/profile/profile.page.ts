import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingspopComponent } from 'src/app/components/settingspop/settingspop.component';
import { PopoverController } from '@ionic/angular';



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



  constructor(private router: Router, private popCtrl: PopoverController) {
    this.username = "SofiaCotter";
    this.profilepic = "../assets/images/cottagecore1.jpeg";
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
  }



  async OpenSettingsPopup(ev: any){
    console.log("Here are your options...");

    const popover = await this.popCtrl.create({
      component: SettingspopComponent,
      event: ev
      });
      
      return await popover.present();
  }


  OpenPost(){
    console.log("You clicked on an image!");
    this.router.navigate(["/post"]);
  }
}
