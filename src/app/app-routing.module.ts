import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services';

@Component({
  selector: 'app-base-layout',
  template: `
  <div style="padding:20px;">
  <div>
  <a routerLink="./home">Home</a> &nbsp;|&nbsp; <a routerLink="./dashboard">Dashboard</a>
</div>
  <router-outlet></router-outlet>
</div>
  `,
})
export class BaseLayoutComponent {}

const routes: Routes = [
  
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },

      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
];

/* const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
]; */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
