import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermusePageRoutingModule } from './termuse-routing.module';

import { TermusePage } from './termuse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermusePageRoutingModule
  ],
  declarations: [TermusePage]
})
export class TermusePageModule {}
