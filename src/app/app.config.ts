import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { InterceptorService } from './core/services/';
import {
  provideTanStackQuery,
  QueryClient
} from '@tanstack/angular-query-experimental';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

registerLocaleData(localeEs);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5 // 5 minute
    }
  }
});
const HttpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, '../i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    },
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ]),
    importProvidersFrom([StoreModule.forRoot(reducers)]),
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    provideTanStackQuery(queryClient),
    provideClientHydration(withEventReplay())
  ]
};
