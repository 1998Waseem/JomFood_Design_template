import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddaddressPageRoutingModule } from './addaddress-routing.module';

import { AddaddressPage } from './addaddress.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddaddressPageRoutingModule
  ],
  declarations: [AddaddressPage]
})
export class AddaddressPageModule {}
