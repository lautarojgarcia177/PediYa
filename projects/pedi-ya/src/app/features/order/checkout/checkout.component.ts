import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import * as cartActions from '../cart/cart.actions';

import {
  AppState,
  routeAnimations,
  ROUTE_ANIMATIONS_ELEMENTS,
  selectIsAuthenticated
} from '../../../core/core.module';

export interface Transaction {
  item: string;
  cost: number;
}

import { selectOrders, State } from '../order.state';
import { pluck, tap } from 'rxjs/operators';
import { CartState } from '../cart/cart.model';

@Component({
  selector: 'pedi-ya-order',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  cart$ = this.store.select(selectOrders).pipe(pluck('cart'));

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  displayedColumns = ['name','amount', 'price', 'subtotal'];
  
  onConfirmOrder() {
    this.store.dispatch(cartActions.resetCart());
  }

}
