import { Component, OnInit } from '@angular/core';
import { SellerHubService } from '../../../shared/services/seller-hub.service';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  salesCount: number;
  ordersCount: number;
  shippingCount: number;
  profit: number;

  constructor(private sellerHubService: SellerHubService,
    private authService: AuthServiceApp) { }

  ngOnInit() {
    this.salesCount = 0; this.ordersCount = 0; this.shippingCount = 0; this.profit = 0;
    this.getOverviewInfo();
  }
  
  getOverviewInfo() {
    const userId = this.authService.getUserId();
    this.sellerHubService.getOverViewInfo(parseInt(userId, 10)).subscribe(response => {
      if (response['success'] === 1) {
        this.ordersCount = response['ordersCount'];
        this.salesCount = response['salesCount'];
        this.shippingCount = response['shippingCount'];
        this.profit = response['profit'];
      } else {
        this.salesCount = 0; this.ordersCount = 0; this.shippingCount = 0; this.profit = 0;
      }
    });
  }

}
