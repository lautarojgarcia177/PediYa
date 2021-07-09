import { EntityState } from "@ngrx/entity";
import { CartState } from "../order/cart/cart.model";

export interface UserOrder {
    user: string,
    cart: CartState,
    timestamp: Date
}

// export type MenuState = EntityState<UserOrder>;