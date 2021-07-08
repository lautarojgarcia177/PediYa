export interface AuthState {
  isAuthenticated: boolean;
  user: User
}

export interface User {
    displayName: string;
    email: string;
}