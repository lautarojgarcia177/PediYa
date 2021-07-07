import { createAction, props } from "@ngrx/store";
import { Menu } from "../order.models";

export const addToCart = createAction(
    '[Cart] Add to cart',
    props<{ menu: Menu }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove from cart',
    props<{menu: Menu}>()
);

export const resetCart = createAction(
    '[Cart] Reset cart'
);