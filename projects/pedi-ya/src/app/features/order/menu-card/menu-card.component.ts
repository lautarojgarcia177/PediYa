import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Menu } from "../order.models";

@Component({
    selector: 'pedi-ya-menu-card',
    template: `
        <style>
            .example-card {
                max-width: 400px;
            }
            
            .example-header-image {
                background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
                background-size: cover;
            }
        </style>
        <mat-card class="example-card">
        <mat-card-header>
            <mat-card-title>{{menu?.name}}</mat-card-title>
        </mat-card-header>
        <img mat-card-image [src]="menu?.img" alt="Photo of {{menu.name}}">
        <mat-card-content>
            <p>{{menu?.description}}</p>
        </mat-card-content>
        <mat-card-actions>
            <button mat-button>Add to cart</button>
        </mat-card-actions>
        </mat-card>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCardComponent {

    @Input() menu: Menu;

    constructor() { }

}
