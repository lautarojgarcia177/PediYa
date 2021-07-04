import { createSelector } from '@ngrx/store';

import { OrderState, selectOrder } from '../order.state';

export const selectStockMarket = createSelector(
  selectOrder,
  (state: OrderState) => state.stocks
);
