import { Routes } from '@angular/router';
import { HomeIndexComponent } from './home/components';
import { ExampleIndexComponent } from './example/components';

export const routes: Routes = [
  { path: '', component: ExampleIndexComponent },
  { path: 'home', component: HomeIndexComponent }
];
