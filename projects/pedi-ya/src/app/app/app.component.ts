import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { map, pluck, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { selectOrders } from '../features/order/order.state';
import { CartItem } from '../features/order/cart/cart.model';

@Component({
  selector: 'pedi-ya-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = 'assets/logo.png';
  languages = ['en', 'es'];
  navigation = [
    { link: 'order', label: 'pedi-ya.menu.order' },
    { link: 'user-orders', label: 'pedi-ya.menu.user-orders' },
    { link: 'about', label: 'pedi-ya.menu.about' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'pedi-ya.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  amountOfOrderItems$: Observable<number>;

  constructor(
    private store: Store,
    private storageService: LocalStorageService,
    private router: Router
  ) { }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.amountOfOrderItems$ = this.store.select(selectOrders)
      .pipe(
        pluck('cart'),
        pluck('items'),
        map((cartItems: CartItem[]) => cartItems?.reduce(
          (acc, curr) => acc += curr.amount, 0)),
      );
  }

  onLoginClick() {
    this.router.navigate(['auth']);
  }

  onSignOut() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

}
