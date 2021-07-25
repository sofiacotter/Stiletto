import { Component, OnInit } from '@angular/core';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FireService } from 'src/app/services/fire.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-settingspop',
  templateUrl: './settingspop.component.html',
  styleUrls: ['./settingspop.component.scss'],
})
export class SettingspopComponent implements OnInit {

  constructor(private fser: FireService, private authService: FireauthService,
    private router: Router) { }

  ngOnInit() {}


  Logout(){
    console.log("Logout!");
    this.authService.doLogout()
    // Se a função doLogout() funcionar, navega à página de login, caso contrário,
    // só faz um print(), não efetua o Logout.
      .then(res => {
        this.router.navigate(["/login"]);
      }, err => {
        console.log(err);
      })  
  }

}
