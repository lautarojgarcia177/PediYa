import { EntityState } from "@ngrx/entity";

export interface Menu {
    id: string;
    name: string;
    description: string;
    img: string;
    price: number;
}

export type MenuState = EntityState<Menu>;