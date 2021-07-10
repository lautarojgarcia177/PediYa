import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { FEATURE_NAME, reducers } from '../order/order.state';
import { OrderEffects } from '../order/order.effects';
import { CartEffects } from '../order/cart/cart.effects';
import { UserOrdersRoutingModule } from './user-orders-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserOrdersListComponent } from './user-orders-list/user-orders-list.component';
import { UserOrdersService } from './user-orders.service';
import { UserOrderDetailComponent } from './user-orders-list/user-order-detail.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    UserOrdersRoutingModule,
    NgxEchartsModule
  ],
  declarations: [
    UserOrdersListComponent,
    UserOrderDetailComponent
  ],
  providers: [UserOrdersService]
})
export class UserOrdersModule {
  constructor() {}
}
