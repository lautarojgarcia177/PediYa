export interface Login {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginState {
  login: Login;
}
