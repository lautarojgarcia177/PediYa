import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'pedi-ya-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'pedi-ya.examples.menu.todos' },
    { link: 'stock-market', label: 'pedi-ya.examples.menu.stocks' },
    { link: 'theming', label: 'pedi-ya.examples.menu.theming' },
    { link: 'crud', label: 'pedi-ya.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'pedi-ya.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'pedi-ya.examples.menu.form' },
    { link: 'notifications', label: 'pedi-ya.examples.menu.notifications' },
    { link: 'elements', label: 'pedi-ya.examples.menu.elements' },
    {
      link: 'authenticated',
      label: 'pedi-ya.examples.menu.auth',
      auth: true
    }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
