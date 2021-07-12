import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UserOrdersService } from "../user-orders.service";
import { UserOrder } from "../user-orders.models";
import { EChartsOption } from "echarts";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../../core/core.state";
import { selectSettingsLanguage } from "../../../core/settings/settings.selectors";
import { Subscription } from "rxjs";

let datePipe = new DatePipe('en-US');
let dateFormat: string = 'MM/dd/yyyy';

@Component({
  selector: 'pedi-ya-user-orders-list',
  templateUrl: './user-orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersListComponent implements OnInit {

  languageChangeSubscription: Subscription;
  userOrdersSubscription: Subscription;
  userOrders: UserOrder[];

  userOrdersChart: EChartsOption;
  totalSpending: number;

  constructor(
    private store: Store<AppState>,
    private ordersService: UserOrdersService,
    private changeDetectorRef: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.userOrdersSubscription = this.ordersService.getCurrentUserOrders().subscribe(userOrders => {
      this.userOrders = userOrders;
      this.draw();
    });
    this.languageChangeSubscription = this.store.select(selectSettingsLanguage).subscribe(() => {
      this.draw();
    })
}

  ngOnDestroy(): void {
    this.userOrdersSubscription.unsubscribe();
  }

  private draw() {
    this.drawSpendingsOverTime();
    this.drawTotalSpending();
    this.changeDetectorRef.detectChanges();
  }

  private drawSpendingsOverTime(): void {
    this.userOrdersChart = {};
    this.changeDetectorRef.detectChanges();
    let xAxisData = [];
    let seriesData = [];
    this.store.select(selectSettingsLanguage).pipe(take(1)).subscribe(language => {
      this.userOrders?.forEach(userOrder => {
        if (language === 'es') dateFormat = 'dd/MM/yyyy';
        if (language === 'en') dateFormat = 'MM/dd/yyyy';
        xAxisData.push(datePipe.transform(userOrder.timestamp, dateFormat));
        seriesData.push(userOrder.cart.total);
      });
      this.translate.get([
        'pedi-ya.user-orders.orders-list.orders-over-time.title',
        'pedi-ya.user-orders.user-orders-list.amount',
        'pedi-ya.user-orders.user-orders-list.date',
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
              data.cart?.items?.forEach(cartItem =>
                template += `
                  <tr>
                    <td>${cartItem.menu.name}</td>
                    <td>${cartItem.amount}</td
                    ><td>${cartItem.subtotal}</td>
                  </tr>
                `
              );
              const formatedTimestamp = datePipe.transform(data.timestamp, dateFormat);
              template += `</tbody><tfoot>Total: $${data?.cart?.total}&nbsp;&nbsp;&nbsp;${translations['pedi-ya.user-orders.user-orders-list.date']}: ${formatedTimestamp}</tfoot></table>`;
              return template;
            }
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            name: translations['pedi-ya.user-orders.user-orders-list.date']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '${value}'
            },
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

  private drawTotalSpending(): void {
    this.totalSpending = this.userOrders?.reduce((acc, curr) => acc + curr?.cart.total, 0);
  }

}