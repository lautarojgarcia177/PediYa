import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';

import { OrderComponent } from './order/order.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { OrderCancelledComponent } from './order-cancelled/order-cancelled.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      {
        path: '',
        redirectTo: 'menu-list',
        pathMatch: 'full'
      },
      {
        path: 'menu-list',
        component: MenuListComponent,
        data: { title: 'pedi-ya.order.menu-list.title' }
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: { title: 'pedi-ya.order.checkout.title' },
      },
      {
        path: 'order-confirmed',
        component: OrderConfirmedComponent,
        data: { title: 'pedi-ya.order.order-confirmed.title' },
        canActivate: [AuthGuardService],
      },
      {
        path: 'order-cancelled',
        component: OrderCancelledComponent,
        data: { title: 'pedi-ya.order.order-cancelled.title' },
        canActivate: [AuthGuardService],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
