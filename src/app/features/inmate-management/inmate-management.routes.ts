import { Routes } from '@angular/router';

export const inmateManagementRoutes: Routes = [
  { path: '', redirectTo: 'add-update', pathMatch: 'full' },
  {
    path: 'add-update',
    loadComponent: () =>
      import('./add-update-inmate/add-update-inmate').then((m) => m.AddUpdateInmateComponent),
  },
  {
    path: 'recent-requests',
    loadComponent: () =>
      import('./recent-requests/recent-requests').then((m) => m.RecentRequestsComponent),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./inmate-list/inmate-list').then((m) => m.InmateListComponent),
  },
];
