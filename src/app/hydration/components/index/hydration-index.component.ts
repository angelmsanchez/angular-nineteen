import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectorComponent } from '../change-detector/change-detector.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookComponent } from '../book/book.component';
import { CollapseComponent } from '../../../shared/components/collapse/collapse.component';

@Component({
  selector: 'app-hydration-index',
  templateUrl: './hydration-index.component.html',
  styleUrls: ['./hydration-index.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    ChangeDetectorComponent,
    MatExpansionModule,
    MatFormFieldModule,
    BookComponent,
    CollapseComponent
  ]
})
export class HydrationIndexComponent {
  expanded = signal(true);
  indexOpen = signal(0);

  handleOpened(index: number): void {
    this.indexOpen.set(index);
  }
}
