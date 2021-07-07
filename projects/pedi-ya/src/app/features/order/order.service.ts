import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Menu } from "./order.models";

@Injectable()
export class OrderService {
  
    private menusCollection: AngularFirestoreCollection<Menu>;
    menus$: Observable<Menu[]>;

  constructor(afs: AngularFirestore) {
    this.menusCollection = afs.collection<Menu>('menus');
    this.menus$ = this.menusCollection.get().pipe(
        map((querySnapshot) => querySnapshot.docs.map(doc => doc.data()) as Menu[])
    );
  }

}
