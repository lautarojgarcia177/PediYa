import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from './auth.actions';
import { User } from './auth.models';

@Component({
  selector: 'pedi-ya-login',
  template: `
    <ngx-auth-firebaseui (onSuccess)="onLoginSuccess($event)" (onError)="printError($event)"></ngx-auth-firebaseui>
  `,
})
export class AuthComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  onLoginSuccess(event) {
      const user: User = {
        displayName: event.user.displayName,
        email: event.user.email
      }
      this.store.dispatch(authActions.authLogin({user}));
  }

  printError(event) {
    console.error(event);
  }

}
