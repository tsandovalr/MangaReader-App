import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentCreationPage } from './comment-creation.page';

const routes: Routes = [
  {
    path: '',
    component: CommentCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentCreationPageRoutingModule {}
