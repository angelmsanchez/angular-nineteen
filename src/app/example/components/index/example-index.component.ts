import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import dayjs from 'dayjs';
import { DateFormatPipe } from 'src/app/shared/pipes';
import { ChangeDetectorComponent } from '../change-detector/change-detector.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example-index',
  templateUrl: './example-index.component.html',
  styleUrls: ['./example-index.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    DateFormatPipe,
    ChangeDetectorComponent,
    FormsModule
  ]
})
export class ExampleIndexComponent {
  today = new Date();
  todayDay = dayjs();
  currency = 5001.5;
  initialCount = 18;
  user = signal({ name: 'A' });

  changeName() {
    this.user.set({ ...this.user(), name: this.user().name + ' A' });
  }
}
