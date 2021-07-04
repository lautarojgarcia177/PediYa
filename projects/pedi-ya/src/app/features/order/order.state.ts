import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';

import { todosReducer } from './todos/todos.reducer';
import { TodosState } from './todos/todos.model';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketState } from './stock-market/stock-market.model';
import { bookReducer } from './crud/books.reducer';
import { formReducer } from './form/form.reducer';
import { FormState } from './form/form.model';
import { BookState } from './crud/books.model';

export const FEATURE_NAME = 'order';
export const selectOrder =
  createFeatureSelector<State, OrderState>(FEATURE_NAME);
export const reducers: ActionReducerMap<OrderState> = {
  todos: todosReducer,
  stocks: stockMarketReducer,
  books: bookReducer,
  form: formReducer
};

export interface OrderState {
  todos: TodosState;
  stocks: StockMarketState;
  form: FormState;
  books: BookState;
}

export interface State extends AppState {
  order: OrderState;
}
