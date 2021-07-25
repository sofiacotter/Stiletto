import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  //this.router.navigate(["/tabs/search"]);
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
