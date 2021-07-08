import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/animations/route.animations";
import { Menu } from "../order.models";
import { OrderService } from "../order.service";
import { selectOrders, State } from "../order.state";
import * as cartActions from "../cart/cart.actions";
import { combineLatest, Subscription } from "rxjs";
import { map, mergeMap, pluck, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
import { CartItem, CartState } from "../cart/cart.model";
import { AppState } from "../../../core/core.state";
import { concatLatestFrom } from "@ngrx/effects";

class MenuWithCart implements Menu {
    id: string;
    name: string;
    description: string;
    img: string;
    price: number;
    amountOnCart: number;
    constructor(obj?: Partial<MenuWithCart>) {
        this.id = null;
        this.name = null;
        this.description = null;
        this.img = null;
        this.price = null;
        this.amountOnCart = 0;
        Object.assign(this, obj);
    }
}

@Component({
    selector: 'pedi-ya-menu-card',
    templateUrl: './menu-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListComponent {

    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    public menusWithCart: MenuWithCart[];

    menusAndStore$ = this.orderService.menus$.pipe(
        take(1),
        tap(menus => {
            let _menusWithCart: MenuWithCart[] = [];
            menus.forEach(menu => {
                const menuWithCart = new MenuWithCart(menu);
                _menusWithCart.push(menuWithCart);
            });
            this.menusWithCart = _menusWithCart;
        }),
        switchMap(() => this.store.select(selectOrders).pipe(pluck('cart'), pluck('items'))),
        tap(() => this.menusWithCart.forEach(menu => menu.amountOnCart = 0)),
        tap((cartItems) => {
            cartItems.forEach(cartItem => {
                this.menusWithCart.find(menu => menu.name === cartItem.menu.name).amountOnCart = cartItem.amount;
            })
        }),
        tap(() => this.changeDetector.detectChanges()),
    )

    cartItems$ = this.store.select(selectOrders).pipe(pluck('cart'))

    constructor(private orderService: OrderService, private store: Store<AppState>, private router: Router, private changeDetector: ChangeDetectorRef) {
    }

    public onAddMenuToCart(menuWithCart: MenuWithCart) {
        const menu: Menu = {
            id: menuWithCart.id,
            name: menuWithCart.name,
            description: menuWithCart.description,
            img: menuWithCart.img,
            price: menuWithCart.price,
        }
        this.store.dispatch(cartActions.addToCart({ menu }));
    }

    public onRemoveMenuFromCart(menuWithCart: MenuWithCart) {
        const menu: Menu = {
            id: menuWithCart.id,
            name: menuWithCart.name,
            description: menuWithCart.description,
            img: menuWithCart.img,
            price: menuWithCart.price,
        }
        this.store.dispatch(cartActions.removeFromCart({ menu }));
    }

    public onResetCart() {
        this.store.dispatch(cartActions.resetCart());
    }

    public onGoToCheckout() {
        this.router.navigate(['order', 'checkout']);
    }

}
