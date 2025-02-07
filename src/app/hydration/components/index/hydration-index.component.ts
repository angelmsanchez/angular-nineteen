import { CommonModule } from '@angular/common';
import { Component, effect, linkedSignal, resource } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectorComponent } from '../change-detector/change-detector.component';

interface UserInterface {
  name: string;
  height: number;
}
interface PeopleInterface {
  count: number;
  next: string;
  previous: number;
  results: UserInterface[];
}

@Component({
  selector: 'app-hydration-index',
  templateUrl: './hydration-index.component.html',
  styleUrls: ['./hydration-index.component.scss'],
  imports: [CommonModule, TranslateModule, ChangeDetectorComponent]
})
export class HydrationIndexComponent {
  userResource = resource({
    loader: () => {
      return fetch('https://swapi.dev/api/people/').then(
        (res) => res.json() as Promise<PeopleInterface>
      );
    }
  });
  userSelected = linkedSignal(() => this.userResource.value()?.results[0]);

  constructor() {
    effect(() => {
      if (this.userResource.isLoading()) {
        console.log('Cargando datos del usuario...');
      } else if (this.userResource.error()) {
        console.error('Error:', this.userResource.error());
      } else {
        console.log('Datos del usuario:', this.userResource.value());
      }
    });
  }

  selectUser(user: UserInterface) {
    this.userSelected.set(user);
  }
}
