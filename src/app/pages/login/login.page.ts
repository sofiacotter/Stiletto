import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../../services/fireauth.service';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  isDone: boolean = false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }]
  };

  constructor(
    private authService: FireauthService,
    private fire:FireService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }












  ngOnInit() {


    setTimeout(()=> {}, 2000);




    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$') 
      ])), 
      password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
      ])), 
    });
  }


  /* Quando o Login é válido, ele faz o then(), verificar o Token no Firebase se é igual
  ao token que me deram. Substiruir o que está no Firebase pela variável local do serviço */

  tryLogin(value: { email: string; password: string; }) {
    this.authService.doLogin(value)
      .then(res => {
        let oldToken;
        const newToken = this.fire.getToken(); // o token quando abrimos a app

        const oldtokenRef = this.fire.getFirebaseToken();

        oldtokenRef.forEach(e => {
          oldToken = e.data()['token']
          console.log("oldToken", oldToken)
        })

        if(oldToken != newToken){
          this.fire.updateFirebaseToken(newToken);
          console.log("tokenUpdated")
        }


        this.router.navigate(["/tabs"]);
      }, err => {
        this.errorMessage = err.message;
        console.log(err)
      })
  }

  goRegisterPage() {
    this.router.navigate(["/register"]);
  }








  
}