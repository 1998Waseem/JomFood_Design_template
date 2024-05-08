import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsroomPageRoutingModule } from './newsroom-routing.module';

import { NewsroomPage } from './newsroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsroomPageRoutingModule
  ],
  declarations: [NewsroomPage]
})
export class NewsroomPageModule {}
