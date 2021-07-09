import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Subscription } from "rxjs";
import { map, mergeMap, pluck, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
import { AppState } from "../../../core/core.state";
import { concatLatestFrom } from "@ngrx/effects";
import { UserOrdersService } from "../user-orders.service";
import { UserOrder } from "../user-orders.models";
import { EChartsOption } from "echarts";


@Component({
    selector: 'pedi-ya-user-orders-list',
    templateUrl: './user-orders-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersListComponent implements OnInit {

    chartOption: EChartsOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
          },
        ],
      };

    userOrders$ = this.ordersService.orders$;

    constructor(
        // private store: Store<AppState>,
        private ordersService: UserOrdersService,
        private changeDetectorRef: ChangeDetectorRef
        ) {
    }

    ngOnInit(): void {
        // this.userOrders$.pipe(tap(console.warn)).subscribe(userOrders => {
        //     this.changeDetectorRef.detectChanges();
        // });
    }

}
