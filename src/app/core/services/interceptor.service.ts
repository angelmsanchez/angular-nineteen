/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TOKEN_LOCAL_STORAGE_KEY } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || '';
    // if (!token) {
    //   return next.handle(req);
    // }
    const apiUrl: string = environment.api;
    const request = req.clone({
      url:
        !req.url.includes('i18n') && apiUrl ? `${apiUrl}${req.url}` : req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    });
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        // if (httpErrorResponse.status === 401) {}
        return throwError(httpErrorResponse);
      })
    );
  }
}
