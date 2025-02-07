import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./example/components/index/example-index.component').then(
        (m) => m.ExampleIndexComponent
      )
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/components/index/home-index.component').then(
        (m) => m.HomeIndexComponent
      )
  }
];
