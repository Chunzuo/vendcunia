import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { SellerHubService } from '../../../../shared/services/seller-hub.service';
import { Product } from '../../../../app.models';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-listings-drafts',
  templateUrl: './listings-drafts.component.html',
  styleUrls: ['./listings-drafts.component.scss']
})
export class ListingsDraftsComponent implements OnInit {
  displayedColumns = ['no', 'name', 'image', 'price', 'rating', 'quantity', 'created_on'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productList: Array<Product> = [];

  constructor(
    private authService: AuthServiceApp,
    private sellerHubService: SellerHubService
  ) { }

  ngOnInit() {
    this.getPrivateProductList();
  }

  getPrivateProductList() {
    this.productList = [];

    const userId = parseInt(this.authService.getUserId(), 10);
    this.sellerHubService.getPrivateProductList(userId).subscribe(response => {
      this.productList = response;
      for (let i = 0; i < this.productList.length; i++) {
        this.productList[i]['rowIdx'] = i + 1;
      }
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
    });
  }
}
