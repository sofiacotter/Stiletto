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
  nposts: number;
  nfollowing: number;
  nfollowers: number;
  public isLoaded1 =false;
  public isLoaded2 =false;
  public results: SearchResults[] = [];
  public isFollow: boolean = false;
  public userInfo: userDetails = null;



  constructor(private router: Router, private popCtrl: PopoverController,
    private fser: FireService, private location: Location,  
    private activatedRoute: ActivatedRoute) {
    this.nfollowers = 456;
    this.nfollowing = 36;

    
  }




  ngOnInit() {

    this.uid = this.activatedRoute.snapshot.paramMap.get('uid'); 





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



  Follow(){
    if(!this.isFollow) {
      this.isFollow = true;
    }
    else {
      this.isFollow = false;
    }
    console.log("Follow: ", this.isFollow);
  }



  BackPage(){
    this.location.back();
    //this.router.navigate(["/tabs/search"]);
  }
}