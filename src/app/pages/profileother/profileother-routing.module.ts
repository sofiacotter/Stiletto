import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileotherPage } from './profileother.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileotherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileotherPageRoutingModule {}
