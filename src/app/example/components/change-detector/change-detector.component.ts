import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
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
  readonly count = input(0);
  readonly user = input<UserInterface>();
  readonly countChange = output<number>();

  updateCount(amount: number): void {
    this.countChange.emit(this.count() + amount);
  }
}
