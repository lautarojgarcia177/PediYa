import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { UserOrder } from "./user-orders.models";

@Injectable()
export class UserOrdersService {
  
    private ordersCollection: AngularFirestoreCollection;
    public orders$: Observable<UserOrder[]>;

  constructor(afs: AngularFirestore) {
    this.ordersCollection = afs.collection<UserOrder[]>('orders');
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

}
