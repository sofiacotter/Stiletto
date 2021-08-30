import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { userDetails } from 'src/app/details';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  validations_form: FormGroup;
  public categories: string[] = [];
  public isLoaded1: boolean = false;
  public isLoaded2: boolean = false;
  public hashtags: string[] = [];
  public selectedCategories: string = '';
  public userInfo: userDetails = null;
  uid: string;



  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private formBuilder: FormBuilder, private fser: FireService) {
   
   }

  ngOnInit() {
    console.log("length: ", this.hashtags.length);

    /* BUSCAR A MINHA INFO */
    this.uid = this.fser.getUid();
    this.fser.getUserDetails(this.uid).subscribe(data => {
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
        this.isLoaded1 = true;
        console.log("User Info: ", this.userInfo);
      });


    this.validations_form = this.formBuilder.group({
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150)
      ])),
      selectedCategories: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.fser.getCategories().subscribe(data => {
      data.map(e => {
        this.categories.push(e.payload.doc.id);
      });
      this.isLoaded2 = true;
      console.log("Categories: ", this.categories);
    });



  }


  Selected(event: any){
    console.log("EVENTO!", event);
    console.log(event.detail.value);
    this.hashtags = event.detail.value;
  }


  logForm(){
      console.log("VALID!");
      console.log("Hashtags: ", this.hashtags);
      console.log("Description: ", this.validations_form.value.description);  
  }





  CancelButton(){
    console.log("CANCEL");
  }

}
