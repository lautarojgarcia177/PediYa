import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/animations/route.animations";
import { Menu } from "../order.models";
import { OrderService } from "../order.service";
import { State } from "../order.state";
import * as cartActions from "../cart/cart.actions";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
    selector: 'pedi-ya-menu-card',
    templateUrl: './menu-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListComponent implements OnInit, OnDestroy{

    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    menusSubscription: Subscription;
    menus: Menu[];
    storeSubscription: Subscription;

    constructor(private orderService: OrderService, private store: Store<State>, private router: Router, private changeDetector: ChangeDetectorRef) { 
        
    }

    ngOnInit(): void {
        this.menusSubscription = this.orderService.menus$.pipe(tap(console.warn)).subscribe(menus => {
            this.menus = menus;
            this.changeDetector.detectChanges();
        });
        this.storeSubscription = this.store.subscribe(console.log);
    }

    ngOnDestroy(): void {
        this.menusSubscription.unsubscribe();
        this.storeSubscription.unsubscribe();
    }

    public onAddMenuToCart(menu: Menu) {
        console.log(menu);
        this.store.dispatch(cartActions.addToCart({menu}));
    }

    public onRemoveMenuFromCart(menu: Menu) {
        this.store.dispatch(cartActions.removeFromCart({menu}));
    }

    public onResetCart() {
        this.store.dispatch(cartActions.resetCart());
    }

    public onGoToCheckout() {
        this.router.navigate(['order', 'checkout']);
    }

}
