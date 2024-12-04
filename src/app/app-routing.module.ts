import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register-form/register-form.module').then(m => m.RegisterFormModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',          // Enables anchor scrolling
    scrollPositionRestoration: 'enabled', // Restores scroll position when navigating back
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
