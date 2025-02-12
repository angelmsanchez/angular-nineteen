import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output
} from '@angular/core';

interface UserInterface {
  name: string;
}

@Component({
  selector: 'app-change-detector',
  templateUrl: './change-detector.component.html',
  styleUrls: ['./change-detector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ChangeDetectorComponent {
  count = input.required<number>();
  readonly user = input<UserInterface>();
  volume = model.required<number>();

  readonly countChange = output<number>();

  constructor() {
    effect(() => {
      console.log(`New value volume: ${this.volume()}`);
    });
  }

  updateCount(amount: number): void {
    this.countChange.emit(this.count() + amount);
    this.volume.update((oldValue) => oldValue + amount);
  }
}
