import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentCreationPageRoutingModule } from './comment-creation-routing.module';
import { CommentCreationPage } from './comment-creation.page';
import { ComponentsModule  } from '../../../components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentCreationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CommentCreationPage]
})
export class CommentCreationPageModule {}
