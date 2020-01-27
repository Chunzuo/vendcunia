import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { style } from '@angular/animations';
import { Order } from '../../../../app.models';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { SellerHubService } from '../../../../shared/services/seller-hub.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FeedbackDialogComponent } from '../../../../www/pages/account/activity/feedback-dialog/feedback-dialog.component';
@Component({
  selector: 'app-orders-archived',
  templateUrl: './orders-archived.component.html',
  styleUrls: ['./orders-archived.component.scss']
})
export class OrdersArchivedComponent implements OnInit {
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
    private sellerHubService: SellerHubService,
    private snackBar: MatSnackBar, public dialog: MatDialog) { }

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

    this.sellerHubService.getOrderList(3, userId).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        response[i].rowIdx = i + 1;
        switch (response[i].status) {
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

  feedback(orderId) {
    const userId = parseInt(this.authService.getUserId(), 10);
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '615px',
      height: '382px'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result.rating !== 0 || result.content !== '') {
          this.sellerHubService.remainOrderFeedback(orderId, userId, 1, result.content, result.rating).subscribe(response => {
            if (response['success'] === 1) {
              this.snackBar.open('You have just provided feedback!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
              this.getOrderList();
            }
          });
        }
    });
  }
}
