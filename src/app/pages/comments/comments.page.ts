import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {


  id: any;
  avatar: string;
  username: string;
  comment: string;



  //this.router.navigate(["/tabs/search"]);
  constructor(private router: ActivatedRoute, private location: Location) {
    this.avatar = "../assets/images/cottagecore1.jpeg";
    this.username = "bellafiori";
    this.comment = "You are so talented to choose outfits! I was literally asking myself yesterday how to combine yellow items lol";
    this.id = this.router.params.subscribe(params => {
      this.id = params['id']; 
      console.log("Id: ", this.id);
    });
  }

  ngOnInit() {

  }


  BackPage(){
    this.location.back();
    //this.router.navigate(["/tabs/search"]);
  }

}
