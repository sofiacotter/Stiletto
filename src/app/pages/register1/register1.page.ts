import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FireService } from 'src/app/services/fire.service';
import { userDetails } from 'src/app/details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './register1.page.html',
  styleUrls: ['./register1.page.scss'],
})
export class Register1Page implements OnInit, OnDestroy {
  
  validations_form: FormGroup
  
  message: userDetails
  subscription: Subscription
  errorMessage: string = ''


  //variaveis para validar username
  usernameList: any[];
  isvalid: boolean;
  profiledefault: string;

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username is too short' },
      { type: 'duplicate', message: 'Username already exists'}
    ]
  };
  
  constructor(
    private data: DataService,
    private fire: FireService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
    }


  ngOnInit() {
  
    // Logo que se entra na página Register1, faz-se isto.
    // Buscar todos os usernames que existem para se comparar e guardá-los numa lista.
    this.fire.getUsernames().subscribe(data =>{
      this.usernameList = data.map(e => {
        return  e.payload.doc.data()['username']
      })
    });
  

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])),
    });


    this.subscription = this.data.currentMessage.subscribe(msg => {this.message = msg;})

   }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  
  tryRegisterUsername(value){
    console.log("tryRegisterUsername() ---> ", value);

    let t: userDetails = {
      uid: '',
      email: this.message.email,
      username: value.username,
      profilephoto: "../assets/images/profilepics/default.png",
      followers: [],
      following: []
    }

    // Verificar se existe algum username na base de dados com este valor inserido

    this.isvalid = ! this.usernameList.includes(this.validations_form.controls['username'].value);
    
    
  if(this.isvalid){
    this.fire.createUsername(t).then( res => {
      this.errorMessage = "",
      this.router.navigate(['tabs/timeline'])
    }, err => {
      this.errorMessage = err.message;
    })
  } else{
    this.errorMessage = "Username Already Exists"
  }
  
    
  }


}
