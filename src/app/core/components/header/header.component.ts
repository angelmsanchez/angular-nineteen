import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatToolbarModule, MatIconModule, TranslateModule]
})
export class HeaderComponent {
  @Output() setOpenMenu = new EventEmitter<void>();

  constructor(private translateService: TranslateService) {}

  changeLanguage(language: string): void {
    console.log('changeLanguage', language);
    this.translateService.use(language);
    // dayjs.locale(language);
  }
}
