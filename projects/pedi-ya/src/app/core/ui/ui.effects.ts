import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  tap,
} from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

import * as uiActions from './ui.actions';

@Injectable()
export class UiEffects {

    showSpinner = createEffect(
        () =>
          this.actions$.pipe(
            ofType(
                uiActions.showSpinner
            ),
            tap(() => console.log('show spinner effect')),
            tap(() =>
            this.spinner.show()
            )
            ),
            { dispatch: false }
            );
            
            hideSpinner = createEffect(
              () =>
              this.actions$.pipe(
                ofType(
                  uiActions.hideSpinner
                  ),
                  tap(() => console.log('hide spinner effect')),
                  tap(() =>
              this.spinner.hide()
            )
          ),
        { dispatch: false }
      );

  constructor(
    private actions$: Actions,
    private spinner: NgxSpinnerService
  ) {}
}
