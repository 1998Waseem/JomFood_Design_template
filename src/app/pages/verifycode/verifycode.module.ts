import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerifycodePageRoutingModule } from './verifycode-routing.module';

import { VerifycodePage } from './verifycode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifycodePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VerifycodePage]
})
export class VerifycodePageModule {}
