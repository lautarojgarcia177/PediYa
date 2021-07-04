import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../../../core/core.module';

import { actionFormReset, actionFormUpdate } from '../login.actions';
import { selectFormState } from '../login.selectors';
import { Login } from '../login.model';

@Component({
  selector: 'pedi-ya-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [''],
  });

  formValueChanges$: Observable<Login>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.formValueChanges$ = this.form.valueChanges.pipe(
      debounceTime(500),
      // filter((form: Login) => form.autosave)
    );
    this.store
      .pipe(select(selectFormState), take(1))
      .subscribe((form) => this.form.patchValue(form.login));
  }

  update(form: Login) {
    this.store.dispatch(actionFormUpdate({ login: form }));
  }

  save() {
    this.store.dispatch(actionFormUpdate({ login: this.form.value }));
  }

  submit() {
    if (this.form.valid) {
      this.save();
      this.notificationService.info(
        (this.form.value.requestGift
          ? this.translate.instant('pedi-ya.login-register.form.text4')
          : this.translate.instant('pedi-ya.login-register.form.text5')) +
          ' : ' +
          this.translate.instant('pedi-ya.login-register.form.text6')
      );
    }
  }

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    this.store.dispatch(actionFormReset());
  }
}
