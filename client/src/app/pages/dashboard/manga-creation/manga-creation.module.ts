import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MangaCreationPageRoutingModule } from './manga-creation-routing.module';
import { MangaCreationPage } from './manga-creation.page';
import { ComponentsModule  } from '../../../components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MangaCreationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MangaCreationPage]
})
export class MangaCreationPageModule {}
