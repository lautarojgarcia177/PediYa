import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {
  AppState,
} from '../../../core/core.module';


@Component({
  selector: 'pedi-ya-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }
}
