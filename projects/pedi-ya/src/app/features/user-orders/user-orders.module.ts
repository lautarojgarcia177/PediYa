import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { UserOrdersRoutingModule } from './user-orders-routing.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { MenuListComponent } from '../order/menu-list/menu-list.component';
import { RouterModule } from '@angular/router';
import { UserOrdersListComponent } from './orders-list/user-orders-list.component';
import { UserOrdersService } from './user-orders.service';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/user-orders/`,
    '.json'
  );
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    UserOrdersRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    // StoreModule.forFeature(FEATURE_NAME, reducers),
    // EffectsModule.forFeature([
    //   OrderEffects,
    //   CartEffects
    // ])
  ],
  declarations: [
    UserOrdersComponent,
    UserOrdersListComponent,
  ],
  providers: [
    UserOrdersService
  ]
})
export class UserOrdersModule {
  constructor() {}
}
