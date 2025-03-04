import { Component, output, viewChild } from '@angular/core';
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
  handleOpen = output();
  handleClose = output();

  handleOpened(): void {
    this.handleOpen.emit();
  }

  handleClosed(): void {
    this.handleClose.emit();
  }
}
