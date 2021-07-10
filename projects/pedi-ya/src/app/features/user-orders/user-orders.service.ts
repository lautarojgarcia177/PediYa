import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Menu } from "../order/order.models";
import { UserOrder } from "./user-orders.models";

@Injectable()
export class UserOrdersService {
  
    private ordersCollection: AngularFirestoreCollection;
    public orders$: Observable<UserOrder[]>;

  constructor(private afs: AngularFirestore) {
    this.ordersCollection = this.afs.collection<UserOrder[]>('orders');
    this.orders$ = this.ordersCollection.get().pipe(
        map((querySnapshot) => querySnapshot.docs.map(doc => doc.data())),
        map(userOrders => userOrders.map(userOrder => ({
          ...userOrder,
          timestamp: userOrder.timestamp.seconds
        })
        )),
        map(userOrders => userOrders as UserOrder[])        
    );
  }

  public getMenu(menuId: string): Observable<Menu> {
    return this.afs.collection<any>(`menus`).get().pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ menu: doc.data(), id: doc.id}) )),
      map(documents => documents.find(doc => doc.id == menuId)),
      map(doc => {
        const menu: Menu = {
          id: doc.id,
          ...doc.menu
        }
        return menu;
      })
    );
  }

}
