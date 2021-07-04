import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SearchMenuComponent } from './menu-list/search-menu/search-menu.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { LazyElementsModule } from '@angular-extensions/elements';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/order/`,
    '.json'
  );
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MenuListComponent,
    SearchMenuComponent
  ],
  imports: [
    LazyElementsModule,
    OrderRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
  ]
})
export class OrderModule { 
  constructor() {}
}
