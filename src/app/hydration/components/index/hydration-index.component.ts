import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectorComponent } from '../change-detector/change-detector.component';
import {
  AccordionComponent,
  CollapseComponent
} from 'src/app/shared/components';

@Component({
  selector: 'app-hydration-index',
  templateUrl: './hydration-index.component.html',
  styleUrls: ['./hydration-index.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    ChangeDetectorComponent,
    AccordionComponent,
    CollapseComponent
  ]
})
export class HydrationIndexComponent {}
