import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isSelected: boolean

  constructor() {}

  setSelected(){
    this.isSelected = !this.isSelected;
  }
}
