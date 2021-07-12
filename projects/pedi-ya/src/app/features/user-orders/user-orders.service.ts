import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AppState } from "../../core/core.state";
import { Menu } from "../order/order.models";
import { UserOrder } from "./user-orders.models";
import * as uiActions from '../../core/ui/ui.actions';
import { selectAuth } from "../../core/auth/auth.selectors";
// import { Timestamp } from "@firebase/firestore-types"
import { CartState } from "../order/cart/cart.model";

import firebase from 'firebase';

interface FirebaseUserOrder {
  user: string,
  cart: CartState,
  timestamp: { seconds: number, nanoseconds: number }
};

@Injectable()
export class UserOrdersService {

  constructor(private afs: AngularFirestore, private store: Store<AppState>) {
  }

  public getOrders(): Observable<any[]> {
    return this.afs.collection<FirebaseUserOrder[]>('orders').get().pipe(
      map((querySnapshot) => querySnapshot.docs.map(doc => doc.data())),
      tap(console.info)
    );
  }

  public getCurrentUserOrders(): Observable<UserOrder[]> {
    return this.store.select(selectAuth).pipe(
      switchMap(auth => this.afs.collection<FirebaseUserOrder>('orders', ref => ref.where('user', '==', auth.user.id)).get().pipe(
        map((querySnapshot) => querySnapshot.docs.map(doc => doc.data())),
        map(userOrders =>
          userOrders.map(userOrder => {
            const timestampInstance = new firebase.firestore.Timestamp(userOrder.timestamp.seconds, userOrder.timestamp.nanoseconds);
            return {
              ...userOrder,
              timestamp: timestampInstance.toDate()
            }
          })
        ),
        tap(console.info)
      ))
    )
  }

  public getMenu(menuId: string): Observable<Menu> {
    const menu$ = this.afs.collection<any>(`menus`).get().pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ menu: doc.data(), id: doc.id }))),
      map(documents => documents.find(doc => doc.id == menuId)),
      map(doc => {
        const menu: Menu = {
          id: doc.id,
          ...doc.menu
        }
        return menu;
      })
    )
    // Show and hide spinner, this is needed because angularFire SDK doesn't use Angular's httpClient, so the interceptor doesn't intercept Firebase calls to show the spinner
    return of(1).pipe(
      tap(() => this.store.dispatch(uiActions.showSpinner())),
      switchMap(() => menu$),
      tap(() => this.store.dispatch(uiActions.hideSpinner())),
    );
  }

}
