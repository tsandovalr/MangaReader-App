import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewChapterPage } from './view-chapter.page';

const routes: Routes = [
  {
    path: '',
    component: ViewChapterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewChapterPageRoutingModule {}
