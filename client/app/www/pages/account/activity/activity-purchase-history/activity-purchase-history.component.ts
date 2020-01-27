import { Component, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';
import { SellerHubService } from '../../../../../shared/services/seller-hub.service';
import { ProductService } from '../../../../../shared/services/product/product.service';

import { Order } from '../../../../../app.models';

import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'app-activity-purchase-history',
  templateUrl: './activity-purchase-history.component.html',
  styleUrls: ['./activity-purchase-history.component.scss']
})
export class ActivityPurchaseHistoryComponent implements OnInit {

  constructor(private authService: AuthServiceApp,
              private sellerHubService: SellerHubService,
              private productService: ProductService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  upaid_flag: boolean;
  order_flag: boolean;
  cancel_flag: boolean;
  user_role: string;
  dataSource: MatTableDataSource<Order>;
  orderList: Array<Order> = [];
  canceled_orderList: Array<Order> = [];
  displayedColumns = ['No', 'ordererEmail', 'productName', 'productPrice',
                      'orderingPrice', 'quantity', 'orderedAt', 'productId', 'feedback'];
  canceled_displayedColumns = ['No', 'ordererEmail', 'productName', 'productPrice', 'orderingPrice', 'quantity', 'orderedAt'];
  canceled_dataSource: MatTableDataSource<Order>;
  feedback: string;

  ngOnInit() {
    this.cancel_flag = true;
    this.upaid_flag = true;
    this.user_role = this.authService.getUserRole();
    this.order_flag = true;
    this.getOrderList();
    this.feedback = '';
  }

  onCancel(orderId: number) {
    const userId = parseInt(this.authService.getUserId(), 10);
    this.sellerHubService.updateOrderStatus(orderId, 2).subscribe(response => {
      if (response['status'] === 1) {
        for (let i = 0; i < this.orderList.length; i++) {
          if (this.orderList[i].id === orderId) {
            this.canceled_orderList.push(this.orderList[i]);
            this.orderList.splice(i, 1);
            break;
          }
        }
        this.canceled_dataSource = new MatTableDataSource(this.canceled_orderList);
        this.dataSource = new MatTableDataSource(this.orderList);
      }
    });
  }

  getOrderList() {
    this.orderList = [];
    this.canceled_orderList = [];
    const userId = parseInt(this.authService.getUserId(), 10);

    // 1 => created, 2 => cancelled, 3 => awaiting payment, 4 => paid,
    // 5 => awaiting shipment, 6 => shipping in progress, 7 => shipped, 8 => shipped and paid, 9 => completed
    this.productService.getOrderList(2, userId).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        this.orderList.push(response[i]);
      }
      this.dataSource = new MatTableDataSource(this.orderList);
    });

    this.productService.getOrderList(4, userId).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        this.canceled_orderList.push(response[i]);
      }
      this.canceled_dataSource = new MatTableDataSource(this.canceled_orderList);
    });
  }

  onProvideFeedback(orderId, sellerId) {
    const userId = parseInt(this.authService.getUserId(), 10);
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '615px',
      height: '382px'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sellerHubService.remainOrderFeedback(orderId, userId, 2, result.content, result.rating).subscribe(response => {
            if (response['success'] === 1) {
              this.snackBar.open('You have just provided feedback!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
              this.getOrderList();
            }
          });
        }
    });
  }

  showOders(p) {
    if (p === '1') {
      this.order_flag = true;
    } else {
      this.order_flag = false;
    }
  }

  showCanceled(p) {
    if (p === '1') {
      this.cancel_flag = true;
    } else {
      this.cancel_flag = false;
    }
  }

  showUnpaidItems(p) {
    if (p === '1') {
      this.upaid_flag = true;
    } else {
      this.upaid_flag = false;
    }
  }

}
