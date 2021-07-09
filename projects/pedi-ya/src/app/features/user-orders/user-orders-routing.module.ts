import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';

import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserOrdersListComponent } from './orders-list/user-orders-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserOrdersComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-orders-list',
        pathMatch: 'full'
      },
      {
        path: 'user-orders-list',
        component: UserOrdersListComponent,
        data: { title: 'pedi-ya.user-orders.user-orders-list.title' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOrdersRoutingModule {}
