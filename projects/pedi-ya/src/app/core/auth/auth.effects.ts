import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { authLogin, authLogout, redirectToLogin } from './auth.actions';

import * as cartActions from '../../features/order/cart/cart.actions';
import * as authActions from '../../core/auth/auth.actions';

import { AppState } from '../core.state';
import { Store } from '@ngrx/store';
import { selectLoginRedirectRoute } from './auth.selectors';

export const AUTH_KEY = 'AUTH';
@Injectable()
export class AuthEffects {

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap( authData =>
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: true,
            user: authData.user
          })
        ),
        // Redirect to page user wanted to see before login
        switchMap(() => this.store.select(selectLoginRedirectRoute)),
        tap( (loginRedirectRoute: string) => {
          if (loginRedirectRoute != '') {
            this.router.navigateByUrl(loginRedirectRoute);
          } else {
            this.router.navigate(['menu-list'])
          }
        }
        ),
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['auth']);
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
        }),
        map(() => cartActions.resetCart())
      )
  );

  redirectGuestToLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(redirectToLogin),
        map(() => authActions.authLogout())
      ),
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<AppState>,
  ) {}
}
