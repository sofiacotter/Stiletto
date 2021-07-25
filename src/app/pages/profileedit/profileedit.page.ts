import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.page.html',
  styleUrls: ['./profileedit.page.scss'],
})
export class ProfileeditPage implements OnInit {

  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
