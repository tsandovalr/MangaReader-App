import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMangaPage } from './view-manga.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMangaPage
  },
  {
    path: 'charpter-creation',
    loadChildren: () => import('./charpter-creation/charpter-creation.module').then( m => m.CharpterCreationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMangaPageRoutingModule {}
