import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { iif, Observable, throwError } from "rxjs";
import { map, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
import { AppState } from "../../core/core.state";
import { Menu } from "./order.models";
import * as cartActions from "./cart/cart.actions";
import { selectOrder } from "./order.state";
import { selectAuth } from "../../core/core.module";
import * as uiActions from '../../core/ui/ui.actions';
import { AuthState } from "../../core/auth/auth.models";

@Injectable()
export class OrderService {

  private menusCollection: AngularFirestoreCollection<Menu>;
  menus$: Observable<Menu[]>;

  constructor(private afs: AngularFirestore, private store: Store<AppState>) {
    this.menusCollection = this.afs.collection<Menu>('menus');
    this.menus$ = this.menusCollection.get().pipe(
      map((querySnapshot) => querySnapshot.docs.map(doc => doc.data()) as Menu[])
    );
  }

  public confirmOrder(): Observable<any> {

    const confirmOrder$ = this.store.select(selectOrder).pipe(
      withLatestFrom(this.store.select(selectAuth)),
      take(1),
      map(([order, auth]) => 
        ({
          cart: order.cart,
          timestamp: new Date(),
          user: auth.user.id
        })
      ),
      switchMap(document => {
        this.store.dispatch(uiActions.showSpinner())
        return this.afs.collection('orders').doc().set(document);
      }),
      take(1),
      tap(() => this.store.dispatch(uiActions.hideSpinner())),
      tap(() => this.store.dispatch(cartActions.resetCart()))
    );

    // Checks if user entered as guest
    return this.store.select(selectAuth).pipe(
      switchMap(auth => iif(() => !!auth.user.displayName, confirmOrder$, throwError('Not a registered user')))
    );

  }

}
