import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'manga-creation/edit/:id',
    loadChildren: () => import('./pages/dashboard/manga-creation/manga-creation.module').then( m => m.MangaCreationPageModule)
  },
  {
    path: 'view-manga/:id',
    loadChildren: () => import('./pages/view-manga/view-manga.module').then( m => m.ViewMangaPageModule)
  },
  {
    path: 'chapter-creation/edit/:id',
    loadChildren: () => import('./pages/view-manga/chapter-creation/chapter-creation.module').then( m => m.ChapterCreationPageModule)
  },
  {
    path: 'view-chapter/:id',
    loadChildren: () => import('./pages/view-chapter/view-chapter.module').then( m => m.ViewChapterPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
