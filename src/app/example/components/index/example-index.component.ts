import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import dayjs from 'dayjs';
import { DateFormatPipe } from 'src/app/shared/pipes';

@Component({
  selector: 'app-example-index',
  templateUrl: './example-index.component.html',
  styleUrls: ['./example-index.component.scss'],
  imports: [CommonModule, TranslateModule, DateFormatPipe]
})
export class ExampleIndexComponent {
  today = new Date();
  todayDay = dayjs();
  currency = 5001.5;
}
