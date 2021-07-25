import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  images: string[];





  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router) { 
    this.images = ["../assets/images/mono.jpg", "../assets/images/mono.jpg",
    "../assets/images/mono.jpg", "../assets/images/mono.jpg",
    "../assets/images/mono.jpg", "../assets/images/mono.jpg"];
  }

  ngOnInit() {
  }




  OpenPost(){
    console.log("You clicked on an image!");
    this.router.navigate(["/category"]);
  }

}
