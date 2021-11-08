import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangaCreationPage } from './manga-creation.page';
//import {  } from '../../../components/manga-form/manga-form.component';

const routes: Routes = [
  {
    path: '',
    component: MangaCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaCreationPageRoutingModule {}
