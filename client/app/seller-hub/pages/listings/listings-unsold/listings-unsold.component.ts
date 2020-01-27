import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { SellerHubService } from '../../../../shared/services/seller-hub.service';
import { Product } from '../../../../app.models';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-listings-unsold',
  templateUrl: './listings-unsold.component.html',
  styleUrls: ['./listings-unsold.component.scss']
})
export class ListingsUnsoldComponent implements OnInit {

  isCollapsed = false;
  productList: Array<Product> = [];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['no', 'name', 'image', 'price', 'rating', 'quantity', 'created_on'];
  constructor(
    private authService: AuthServiceApp,
    private sellerHubService: SellerHubService
  ) { }

  ngOnInit() {
    this.getUnSoldProductList();
  }

  getUnSoldProductList() {
    this.productList = [];

    const userId = parseInt(this.authService.getUserId(), 10);
    this.sellerHubService.getUnsoldProductList(userId).subscribe(response => {
      this.productList = response;
      for (let i = 0; i < this.productList.length; i++) {
        this.productList[i]['rowIdx'] = i + 1;
      }
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
    });
  }

}
