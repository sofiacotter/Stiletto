import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileeditPageRoutingModule } from './profileedit-routing.module';

import { ProfileeditPage } from './profileedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileeditPageRoutingModule
  ],
  declarations: [ProfileeditPage]
})
export class ProfileeditPageModule {}
