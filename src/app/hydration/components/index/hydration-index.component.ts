import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  linkedSignal,
  resource
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectorComponent } from '../change-detector/change-detector.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { UserService } from '../../services';
import { PeopleInterface, UserInterface } from '../../interfaces';

@Component({
  selector: 'app-hydration-index',
  templateUrl: './hydration-index.component.html',
  styleUrls: ['./hydration-index.component.scss'],
  imports: [CommonModule, TranslateModule, ChangeDetectorComponent]
})
export class HydrationIndexComponent {
  #userService = inject(UserService);
  userResource = resource({
    loader: () => {
      return fetch('https://swapi.dev/api/people/').then(
        (res) => res.json() as Promise<PeopleInterface>
      );
    }
  });
  users = injectQuery(() => ({
    queryKey: ['users'],
    queryFn: () => this.#userService.getUsers()
  }));
  userSelected = linkedSignal(() => this.users.data()?.results[0]);

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
    effect(() => {
      console.log('Cargando Users Tanstack:', this.users.data());
    });
  }

  selectUser(user: UserInterface) {
    this.userSelected.set(user);
  }
}
