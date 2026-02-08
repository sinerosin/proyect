import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'tablon',
    loadComponent: () => import('./tablon/tablon.component').then((m) => m.TablonComponent),
  },
  {
    path: 'mision/:id',
    loadComponent: () => import('./mision/mision.component').then((m) => m.MisionComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
