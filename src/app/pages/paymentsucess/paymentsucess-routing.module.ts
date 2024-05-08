import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsucessPage } from './paymentsucess.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsucessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsucessPageRoutingModule {}
