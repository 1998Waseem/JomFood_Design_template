import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsucessPageRoutingModule } from './paymentsucess-routing.module';

import { PaymentsucessPage } from './paymentsucess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsucessPageRoutingModule
  ],
  declarations: [PaymentsucessPage]
})
export class PaymentsucessPageModule {}
