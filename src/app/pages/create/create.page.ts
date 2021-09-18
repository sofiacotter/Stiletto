import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { userDetails } from 'src/app/details';
import { PictureService } from 'src/app/services/pictures.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

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
  public userInfo: userDetails = null;
  uid: string;
  public errorDescription: boolean = false;
  public photoInfo: any = null;
  public filenameStorage: string;
  public selectedCategories: string[];





  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router, private formBuilder: FormBuilder, 
    private fser: FireService, private pictureservice: PictureService,
    public alertController: AlertController, public toastController: ToastController, private storage: AngularFireStorage) {
   
   }

  ngOnInit() {


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
            following: e.payload.doc.data()['following'],
            token: e.payload.doc.data()['token'],
          };
        });
        this.isLoaded1 = true;
        console.log("User Info: ", this.userInfo);
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
    console.log("EVENTO CATEGORY SELECTED!", event);
    console.log(event.detail.value);
    this.hashtags = event.detail.value;
  }

  DescriptionRequiredTrue(event: any){
    console.log("EVENTO DESCRIPTION REQUIRED TRUE!", event);
    this.errorDescription = true;
  }
  DescriptionRequiredFalse(event: any){
    console.log("EVENTO DESCRIPTION REQUIRED FALSE!", event);
    this.errorDescription = false;
  }




  CancelButton(){
    console.log("CANCEL");
  }


  CategoriesToString(categories: string[]){
    let str = ""
    for (let i = 0; i < categories.length; i++) {
      str += "#"+categories[i] + " "
    }
    return str;
  }








  async SubmitPost(){

    /*  1. Colocar imagem no Firebase Storage */
    const ref = this.storage.ref('uploaded/'+ this.photoInfo.filename);
    
    /*  2. Buscar o URL da imagem guardada. */
    const task = ref.putString(this.photoInfo.base64String, 'base64')
    task.then(res => {
      ref.getDownloadURL().subscribe(async url =>{
        this.filenameStorage = url;
        
      
          console.log("POST IS VALID!");
          console.log("Hashtags: ", this.hashtags);
          console.log("this.filenameStorage: ", this.filenameStorage); 
          /*3. Criar documento na coleção "posts" */
          this.fser.PublishPost(this.userInfo.username, this.userInfo.profilephoto, this.CategoriesToString(this.hashtags), 
          this.validations_form.value.description, this.filenameStorage);

          /*  4. Criar documento na coleção "profile" do próprio user */
          this.fser.PublishPostProfile(this.uid, this.filenameStorage);

          /*  5. Criar documentos nas categorias de pesquisa a que pertence */
          for (let i = 0; i < this.hashtags.length; i++) {
            this.fser.PublishPostSearch(this.hashtags[i], this.filenameStorage);
          }

          /*  6. Mostrar Toast a avisar que a foto está a ser publicada */
          const toast = await this.toastController.create({
            message: 'Your post is being published! Please wait...',
            duration: 3000,
            color: 'success',
            position: 'top'
          });
          toast.present();
          await this.delay(3000);
      
          //APAGAR CAMPOS ANTIGOS!
          this.hashtags = [];
          this.validations_form.reset();
          this.photoInfo = null;
      
          this.router.navigate(["/tabs/timeline"]);
        
        
      })
      
    }, rej => {
      console.log("ERROR PUBLISHING POST ---> ", rej);
    })
    
  }








  



  async UploadPicture(){
    const pic = await this.pictureservice.TakePhoto();
    this.photoInfo = {base64String: pic[0], filename: pic[1]};
    console.log("PhotoInfo.filename: ", this.photoInfo.filename);
    console.log("photoInfo.base64String: ", this.photoInfo.base64String);
  }



  






  async popupAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure',
      message: 'you want to publish?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('CANCEL');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('OKAY');
            this.SubmitPost();
          }
        }
      ]
    });

    await alert.present();
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }









}
function finalize(arg0: () => import("rxjs").Observable<any>): import("rxjs").OperatorFunction<import("firebase").default.storage.UploadTaskSnapshot, unknown> {
  throw new Error('Function not implemented.');
}

