import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';
import { CartState } from './cart/cart.model';
import { cartReducer } from './cart/cart.reducer';
  
export const reducers: ActionReducerMap<OrderState> = {
  cart: cartReducer
};

export interface OrderState {
  cart: CartState;
}

export interface State extends AppState {
  cart: CartState;
}
