import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchcategoryPageRoutingModule } from './searchcategory-routing.module';

import { SearchcategoryPage } from './searchcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchcategoryPageRoutingModule
  ],
  declarations: [SearchcategoryPage]
})
export class SearchcategoryPageModule {}
