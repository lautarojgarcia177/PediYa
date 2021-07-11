import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UserOrdersService } from "../user-orders.service";
import { UserOrder } from "../user-orders.models";
import { EChartsOption } from "echarts";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../../core/core.state";
import { selectSettingsLanguage } from "../../../core/settings/settings.selectors";
import { Subscription } from "rxjs";

@Component({
  selector: 'pedi-ya-user-orders-list',
  templateUrl: './user-orders-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersListComponent implements OnInit {

  userOrdersChart: EChartsOption;

  userOrdersSubscription: Subscription;
  userOrders: UserOrder[];

  constructor(
    private store: Store<AppState>,
    private ordersService: UserOrdersService,
    private changeDetectorRef: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.userOrdersSubscription = this.ordersService.getOrders().pipe(tap(console.info)).subscribe(userOrders => {
      this.userOrders = userOrders;
      this.draw();
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.userOrdersSubscription.unsubscribe();
  }

  private draw() {
    let xAxisData = [];
    let seriesData = [];
    this.store.select(selectSettingsLanguage).subscribe(language => {
      const datePipe = new DatePipe('en-US');
      this.userOrders.forEach(userOrder => {
        let dateFormat: string = 'MM/dd/yyyy';
        if (language === 'es') dateFormat = 'dd/MM/yyyy';
        if (language === 'en') dateFormat = 'MM/dd/yyyy';
        xAxisData.push(datePipe.transform(userOrder.timestamp.seconds, dateFormat));
        seriesData.push(userOrder.cart.total);
      });
      this.translate.get([
        'pedi-ya.user-orders.orders-list.orders-over-time.title',
        'pedi-ya.user-orders.user-orders-list.amount'
      ]).subscribe(translations => {
        const userOrders = this.userOrders;
        this.userOrdersChart = {
          title: {
            text: translations['pedi-ya.user-orders.orders-list.orders-over-time.title']
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              const data = userOrders[params.dataIndex];
              let template = `
              <table class="table table-sm text-center">
                <thead>
                  <tr>
                    <th scope="col">Menu</th>
                    <th scope="col">${translations['pedi-ya.user-orders.user-orders-list.amount']}</th>
                    <th scope="col">Subtotal</th>
                  </tr>  
                </thead>
                <tbody>
                  <tr>
              `;
              data.cart.items.forEach(cartItem =>
                template += `
                  <tr>
                    <td>${cartItem.menu.name}</td>
                    <td>${cartItem.amount}</td
                    ><td>${cartItem.subtotal}</td>
                  </tr>
                `
              );
              template += `</tbody><tfoot>Total: $${data.cart.total}</tfoot></table>`;
              return template;
            }
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: seriesData,
              type: 'line',
            },
          ],
        };
      })
    });

  }

}