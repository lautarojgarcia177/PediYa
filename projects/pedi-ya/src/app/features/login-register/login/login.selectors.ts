import { createSelector } from '@ngrx/store';

import { LoginRegisterState, selectLoginRegister } from '../login-register.state';

export const selectFormState = createSelector(
  selectLoginRegister,
  (state: LoginRegisterState) => state.login
);
