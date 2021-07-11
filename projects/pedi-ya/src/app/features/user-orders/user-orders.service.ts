import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Menu } from "../order/order.models";
import { UserOrder } from "./user-orders.models";

@Injectable()
export class UserOrdersService {

  constructor(private afs: AngularFirestore) {
  }

  public getOrders(): Observable<any[]> {
    return this.afs.collection<UserOrder[]>('orders').get().pipe(
      map((querySnapshot) => querySnapshot.docs.map(doc => doc.data())), 
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
