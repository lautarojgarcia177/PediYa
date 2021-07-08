import { Menu } from "../order.models";

export interface CartItem {
    menu: Menu;
    amount: number;
    subtotal: number;
}

export interface CartState {
    items: CartItem[];
    total: number;
}