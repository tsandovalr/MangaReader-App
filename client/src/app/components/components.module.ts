import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MangaFormComponent } from './manga-form/manga-form.component';
import { ChapterComponent } from './chapter/chapter.component';

@NgModule({
  declarations: [
      MangaFormComponent,
      ChapterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MangaFormComponent,
    ChapterComponent
  ],
  providers:[
   
  ]
})
export class ComponentsModule { }