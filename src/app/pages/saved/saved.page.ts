import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  images: string[];


  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router) { 
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




  OpenPost(){
    console.log("You clicked on an image!");
  }
  
}
