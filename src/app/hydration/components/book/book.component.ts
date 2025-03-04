import { CommonModule } from '@angular/common';
import { Component, contentChildren, effect, input } from '@angular/core';
import { CollapseComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  imports: [CommonModule]
})
export class BookComponent {
  contentChildren = contentChildren<CollapseComponent>('contentChildren');
  indexOpen = input(0);

  constructor() {
    effect(() => {
      this.handleExpand();
    });
  }

  handleExpand(): void {
    this.contentChildren().forEach((content, index) => {
      const contentPanel = content.expansionPanel();
      if (index === this.indexOpen()) {
        contentPanel.open();
      } else {
        contentPanel.close();
      }
    });
  }
}
