import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { pluck, tap, withLatestFrom } from 'rxjs/operators';
import * as cartActions from '../cart/cart.actions';

import { AppState, LocalStorageService } from '../../../core/core.module';
import { CartState } from './cart.model';
import { of } from 'rxjs';
import { selectOrders } from '../order.state';


export const CART_KEY = 'ORDER.CART';

@Injectable()
export class CartEffects {

  persistCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
            cartActions.addToCart,
            cartActions.removeFromCart,
            cartActions.resetCart
        ),
        withLatestFrom(
            this.store.select(selectOrders)
            .pipe(
                pluck('cart')
            )
        ),
        tap(([action, cart]) =>
          this.localStorageService.setItem(CART_KEY, cart)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}
}
