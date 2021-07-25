import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileeditPage } from './profileedit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileeditPageRoutingModule {}
