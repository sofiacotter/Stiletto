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

  nposts: number = 0;
  public userInfo: userDetails = null;
  public isLoaded1 =false;
  public isLoaded2 =false;
  public results: SearchResults[] = [];
  uid:string;



  constructor(private router: Router, private popCtrl: PopoverController,
    private fser: FireService, private authService: FireauthService) {
  }




  ngOnInit() {

    this.uid = this.fser.getUid();



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
        console.log("User Info: ", this.userInfo);
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
