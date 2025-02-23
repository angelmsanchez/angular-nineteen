import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs';
import { setLanguage } from 'src/app/store/actions';
import { StoreInterface } from 'src/app/store/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatToolbarModule, MatIconModule, TranslateModule]
})
export class HeaderComponent {
  readonly setOpenMenu = output<void>();

  constructor(
    private translateService: TranslateService,
    private store: Store<StoreInterface>
  ) {}

  changeLanguage(language: string): void {
    this.translateService.use(language);
    dayjs.locale(language);
    this.store.dispatch(setLanguage({ language }));
  }
}
