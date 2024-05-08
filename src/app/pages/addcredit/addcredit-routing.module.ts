import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcreditPage } from './addcredit.page';

const routes: Routes = [
  {
    path: '',
    component: AddcreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcreditPageRoutingModule {}
