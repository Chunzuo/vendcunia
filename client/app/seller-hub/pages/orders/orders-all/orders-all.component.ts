import { Component, OnInit, ViewChild } from '@angular/core';
import { Order, Bid } from '../../../../app.models';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { SellerHubService } from '../../../../shared/services/seller-hub.service';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-orders-all',
  templateUrl: './orders-all.component.html',
  styleUrls: ['./orders-all.component.scss']
})
export class OrdersAllComponent implements OnInit {

  orderList: Array<Order> = [];
  bidList: Array<Bid> = [];

  displayedColumns = ['No', 'ordererEmail', 'productName', 'productPrice', 'orderingPrice', 'quantity', 'statusText', 'orderedAt'];
  bidDisplayedColumns = ['No', 'productName', 'buyerEmail', 'bidAmount', 'bidTime'];
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
  bidsDataSource: MatTableDataSource<Bid>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  showBids: boolean;

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

    this.showBids = false;
  }

  getOrderList() {
    const userId = parseInt(this.authService.getUserId(), 10);
    const type = this.searchType.value;
    const period = this.period.value;
    const keyword = this.searchKeyword.value;

    this.sellerHubService.getOrderList(0, userId).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        response[i].rowIdx = i + 1;
        switch (response[i].status) {
          case 1:
          response[i].statusText = 'created';
          break;
          case 2:
          response[i].statusText = 'cancelled';
          break;
          case 3:
          response[i].statusText = 'awaiting payment';
          break;
          case 4:
          response[i].statusText = 'paid';
          break;
          case 5:
          response[i].statusText = 'awaiting shipment';
          break;
          case 6:
          response[i].statusText = 'shipping in progress';
          break;
          case 7:
            if (response[i].sellerFeedbackId === 0) {
              response[i].statusText = 'waiting feedback from seller';
            } else if (response[i].buyerFeedbackId === 0) {
              response[i].statusText = 'waiting feedback from buyer';
            } else {
              response[i].statusText = 'shipped and paid';
            }
          break;
          case 8:
          response[i].statusText = 'completed';
          break;
        }
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

  onClickBids() {
    this.showBids = true;
    this.sellerHubService.getBidList(this.authService.getUserId()).subscribe(response => {
      this.bidList = response;
      this.bidsDataSource = new MatTableDataSource(this.bidList);
    });
  }
}
