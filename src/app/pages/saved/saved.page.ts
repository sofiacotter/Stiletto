import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
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


  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private fser: FireService) { 

  }

  ngOnInit() {

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
