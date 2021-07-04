import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'comidas-ya-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'comidas-ya.examples.menu.todos' },
    { link: 'stock-market', label: 'comidas-ya.examples.menu.stocks' },
    { link: 'theming', label: 'comidas-ya.examples.menu.theming' },
    { link: 'crud', label: 'comidas-ya.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'comidas-ya.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'comidas-ya.examples.menu.form' },
    { link: 'notifications', label: 'comidas-ya.examples.menu.notifications' },
    { link: 'elements', label: 'comidas-ya.examples.menu.elements' },
    {
      link: 'authenticated',
      label: 'comidas-ya.examples.menu.auth',
      auth: true
    }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
