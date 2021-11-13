import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChapterCreationPageRoutingModule } from './chapter-creation-routing.module';
import { ChapterCreationPage } from './chapter-creation.page';
import { ComponentsModule  } from '../../../components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterCreationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ChapterCreationPage]
})
export class ChapterCreationPageModule {}
