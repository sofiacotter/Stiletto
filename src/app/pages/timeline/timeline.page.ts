import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PostpopComponent } from 'src/app/components/postpop/postpop.component';
import { Comment, PostInfo, userDetails } from 'src/app/details';
import { FireService } from 'src/app/services/fire.service';




@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {



  public userInfo: userDetails = null;
  public posts: PostInfo[] = [];
  myUid: string;
  lastDate: Date;

  //this.router.navigate(["/tabs/search"]);
  constructor(private popCtrl: PopoverController, private router: Router, private fser: FireService) { }

  ngOnInit() {

    this.myUid = this.fser.getUid();

    this.fser.getUserDetails(this.myUid).subscribe(data => {
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
      console.log("User Info: ", this.userInfo);




      this.fser.getFirstTimelinePost(this.userInfo.following)
      .subscribe((p) => {
          let data: any = p;
          
          data.forEach(e => {
            let ts = e.data()['datetime']
            this.lastDate = ts.toDate();
            let date = `${ts.toDate().getDate()}/${ts.toDate().getMonth()}/${ts.toDate().getFullYear()}`; 
            let time = `${ts.toDate().getHours()}:${ts.toDate().getMinutes()}`; 
            let post: PostInfo = {
              uid: e.data()['uid'],
              idpost: e.data()['idpost'],
              imagepath: e.data()['imagepath'],
              username: e.data()['username'],
              profilephoto: e.data()['profilephoto'],
              description: e.data()['description'],
              hashtags: e.data()['hashtags'],
              datetime: date +  " " + time,
              likes: e.data()['likes'],
              saves: e.data()['saves'],
              comments: null
            };
            this.fser.getCommentsInPost(post.idpost).subscribe(data => {
              let commentsList = [];
              data.map(e => {
                commentsList.push({
                  uid: e.payload.doc.data()['uid'],
                  username: e.payload.doc.data()['username'],
                  imagepath: e.payload.doc.data()['imagepath'],
                  comment: e.payload.doc.data()['comment'],
                  datetime: e.payload.doc.data()['datetime']
                });
              });
              post.comments = commentsList;
            
            });
            this.posts.push(post);
            console.log("Post: ", post);
          });
        }); 
    });  
  }



  LoadMorePosts(event: any) {
    setTimeout(() => {
      console.log("Pessoas que sigo: ", this.userInfo.following);
      this.fser.loadMorePosts(this.userInfo.following, this.lastDate)
      .subscribe((p) => {
          let data: any = p;
          
          data.forEach(e => {
            let ts = e.data()['datetime']
            this.lastDate = ts.toDate();
            let date = `${ts.toDate().getDate()}/${ts.toDate().getMonth()}/${ts.toDate().getFullYear()}`; 
            let time = `${ts.toDate().getHours()}:${ts.toDate().getMinutes()}`; 
            let post: PostInfo = {
              uid: e.data()['uid'],
              idpost: e.data()['idpost'],
              imagepath: e.data()['imagepath'],
              username: e.data()['username'],
              profilephoto: e.data()['profilephoto'],
              description: e.data()['description'],
              hashtags: e.data()['hashtags'],
              datetime: date +  " " + time,
              likes: e.data()['likes'],
              saves: e.data()['saves'],
              comments: null
            };
            this.fser.getCommentsInPost(post.idpost).subscribe(data => {
              let commentsList = [];
              data.map(e => {
                commentsList.push({
                  uid: e.payload.doc.data()['uid'],
                  username: e.payload.doc.data()['username'],
                  imagepath: e.payload.doc.data()['imagepath'],
                  comment: e.payload.doc.data()['comment'],
                  datetime: e.payload.doc.data()['datetime']
                });
              });
              post.comments = commentsList;
            
            });
            if(!this.posts.includes(post)){
              this.posts.push(post);
            }
            
          });
        }); 

      event.target.complete();



    }, 1000);
  }


}
