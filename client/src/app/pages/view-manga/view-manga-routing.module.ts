import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMangaPage } from './view-manga.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMangaPage
  },
  {
    path: 'chapter-creation',
    loadChildren: () => import('./chapter-creation/chapter-creation.module').then( m => m.ChapterCreationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMangaPageRoutingModule {}
