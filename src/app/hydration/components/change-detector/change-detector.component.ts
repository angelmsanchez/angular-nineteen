import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-change-detector',
  templateUrl: './change-detector.component.html',
  styleUrls: ['./change-detector.component.scss'],
  imports: [CommonModule]
})
export class ChangeDetectorComponent {
  @Input() title = '';
}
