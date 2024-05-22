import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerifyregcodePageRoutingModule } from './verifyregcode-routing.module';

import { VerifyregcodePage } from './verifyregcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyregcodePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VerifyregcodePage]
})
export class VerifyregcodePageModule {}
