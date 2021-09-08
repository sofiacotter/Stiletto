import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { ActivatedRoute } from '@angular/router';
import { SearchResults } from 'src/app/details';
import { Platform } from '@ionic/angular';







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
  public colWidth: string = "";
  private p: Platform;

  constructor(private fser: FireService, private router: Router, private activatedRoute: ActivatedRoute,
    private platform: Platform) { 
    this.p = platform;

    this.category = this.activatedRoute.snapshot.paramMap.get('category');   
    /*
    this.activatedRoute.paramMap.subscribe(
      (data) => {
        console.log("You clicked: ", data);
      }
    )
    */
  }

  ngOnInit() {
    this.p.ready().then(() => {
      console.log('SCREEN Width: ' + this.p.width());
      console.log('SCREEN Height: ' + this.p.height());
    });

    this.colWidth += (this.p.width()/3-4)+"px";
    console.log("ROW WIDTH: ", this.colWidth);
    document.documentElement.style.setProperty('--input-custom-width', this.colWidth);



    this.fser.getSearchResults(this.category).subscribe(data => {
      console.log(data)
      data.map(e => {
        this.results.push({
          //idpost: e.payload.doc.id,
          idpost: e.payload.doc.data()['idpost'],
          imagepath: e.payload.doc.data()['imagepath'],
        });
      });
      this.isLoaded = true;
      console.log("Results Found: ", this.results);
    });
  }


  OpenPost(idpost: string){
    console.log("Idpost category.page: ", idpost);
    this.router.navigate(["/post/"+idpost]);
  }

  BackToSearchPage(){
    this.router.navigate(["/tabs/search"]);
  }

}
