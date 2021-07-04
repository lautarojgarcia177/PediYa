import { createAction, props } from '@ngrx/store';
import { Login } from './login.model';

export const actionFormUpdate = createAction(
  '[Login] Update',
  props<{ login: Login }>()
);

export const actionFormReset = createAction('[Login] Reset');
