import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, PopoverController } from '@ionic/angular';
import { SearchResults } from 'src/app/details';
import { FireService } from 'src/app/services/fire.service';



@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  images: string[];
  public results: SearchResults[] = [];
  public isLoaded = false;
  public colWidth: string = "";
  private p: Platform;


  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private fser: FireService, private platform: Platform) { 
    this.p = platform;
  }

  ngOnInit() {
    this.p.ready().then(() => {
      console.log('SCREEN Width: ' + this.p.width());
      console.log('SCREEN Height: ' + this.p.height());
    });

    this.colWidth += (this.p.width()/3-4)+"px";
    console.log("ROW WIDTH: ", this.colWidth);
    document.documentElement.style.setProperty('--input-custom-width', this.colWidth);

    this.GetSavedPosts();
    
  }


  GetSavedPosts(){

    this.fser.GetSavesByUser().subscribe(data => {
      console.log(data)
      this.results = [];
      data.map(e => {
        this.results.push({
          idpost: e.payload.doc.id,
          imagepath: e.payload.doc.data()['imagepath'],
        });
      });
      this.isLoaded = true;
      console.log("Saved Posts: ", this.results);
    });
  }












  OpenPost(idpost: string){
    console.log("Idpost: ", idpost);
    this.router.navigate(["/post/"+idpost]);
  }
  
}
