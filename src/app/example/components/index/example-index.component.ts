import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-example-index',
  templateUrl: './example-index.component.html',
  styleUrls: ['./example-index.component.scss'],
  imports: [CommonModule, TranslateModule]
})
export class ExampleIndexComponent {
  today = new Date();
  currency = 5001.5;
}
