import { createReducer, on } from "@ngrx/store";
import { CartItem, CartState } from "./cart.model";
import * as cartActions from './cart.actions';
import { Menu } from "../order.models";
import * as _ from "lodash";

export const initialState: CartState = {
    items: []
};

function addItemToCart(state: CartState, menu: Menu) {
    const _state = _.cloneDeep(state);
    let i = 0;
    let found = false;
    do {
        if (_state.items[i]?.menu?.name === menu.name) {
            _state.items[i].amount++;
            found = true;
        }
        i++;
    } while( i < _state.items.length && !found);
    if (found) return _state;
    const newCartItem: CartItem = {
        menu: menu,
        amount: 1
    }
    _state.items.push(newCartItem);
    return _state;
}

function removeItemFromCart(state: CartState, menu: Menu) {
    const _state = _.cloneDeep(state);
    let i = 0;
    let found = false;
    do {
        if (_state.items[i]?.menu?.name === menu.name) {
            _state.items[i].amount--;
            found = true;
        }
        i++;
    } while( i < _state.items.length && !found);
    return _state;
}

const reducer = createReducer(
    initialState,
    on(cartActions.addToCart, (state, {menu}) => addItemToCart(state, menu)),
    on(cartActions.removeFromCart, (state, {menu}) => removeItemFromCart(state, menu)),
    on(cartActions.resetCart, (state) => initialState)
);

export function cartReducer(state: CartState, action) {
    return reducer(state, action);
}