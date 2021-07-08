import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
    AppState,
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { selectOrders, State } from '../order.state';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'pedi-ya-order',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  
    cart$ = this.store.select(selectOrders).pipe(pluck('cart'));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }
}
