import { LoginState, Login } from './login.model';
import { actionFormReset, actionFormUpdate } from './login.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: LoginState = {
  login: {} as Login
};

const reducer = createReducer(
  initialState,
  on(actionFormUpdate, (state, { login }) => ({ ...state, login })),
  on(actionFormReset, () => initialState)
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return reducer(state, action);
}
