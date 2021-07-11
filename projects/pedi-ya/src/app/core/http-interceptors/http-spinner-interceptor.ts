import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UiState } from '../ui/ui.models';
import * as uiActions from '../ui/ui.actions';

@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {

  constructor(private store: Store<UiState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => event instanceof HttpResponse ? this.store.dispatch(uiActions.hideSpinner()) : this.store.dispatch(uiActions.showSpinner()),
        () => this.store.dispatch(uiActions.hideSpinner())
      )
    );
  }

}
