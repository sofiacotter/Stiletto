import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { FireauthService } from 'src/app/services/fireauth.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  categories: Array<any> = [];




  //this.router.navigate(["/tabs/search"]);
  constructor(private fser: FireService, private authService: FireauthService,
    private router: Router) { 
  }

  ngOnInit() {
    

    this.fser.getCategories().subscribe(data => {
      this.categories = data.map(e => {
        return {
          category: e.payload.doc.id,
          imagepath: e.payload.doc.data()['imagepath'],
        };
      });
    });

    console.log(this.categories);
  
  }




  OpenPost(category: string){
    console.log("You clicked on an image!");
    this.router.navigate(["/category/"+category]);
  }

}
