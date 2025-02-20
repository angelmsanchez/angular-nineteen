import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { UserService } from '../../services';

@Component({
  selector: 'app-change-detector',
  templateUrl: './change-detector.component.html',
  styleUrls: ['./change-detector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ChangeDetectorComponent {
  #userService = inject(UserService);
  readonly title = input('');

  users = injectQuery(() => ({
    queryKey: ['users'],
    queryFn: () => this.#userService.getUsers()
  }));

  getUsers() {
    this.users.refetch();
  }
}
