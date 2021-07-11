import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';
import { tap } from 'rxjs/operators';
import { redirectToLogin } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, routerSnapshot: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(routerSnapshot.url);
  }

  checkLogin(url: string): Observable<boolean> {
    return this.store.pipe(select(selectIsAuthenticated)).pipe(
      tap(isAuth => {
        if (!isAuth) {
          // Remember url user wanto to visit before being redirected to login
          this.store.dispatch(redirectToLogin({ loginRedirectRoute: url}));
          this.router.navigate(['auth']);
          return of(false);
        } else {
          return of(true);
        }
      })
    );
  }

}
