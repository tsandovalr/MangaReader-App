import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewMangaPageRoutingModule } from './view-manga-routing.module';
import { ViewMangaPage } from './view-manga.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMangaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewMangaPage]
})
export class ViewMangaPageModule {}
