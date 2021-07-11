export interface AuthState {
  isAuthenticated: boolean;
  user: User,
  loginRedirectRoute: string;
}

export interface User {
    displayName: string;
    email: string;
    id: string;
}