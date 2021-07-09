import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { FEATURE_NAME, reducers } from './order.state';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderEffects } from './order.effects';
import { MenuListComponent } from './menu-list/menu-list.component';
import { OrderService } from './order.service';
import { CartEffects } from './cart/cart.effects';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { OrderCancelledComponent } from './order-cancelled/order-cancelled.component';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/order/`,
    '.json'
  );
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    OrderRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      OrderEffects,
      CartEffects
    ])
  ],
  declarations: [
    OrderComponent,
    MenuListComponent,
    CheckoutComponent,
    OrderConfirmedComponent,
    OrderCancelledComponent,
  ],
  providers: [OrderService]
})
export class OrderModule {
  constructor() {}
}
