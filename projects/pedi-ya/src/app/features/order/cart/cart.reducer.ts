import { createReducer, on } from "@ngrx/store";
import { CartItem, CartState } from "./cart.model";
import * as cartActions from './cart.actions';
import { Menu } from "../order.models";
import * as _ from "lodash";

export const initialState: CartState = {
    items: [],
    total: 0
};

function calculateSubtotal(cartItem: CartItem): number {
    return cartItem.menu.price * cartItem.amount;
}

function calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce(
        (acc, curr) => {
            return acc + curr?.subtotal;
        },
        0
    );
}

function addItemToCart(state: CartState, menu: Menu) {
    const _state = _.cloneDeep(state);
    let i = 0;
    let found = false;
    // If this menu is already on cart, increment amount of it
    do {
        if (_state.items[i]?.menu?.name === menu.name) {
            _state.items[i].amount++;
            _state.items[i].subtotal = calculateSubtotal(_state.items[i]);
            found = true;
        }
        i++;
    } while (i < _state.items.length && !found);
    _state.total = calculateTotal(_state.items);
    if (found) return _state;
    // If this menu is not already on cart, add it
    let newCartItem: CartItem = {
        menu: menu,
        amount: 1,
        subtotal: 0
    }
    newCartItem.subtotal = calculateSubtotal(newCartItem);
    _state.items.push(newCartItem);
    _state.total = calculateTotal(_state.items);
    return _state;
}

function removeItemFromCart(state: CartState, menu: Menu) {
    const _state = _.cloneDeep(state);
    let i = 0;
    let found = false;
    do {
        if (_state.items[i]?.menu?.name === menu.name) {
            if (_state.items[i]?.amount > 0) {
                _state.items[i].amount--;
                _state.items[i].subtotal = calculateSubtotal(_state.items[i]);
            }
            found = true;
        }
        i++;
    } while (i < _state.items.length && !found);
    _state.items = _state.items.filter(i => i.amount > 0);
    _state.total = calculateTotal(_state.items);
    return _state;
}

const reducer = createReducer(
    initialState,
    on(cartActions.addToCart, (state, { menu }) => {
        return addItemToCart(state, menu);
    }),
    on(cartActions.removeFromCart, (state, { menu }) => {
        return removeItemFromCart(state, menu);
    }),
    on(cartActions.resetCart, (state) => initialState)
);

export function cartReducer(state: CartState, action) {
    return reducer(state, action);
}