import { Component, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [RouterModule, RouterOutlet, MatSidenavModule, HeaderComponent]
})
export class LayoutComponent {
  readonly sidenav = viewChild<MatSidenav>('sidenav');

  setOpenMenu(): void {
    this.sidenav()?.toggle();
  }
}
