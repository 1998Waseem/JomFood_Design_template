import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcreditPageRoutingModule } from './addcredit-routing.module';

import { AddcreditPage } from './addcredit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcreditPageRoutingModule
  ],
  declarations: [AddcreditPage]
})
export class AddcreditPageModule {}
