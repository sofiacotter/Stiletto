import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PostpopComponent } from 'src/app/components/postpop/postpop.component';
import { TimelinePost } from 'src/app/details';
import { FireService } from 'src/app/services/fire.service';




@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {





  public posts: TimelinePost[] = [];
  private post1: TimelinePost;
  private post2: TimelinePost;
  public cu: string = "cu";


  //this.router.navigate(["/tabs/search"]);
  constructor(private popCtrl: PopoverController, private router: Router, private fser: FireService){}

  ngOnInit() {
    this.post1 = {
      uid: "yWM2CPQnz3ZgMue0qLHM9YV2cnB2",
      idpost: "1GD7sqtbPkOabXDjtna8",
      username: "liliannn",
      profilephoto: "../assets/images/profilepics/profile3.jpg",
      imagepath: "../assets/images/artsy/artsy5.jpg", 
      description: "I am a fairy and my powers come from the sun, and that´s the only truth you need to know.",
      hashtags: "#artsy",
      datetime: "2021-09-01 23:01:34",
      ncommented: 4,
      nlikes: 7,
      nsaves: 5,
      isSaved: false,
      isLiked: true,    
    };
    this.post2 = {
      uid: "yWM2CPQnz3ZgMue0qLHM9YV2cnB2",
      idpost: "1GD7sqtbPkOabXDjtna8",
      username: "liliannn",
      profilephoto: "../assets/images/profilepics/profile3.jpg",
      imagepath: "../assets/images/artsy/artsy5.jpg", 
      description: "I am a fairy and my powers come from the sun, and that´s the only truth you need to know.",
      hashtags: "#artsy",
      datetime: "2021-09-01 23:01:34",
      ncommented: 4,
      nlikes: 7,
      nsaves: 5,
      isSaved: false,
      isLiked: true,    
    };
    this.posts.push(this.post1);
    this.posts.push(this.post2);
  }

}
