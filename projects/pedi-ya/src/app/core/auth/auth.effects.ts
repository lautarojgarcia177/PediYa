import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { authLogin, authLogout } from './auth.actions';

import * as cartActions from '../../features/order/cart/cart.actions';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() => 
          this.router.navigate(['menu-list'])
        ),
        tap( authData =>
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: true,
            user: authData.user
          })
        )
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

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
}
