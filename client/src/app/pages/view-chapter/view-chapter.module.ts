import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewChapterPageRoutingModule } from './view-chapter-routing.module';

import { ViewChapterPage } from './view-chapter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewChapterPageRoutingModule
  ],
  declarations: [ViewChapterPage]
})
export class ViewChapterPageModule {}
