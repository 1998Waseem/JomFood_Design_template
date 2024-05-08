import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsroomPage } from './newsroom.page';

const routes: Routes = [
  {
    path: '',
    component: NewsroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsroomPageRoutingModule {}
