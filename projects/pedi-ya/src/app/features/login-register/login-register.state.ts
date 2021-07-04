import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';

import { loginReducer } from './login/login.reducer';
import { LoginState } from './login/login.model';

export const FEATURE_NAME = 'loginRegister';
export const selectLoginRegister =
  createFeatureSelector<State, LoginRegisterState>(FEATURE_NAME);
export const reducers: ActionReducerMap<LoginRegisterState> = {
  login: loginReducer
};

export interface LoginRegisterState {
  login: LoginState;
  // register: LoginState;
}

export interface State extends AppState {
  loginRegister: LoginRegisterState;
}
