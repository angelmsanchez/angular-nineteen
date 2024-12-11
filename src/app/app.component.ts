import { Component } from '@angular/core';
import { LayoutComponent } from './core/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [LayoutComponent]
})
export class AppComponent {}
