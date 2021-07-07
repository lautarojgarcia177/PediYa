import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';

import { OrderComponent } from './order/order.component';
import { MenuListComponent } from './menu-list/menu-list.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
