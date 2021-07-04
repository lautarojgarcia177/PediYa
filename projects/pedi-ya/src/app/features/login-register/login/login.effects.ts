import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { actionFormUpdate } from './login.actions';

export const FORM_KEY = 'LOGIN.FORM';

@Injectable()
export class LoginEffects {
  persistForm = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFormUpdate),
        tap((action) =>
          this.localStorageService.setItem(FORM_KEY, { login: action.login })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}
}
