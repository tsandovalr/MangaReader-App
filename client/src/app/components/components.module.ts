import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { MangaFormComponent } from './manga-form/manga-form.component';
import { CharpterComponent } from './charpter/charpter.component';

@NgModule({
  declarations: [
      UploadFilesComponent,
      MangaFormComponent,
      CharpterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    UploadFilesComponent,
    MangaFormComponent,
    CharpterComponent
  ],
  providers:[
   
  ]
})
export class ComponentsModule { }