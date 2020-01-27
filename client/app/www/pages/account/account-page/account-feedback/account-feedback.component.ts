import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Order } from '../../../../../app.models';
import { SellerHubService } from '../../../../../shared/services/seller-hub.service';

@Component({
  selector: 'app-account-feedback',
  templateUrl: './account-feedback.component.html',
  styleUrls: ['./account-feedback.component.scss']
})
export class AccountFeedbackComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private authService: AuthServiceApp,
    private sellerHubService: SellerHubService
  ) {}

  private feedBackInfo: any;
  dataSource1: MatTableDataSource<FeedbackData>;
  dataSource2: MatTableDataSource<FeedbackData>;
  dataSource: MatTableDataSource<FeedbackData>;
  dataSource3: MatTableDataSource<FeedbackData>;
  displayedColumns = ['No', 'From', 'Feedback', 'Rating', 'Product_name'];
  displayedColumns_1 = [
    'No',
    'From',
    'Feedback',
    'Rating',
    'Product_name',
    'FeedbackType'
  ];
  feedback_list1: Array<FeedbackData> = [];
  feedback_list2: Array<FeedbackData> = [];
  feedback_list3: Array<FeedbackData> = [];
  feedback_list: Array<FeedbackData> = [];

  ngOnInit() {
    this.dataSource1 = new MatTableDataSource();
    const logId = this.authService.getUserId();
    // this.productService.getProductFeedback(logId).subscribe(response => {
    //   if (response['status'] === 1) {
    //     this.feedBackInfo = response['data'][0];
    //   }
    // });

    this.feedback_list1 = [];
    this.getFeedback();
  }
  getFeedback() {
    const userId = parseInt(this.authService.getUserId(), 10);
    this.feedback_list1 = [];
    this.sellerHubService.getFeedback(userId, 1).subscribe(response => {
      if (response['success'] === 1) {
        for (let i = 0; i < response['data'].length; i++) {
          if (response['data'][i].FeedbackType === 2) {
            this.feedback_list1.push({
              From: {
                first_name: response['data'][i].first_name,
                last_name: response['data'][i].last_name,
                email: response['data'][i].email
              },
              Feedback: response['data'][i].content,
              Rating: response['data'][i].rating,
              Product_name: response['data'][i].name,
              FeedbackType: response['data'][i].FeedbackType
            });
          } else if (response['data'][i].FeedbackType === 1) {
            this.feedback_list2.push({
              From: {
                first_name: response['data'][i].first_name,
                last_name: response['data'][i].last_name,
                email: response['data'][i].email
              },
              Feedback: response['data'][i].content,
              Rating: response['data'][i].rating,
              Product_name: response['data'][i].name,
              FeedbackType: response['data'][i].FeedbackType
            });
          } else {
            this.feedback_list3.push({
              From: {
                first_name: response['data'][i].first_name,
                last_name: response['data'][i].last_name,
                email: response['data'][i].email
              },
              Feedback: response['data'][i].content,
              Rating: response['data'][i].rating,
              Product_name: response['data'][i].name,
              FeedbackType: response['data'][i].FeedbackType
            });
          }
          this.feedback_list.push({
            From: {
              first_name: response['data'][i].first_name,
              last_name: response['data'][i].last_name,
              email: response['data'][i].email
            },
            Feedback: response['data'][i].content,
            Rating: response['data'][i].rating,
            Product_name: response['data'][i].name,
            FeedbackType: response['data'][i].FeedbackType
          });
        }
        this.dataSource1 = new MatTableDataSource(this.feedback_list1);
        this.dataSource2 = new MatTableDataSource(this.feedback_list2);
        this.dataSource3 = new MatTableDataSource(this.feedback_list3);
        this.dataSource = new MatTableDataSource(this.feedback_list);
      }
    });
  }
}
export class FeedbackData {
  public From: any;
  public Feedback: any;
  public Rating: any;
  public Product_name: string;
  public FeedbackType: number;
}
