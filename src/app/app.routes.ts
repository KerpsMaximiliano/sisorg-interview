import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  // {
  //   // path: $localize `home`,
  //   path: 'weqewqewqe',
  //   loadComponent: async () => await import('./modules/home/home.component').then((c) => c.HomeComponent)
  // },
  // {
  //   path: 'homestead',
  //   component: HomeComponent
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
