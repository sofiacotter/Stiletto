import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileotherPageRoutingModule } from './profileother-routing.module';

import { ProfileotherPage } from './profileother.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileotherPageRoutingModule
  ],
  declarations: [ProfileotherPage]
})
export class ProfileotherPageModule {}
