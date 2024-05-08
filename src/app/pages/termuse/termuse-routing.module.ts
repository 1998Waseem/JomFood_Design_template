import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermusePage } from './termuse.page';

const routes: Routes = [
  {
    path: '',
    component: TermusePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermusePageRoutingModule {}
