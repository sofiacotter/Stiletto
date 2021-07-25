import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';





@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  category: string;
  images: string[];


  constructor(private router: Router) { 
    this.category = "Business";
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

  BackToSearchPage(){
    this.router.navigate(["/tabs/search"]);
  }

}
