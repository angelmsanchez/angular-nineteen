import { Component, viewChild } from '@angular/core';
import {
  MatExpansionModule,
  MatExpansionPanel
} from '@angular/material/expansion';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css'],
  imports: [MatExpansionModule]
})
export class CollapseComponent {
  expansionPanel = viewChild.required<MatExpansionPanel>('expansionPanel');
  // handleOpen = output();
  // handleClose = output();
  // expanded = model(true);

  // close(): void {
  //   this.expanded.set(false);
  // }

  // open(): void {
  //   this.expanded.set(true);
  // }

  // handleOpened(): void {
  //   this.open();
  //   this.handleOpen.emit();
  // }

  // handleClosed(): void {
  //   this.close();
  //   this.handleClose.emit();
  // }
}
