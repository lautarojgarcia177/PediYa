import { createSelector } from '@ngrx/store';

import { selectRouterState } from '../../../core/core.module';
import { selectOrder, OrderState } from '../order.state';

import { bookAdapter } from './books.reducer';

const { selectEntities, selectAll } = bookAdapter.getSelectors();

export const selectBooks = createSelector(
  selectOrder,
  (state: OrderState) => state.books
);

export const selectAllBooks = createSelector(selectBooks, selectAll);
export const selectBooksEntities = createSelector(selectBooks, selectEntities);

export const selectSelectedBook = createSelector(
  selectBooksEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);
