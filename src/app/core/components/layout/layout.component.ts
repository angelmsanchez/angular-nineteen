import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('sidenav') sidenav: MatSidenav = new MatSidenav();

  setOpenMenu(): void {
    this.sidenav.toggle();
  }
}
