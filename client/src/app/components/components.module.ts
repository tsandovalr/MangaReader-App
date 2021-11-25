import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MangaFormComponent } from './manga-form/manga-form.component';
import { ChapterComponent } from './chapter/chapter.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
      MangaFormComponent,
      ChapterComponent,
      CommentComponent
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
    ChapterComponent,
    CommentComponent
  ],
  providers:[
   
  ]
})
export class ComponentsModule { }