import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { NotificationService } from '../core.module';
import * as authActions from './auth.actions';
import { User } from './auth.models';

@Component({
  selector: 'pedi-ya-login',
  template: `
    <ngx-auth-firebaseui 
      (onSuccess)="onSuccess($event)"
      [providers]="[providers.EmailAndPassword, providers.Google]"
      [signInTabText]="'ngxauthfirebaseui.signInTabText' | translate"
      [signInCardTitleText]="'ngxauthfirebaseui.signInCardTitleText' | translate"
      [loginButtonText]="'ngxauthfirebaseui.loginButtonText' | translate"
      [forgotPasswordButtonText]="'ngxauthfirebaseui.forgotPasswordButtonText' | translate"
      [nameText]="'ngxauthfirebaseui.nameText' | translate"
      [nameErrorRequiredText]="'ngxauthfirebaseui.nameErrorRequiredText' | translate"
      [nameErrorMinLengthText]="'ngxauthfirebaseui.nameErrorMinLengthText' | translate"
      [nameErrorMaxLengthText]="'ngxauthfirebaseui.nameErrorMaxLengthText' | translate"
      [emailText]="'ngxauthfirebaseui.emailText' | translate"
      [emailErrorRequiredText]="'ngxauthfirebaseui.emailErrorRequiredText' | translate"
      [emailErrorPatternText]="'ngxauthfirebaseui.emailErrorPatternText' | translate"
      [passwordText]="'ngxauthfirebaseui.passwordText' | translate"
      [passwordErrorRequiredText]="'ngxauthfirebaseui.passwordErrorRequiredText' | translate"
      [registerTabText]="'ngxauthfirebaseui.registerTabText' | translate"
      [registerCardTitleText]="'ngxauthfirebaseui.registerCardTitleText' | translate"
      [registerButtonText]="'ngxauthfirebaseui.registerButtonText' | translate"
      [guestButtonText]="'ngxauthfirebaseui.guestButtonText' | translate"
      [resetPasswordTabText]="'ngxauthfirebaseui.resetPasswordTabText' | translate"
      [resetPasswordInputText]="'ngxauthfirebaseui.resetPasswordInputText' | translate"
      [resetPasswordErrorRequiredText]="'ngxauthfirebaseui.resetPasswordErrorRequiredText' | translate"
      [resetPasswordErrorPatternText]="'ngxauthfirebaseui.resetPasswordErrorPatternText' | translate"
      [resetPasswordActionButtonText]="'ngxauthfirebaseui.resetPasswordActionButtonText' | translate"
      [resetPasswordInstructionsText]="'ngxauthfirebaseui.resetPasswordInstructionsText' | translate"
      [emailConfirmationTitle]="'ngxauthfirebaseui.emailConfirmationTitle' | translate"
      [emailConfirmationText]="'ngxauthfirebaseui.emailConfirmationText' | translate"
      >
    </ngx-auth-firebaseui>
  `,
})
export class AuthComponent implements OnInit {

  public providers = AuthProvider;

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  onSuccess(event) {
      const user: User = {
        displayName: event.user.displayName,
        email: event.user.email
      }
      this.store.dispatch(authActions.authLogin({user}));
  }

}
