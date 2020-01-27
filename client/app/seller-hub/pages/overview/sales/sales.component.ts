import { Component, OnInit } from '@angular/core';
import { SellerHubService } from '../../../../shared/services/seller-hub.service';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '' }
  ];

  todaySaleMoney: number;
  weekSaleMoney: number;
  monthSaleMoney: number;
  threeMonthSaleMoney: number;

  selYear: FormControl;
  yearOptionList: any[];

  constructor(
    private sellerHubService: SellerHubService,
    private authService: AuthServiceApp
  ) { }

  ngOnInit() {
    this.todaySaleMoney = 0;
    this.weekSaleMoney = 0;
    this.monthSaleMoney = 0;
    this.threeMonthSaleMoney = 0;

    const date = new Date();
    const year = date.getFullYear();
    this.yearOptionList = [];
    for (let i = year; i >= 2018; i--) {
      this.yearOptionList.push(year);
    }

    this.selYear = new FormControl(this.yearOptionList[0]);

    this.getSaleGraphInfo();
    //this.getSaleStatisticsInfo();
  }

  getSaleStatisticsInfo() {
    const userId = parseInt(this.authService.getUserId(), 10);
    this.sellerHubService.getSalesStatisticsInfo(userId).subscribe(response => {
      if (response['success'] === 1) {
        this.todaySaleMoney = response['today'];
        this.weekSaleMoney = response['week'];
        this.monthSaleMoney = response['month'];
        this.threeMonthSaleMoney = response['threeMonth'];
      } else {
        this.todaySaleMoney = 0;
        this.weekSaleMoney = 0;
        this.monthSaleMoney = 0;
        this.threeMonthSaleMoney = 0;
      }
    });
  }

  getSaleGraphInfo() {
    const userId = parseInt(this.authService.getUserId(), 10);
    const year = this.selYear.value;

    this.sellerHubService.getSalesGraphInfo(userId, year).subscribe(response => {
      this.barChartData = [{ data: response }];
    });
  }

  yearChange() {
    this.getSaleGraphInfo();
  }
}
