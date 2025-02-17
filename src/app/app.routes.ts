import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./hydration/components/index/hydration-index.component').then(
        (m) => m.HydrationIndexComponent
      )
  },
  {
    path: 'example',
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
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/components/index/users-index.component').then(
        (m) => m.UsersIndexComponent
      )
  }
];
