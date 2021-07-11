import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
import { AppState } from "../../core/core.state";
import { Menu } from "./order.models";
import * as cartActions from "./cart/cart.actions";
import { selectOrder } from "./order.state";
import { selectAuth } from "../../core/core.module";

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
    return this.store.select(selectOrder).pipe(
      withLatestFrom(this.store.select(selectAuth)),
      take(1),
      map(([order, auth]) => 
        ({
          cart: order.cart,
          timestamp: Math.floor(Date.now() / 1000),
          user: auth.user.id
        })
      ),
      switchMap(document => this.afs.collection('orders').doc().set(document)),
      take(1),
      tap(() => this.store.dispatch(cartActions.resetCart()))
    )
  }

}
