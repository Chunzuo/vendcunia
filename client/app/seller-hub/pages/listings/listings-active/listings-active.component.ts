import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { SellerHubService } from '../../../../shared/services/seller-hub.service';
import { Product } from '../../../../app.models';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-listings-active',
  templateUrl: './listings-active.component.html',
  styleUrls: ['./listings-active.component.scss']
})
export class ListingsActiveComponent implements OnInit {
  displayedColumns = ['no', 'name', 'image', 'price', 'rating', 'quantity', 'created_on'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currency: string;
  productList: Array<Product> = [];
  
  constructor(
    private authService: AuthServiceApp,
    private sellerHubService: SellerHubService,
    private currencyService: CurrencyService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCurrency();
    this.getActiveProductList();
  }

  private getCurrency() {
    this.currencyService.getCurrency(1).subscribe((response) => {
      if (response['status'] === -1) {
        this.snackBar.open('error occured while fetching.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });        
      }
      if (response['status'] === 1) {
        this.currency = response['data'].name;
      }
    });
  }

  private getActiveProductList() {
    const userId = parseInt(this.authService.getUserId(), 10);
    this.productList = [];
    this.sellerHubService.getActiveProductList(userId).subscribe(response => {
      this.productList = response;
      for (let i = 0; i < this.productList.length; i++) {
        this.productList[i]['rowIdx'] = i + 1;
      }
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
    });
  }
}
