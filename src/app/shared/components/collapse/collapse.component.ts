import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css'],
  imports: [MatExpansionModule]
})
export class CollapseComponent {
    // children = input<>();
}
