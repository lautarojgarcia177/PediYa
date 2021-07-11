import { AuthState } from './auth.models';
import * as authActions from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loginRedirectRoute: ''
};

const reducer = createReducer(
  initialState,
  on(authActions.authLogin, (state, {user}) => ({ ...state, isAuthenticated: true, user, loginRedirectRoute: '' })),
  on(authActions.authLogout, (state) => ({ ...state, isAuthenticated: false, loginRedirectRoute: '' })),
  on(authActions.redirectToLogin, (state, {loginRedirectRoute}) => ({ ...state, loginRedirectRoute})),
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
