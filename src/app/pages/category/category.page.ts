import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { ActivatedRoute } from '@angular/router';
import { SearchResults } from 'src/app/details';







@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  category: any;
  
  public isLoaded=false;
  private n: SearchResults = {idpost: '', imagepath: ''};
  public results: SearchResults[] = [];
 

  constructor(private fser: FireService, private authService: FireauthService,
    private router: Router, private activatedRoute: ActivatedRoute) { 



    this.category = this.activatedRoute.snapshot.paramMap.get('category');   
    /*
    this.activatedRoute.paramMap.subscribe(
      (data) => {
        console.log("You clicked: ", data);
      }
    )
    */


    /*
    this.images = ["../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg",
    "../assets/images/flowerpower.jpg", "../assets/images/flowerpower.jpg"];
  
  */
  }

  ngOnInit() {
    this.fser.getSearchResults(this.category).subscribe(data => {
      console.log(data)
      data.map(e => {
        this.results.push({
          idpost: e.payload.doc.id,
          imagepath: e.payload.doc.data()['imagepath'],
        });
      });
      this.isLoaded = true;
      console.log("Results Found: ", this.results);
    });
    console.log("Done with ngOnInit");
  }


  OpenPost(idpost: string){
    console.log("Idpost: ", idpost);
    this.router.navigate(["/post/"+idpost]);
  }

  BackToSearchPage(){
    this.router.navigate(["/tabs/search"]);
  }

}
