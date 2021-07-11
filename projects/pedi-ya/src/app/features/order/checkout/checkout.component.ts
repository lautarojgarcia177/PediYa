import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as cartActions from '../cart/cart.actions';

import {
  AppState,
  NotificationService,
} from '../../../core/core.module';

import { selectOrder } from '../order.state';
import { pluck } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'pedi-ya-order',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {

  cart$ = this.store.select(selectOrder).pipe(pluck('cart'));

  constructor(private store: Store<AppState>, private notificationService: NotificationService, private translate: TranslateService, private router: Router, private orderService: OrderService) { }

  displayedColumns = ['name', 'amount', 'price', 'subtotal'];

  onConfirmOrder() {
    this.orderService.confirmOrder().subscribe(
      () => {
        this.translate.get('pedi-ya.order.checkout.orderConfirmed').subscribe(translation =>
          this.notificationService.success(translation)
        );
        this.router.navigate(['order', 'order-confirmed']);
      }
    )
  }

  onCancelOrder() {
    this.store.dispatch(cartActions.resetCart());
    this.translate.get('pedi-ya.order.checkout.orderCancelled').subscribe(translation =>
      this.notificationService.info(translation)
    )
    this.router.navigate(['order', 'order-cancelled']);
  }

}
