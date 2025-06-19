import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent) 
  },
  { 
    path: 'select', 
    loadComponent: () => import('./pages/select-playground/select-playground.component').then(c => c.SelectPlaygroundComponent) 
  },
    { 
    path: 'switch', 
    loadComponent: () => import('./pages/switch-playground/switch-playground.component').then(c => c.SwitchPlaygroundComponent) 
  }
];