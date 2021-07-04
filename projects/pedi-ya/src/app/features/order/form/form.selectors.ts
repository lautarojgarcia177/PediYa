import { createSelector } from '@ngrx/store';

import { OrderState, selectOrder } from '../order.state';

export const selectFormState = createSelector(
  selectOrder,
  (state: OrderState) => state.form
);
