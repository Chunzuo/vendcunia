import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../../app.models';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { SellerHubService } from '../../../../shared/services/seller-hub.service';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-orders-awaiting-shipment',
  templateUrl: './orders-awaiting-shipment.component.html',
  styleUrls: ['./orders-awaiting-shipment.component.scss']
})
export class OrdersAwaitingShipmentComponent implements OnInit {

  orderList: Array<Order> = [];
  displayedColumns = ['No', 'ordererEmail', 'productName', 'productPrice', 'orderingPrice', 'quantity', 'statusText', 'orderedAt', 'func'];
  searchTypeOptionList: string[] = [
    'Buyer email',
    'Buyer username',
    'Buyer name',
    'Sales record number',
    'Item title',
    'Item ID'
  ];
  monthList: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  periodOptionList: string[];

  searchType: FormControl;
  period: FormControl;
  searchKeyword: FormControl;
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthServiceApp,
    private sellerHubService: SellerHubService) { }

  ngOnInit() {

    const date = new Date();
    const month = date.getMonth();

    this.periodOptionList = [];
    for (let i = month; i > month - 4; i--) {
      if (i === month) {
        this.periodOptionList.push('Current month(' + this.monthList[i] + ')');
      } else {
        this.periodOptionList.push(this.monthList[i]);
      }
    }

    this.searchType = new FormControl(this.searchTypeOptionList[0]);
    this.period = new FormControl(this.periodOptionList[0]);
    this.searchKeyword = new FormControl();

    this.getOrderList();
  }

  getOrderList() {
    const userId = parseInt(this.authService.getUserId(), 10);
    const type = this.searchType.value;
    const period = this.period.value;
    const keyword = this.searchKeyword.value;

    this.sellerHubService.getOrderList(2, userId).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        response[i].rowIdx = i + 1;
        response[i].statusText = 'awaiting shipment';
      }

      this.orderList = response;
      this.dataSource = new MatTableDataSource(this.orderList);
      this.dataSource.paginator = this.paginator;
    });
  }

  search() {
    this.getOrderList();
  }

  clearSearch() {
    this.searchType.setValue('');
    this.period.setValue('');
    this.searchKeyword.setValue('');
  }

  shipNowClick(orderId: number) {
    this.sellerHubService.updateOrderStatus(orderId, 6).subscribe(response => {
      if (response['success'] === 1) {
        this.getOrderList();
      }
    });
  }

  shippedClick(orderId: number) {
    this.sellerHubService.updateOrderStatus(orderId, 7).subscribe(response => {
      if (response['success'] === 1) {
        this.getOrderList();
      }
    });
  }

}
