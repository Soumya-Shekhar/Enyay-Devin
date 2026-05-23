import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./features/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'inmate-login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./features/inmate-login/inmate-login').then((m) => m.InmateLoginComponent),
  },
  {
    path: 'inmate-auth',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./features/inmate-auth/inmate-auth').then((m) => m.InmateAuthComponent),
  },
  {
    path: 'inmate-welcome',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./features/inmate-welcome/inmate-welcome').then((m) => m.InmateWelcomeComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'inmate-management',
        loadChildren: () =>
          import('./features/inmate-management/inmate-management.routes').then(
            (m) => m.inmateManagementRoutes
          ),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
