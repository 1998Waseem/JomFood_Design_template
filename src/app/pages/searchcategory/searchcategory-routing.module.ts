import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchcategoryPage } from './searchcategory.page';

const routes: Routes = [
  {
    path: '',
    component: SearchcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchcategoryPageRoutingModule {}
