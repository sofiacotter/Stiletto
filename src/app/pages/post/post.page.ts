import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { PostpopComponent } from 'src/app/components/postpop/postpop.component';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  image: string;
  username:string;
  avatar: string;
  nsaved: number;
  nliked: number;
  ncommented: number;
  description: string;
  hashtags: string;

  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private location: Location, private popCtrl: PopoverController) {
    
  }

  ngOnInit() {
    this.image = "../assets/images/flowerpower.jpg";
    this.avatar = "../assets/images/cottagecore1.jpeg";
    this.nsaved = 31;
    this.nliked = 345;
    this.ncommented = 28;
    this.username = 'sofiacotter'
    this.description = "I took this lovely outfit to a picnic and my friends adored it! Yellow is my favorite color now. Let´s show the world that dressing flower patterns is not cheesy :p";
    this.hashtags = "#art #flowerpower #vintage";
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

}
