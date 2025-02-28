import { CommonModule } from '@angular/common';
import { Component, contentChildren, effect, signal } from '@angular/core';
import { CollapseComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  imports: [CommonModule]
})
export class BookComponent {
  contentChildren = contentChildren<CollapseComponent>('contentChildren');
  openFirst = signal(true);

  constructor() {
    effect((onCleanup) => {
      console.log('1: ', this.contentChildren()[0].expansionPanel());
      console.log('2: ', this.contentChildren()[1].expansionPanel());
      console.log('3: ', this.contentChildren()[2].expansionPanel());

      onCleanup(() => {
        console.log("Perform cleanup action here");
      });
    });

    effect((onCleanup) => {
      console.log('openFirst: ', this.openFirst());

      onCleanup(() => {
        console.log("openFirst: Perform cleanup action here");
      });
    });
  }

  handleExpand(): void {
    this.openFirst.set(!this.openFirst());
    this.contentChildren().forEach((content, index) => {
      const contentPanel = content.expansionPanel();
      if (index === 0 && this.openFirst()) {
        contentPanel.open();
      } else {
        if (index !== 0 && !this.openFirst()) {
          contentPanel.open();
        } else {
          contentPanel.close();
        }
      }
    });
  }

  // ngAfterContentInit() {
  //   this.contentChildren.changes.pipe(delay(0)).subscribe(() => {
  //     this.foos.forEach((foo, index) => {
  //       setTimeout(() => {
  //         foo.index = index;
  //       }, 500)
  //     });
  //   });
  // }

  // handleExpand(): void {
  //   const contentOne = this.contentChildren()[0];
  //   const contentTwo = this.contentChildren()[1];
  //   const contentThree = this.contentChildren()[2];
  //   if (contentOne.expanded()) {
  //     contentOne.close();
  //     contentTwo.open();
  //     contentThree.close();
  //   } else {
  //     contentOne.open();
  //     contentTwo.close();
  //     contentThree.close();
  //   }
  // }

  // ngAfterViewInit() {
  //   const contentOne = this.contentChildren()[0].expansionPanel();
  //   if (contentOne.expanded) {
  //     contentOne.close();
  //   } else {
  //     contentOne.open();
  //   }
  //   // const contentTwo = this.contentChildren()[1] as CollapseComponent;
  //   console.log('ngViewAfterInit: ', contentOne.expanded);
  //   // contentOne.open();
  //   // contentTwo.expansionPanel().close();
  // }
}
