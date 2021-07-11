import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LazyElementsModule } from '@angular-extensions/elements';

import { SharedModule } from '../../shared/shared.module';

import { UserOrdersRoutingModule } from './user-orders-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserOrdersListComponent } from './user-orders-list/user-orders-list.component';
import { UserOrdersService } from './user-orders.service';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    UserOrdersRoutingModule,
    NgxEchartsModule
  ],
  declarations: [
    UserOrdersListComponent
  ],
  providers: [UserOrdersService]
})
export class UserOrdersModule {
  constructor() {}
}
