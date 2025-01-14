import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { LayoutComponent } from './core/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [LayoutComponent, TranslateModule]
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.initializeTranslateSettings();
  }

  private initializeTranslateSettings(): void {
    const language = 'es';
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
    dayjs.locale(language);
  }
}
