import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingspopComponent } from 'src/app/components/settingspop/settingspop.component';
import { PopoverController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import firebase from 'firebase/app';
import { isNgTemplate } from '@angular/compiler';
import { SearchResults, userDetails } from 'src/app/details';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  profilepic: string;
  nposts: number;
  nfollowing: number;
  nfollowers: number;
  public userInfo: userDetails = null;
  public isLoaded1 =false;
  public isLoaded2 =false;
  public results: SearchResults[] = [];



  constructor(private router: Router, private popCtrl: PopoverController,
    private fser: FireService, private authService: FireauthService) {
    this.nfollowers = 456;
    this.nfollowing = 36;
  }




  ngOnInit() {
      this.fser.getUserDetails().subscribe(data => {
        data.map(e => {
          this.userInfo = {

            uid: e.payload.doc.data()['uid'],
            email: e.payload.doc.data()['email'],
            username: e.payload.doc.data()['username'],
            profilephoto: e.payload.doc.data()['profilephoto']
          };
        });
        this.isLoaded1 = true;
        console.log("User Info: ", this.userInfo);
      });



      this.fser.getProfilePictures().subscribe(data => {
        data.map(e => {
          this.results.push({
            //idpost: e.payload.doc.id,
            idpost: e.payload.doc.data()['idpost'],
            imagepath: e.payload.doc.data()['imagepath'],
          });
        });
        this.nposts = this.results.length;
        this.isLoaded2 = true;
        console.log("Results Found: ", this.results);
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
}
