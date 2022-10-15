import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../store/auth';
import { AppState } from '../store/app.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(AuthSelectors.selectToken).pipe(
      first(),
      switchMap((token) => {
        const requestParams: any = { url: `${this.baseUrl}${request.url}` };
        if (token) {
          requestParams.setHeaders = { Authorization: `Bearer ${token}` };
        }
        const changedRequest = request.clone(requestParams);
        return next.handle(changedRequest);
      })
    );
  }
}
