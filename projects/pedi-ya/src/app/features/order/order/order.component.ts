import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../order.state';

@Component({
  selector: 'pedi-ya-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  order = [
    { link: 'todos', label: 'pedi-ya.order.menu.todos' },
    { link: 'stock-market', label: 'pedi-ya.order.menu.stocks' },
    { link: 'theming', label: 'pedi-ya.order.menu.theming' },
    { link: 'crud', label: 'pedi-ya.order.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'pedi-ya.order.menu.simple-state-management'
    },
    { link: 'form', label: 'pedi-ya.order.menu.form' },
    { link: 'notifications', label: 'pedi-ya.order.menu.notifications' },
    { link: 'elements', label: 'pedi-ya.order.menu.elements' },
    {
      link: 'authenticated',
      label: 'pedi-ya.order.menu.auth',
      auth: true
    }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
