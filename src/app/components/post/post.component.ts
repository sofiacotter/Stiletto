import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PostpopComponent } from '../postpop/postpop.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {


  images: string[];
  image: string;
  username:string;
  avatar: string;
  nsaved: number;
  nliked: number;
  ncommented: number;
  description: string;
  hashtags: string;
  idpost: string;

  constructor(private popCtrl: PopoverController, private router: Router) {}

  ngOnInit() {
    this.idpost = "askaoskaoksoajisaisj";
    this.image = "../assets/images/flowerpower.jpg";
    this.avatar = "../assets/images/profilepics/profile2.jpeg";
    this.nsaved = 31;
    this.nliked = 345;
    this.ncommented = 2; //somar a este valor
    this.username = 'sofiacotter'
    this.description = "I took this lovely outfit to a picnic and my friends adored it! Yellow is my favorite color now. Let´s show the world that dressing flower patterns is not cheesy :p";
    this.hashtags = "#art #flowerpower #vintage";
  }



  async OpenPostOptions(ev: any){
    console.log("Here are your options...");

    const popover = await this.popCtrl.create({
      component: PostpopComponent,
      event: ev
      });
      
      return await popover.present();
  }


  OpenComments(){
    this.router.navigate(["/comments",{id: this.idpost}]);
    
  }

}
