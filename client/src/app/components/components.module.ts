import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { RouterModule } from '@angular/router';
import { UploadFilesComponent } from './upload-files/upload-files.component';

@NgModule({
  declarations: [
      UploadFilesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    UploadFilesComponent
  ],
  providers:[
   
  ]
})
export class ComponentsModule { }