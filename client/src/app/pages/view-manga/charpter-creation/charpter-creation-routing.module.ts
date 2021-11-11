import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharpterCreationPage } from './charpter-creation.page';

const routes: Routes = [
  {
    path: '',
    component: CharpterCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharpterCreationPageRoutingModule {}
