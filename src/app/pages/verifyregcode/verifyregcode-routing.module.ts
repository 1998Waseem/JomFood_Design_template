import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyregcodePage } from './verifyregcode.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyregcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyregcodePageRoutingModule {}
