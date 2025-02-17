import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hydration-index',
  templateUrl: './hydration-index.component.html',
  styleUrls: ['./hydration-index.component.scss'],
  imports: [CommonModule, TranslateModule]
  // imports: [CommonModule, TranslateModule, ChangeDetectorComponent]
})
export class HydrationIndexComponent {}
