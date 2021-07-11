import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AppState } from "../../core/core.state";
import { Menu } from "../order/order.models";
import { UserOrder } from "./user-orders.models";
import * as uiActions from '../../core/ui/ui.actions';

@Injectable()
export class UserOrdersService {

  constructor(private afs: AngularFirestore, private store: Store<AppState>) {
  }

  public getOrders(): Observable<any[]> {
    return this.afs.collection<UserOrder[]>('orders').get().pipe(
      map((querySnapshot) => querySnapshot.docs.map(doc => doc.data())), 
  );
  }

  public getMenu(menuId: string): Observable<Menu> {
    const menu$ = this.afs.collection<any>(`menus`).get().pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ menu: doc.data(), id: doc.id}) )),
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
