import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-account-recently-reviewd',
  templateUrl: './account-recently-reviewd.component.html',
  styleUrls: ['./account-recently-reviewd.component.scss']
})
export class AccountRecentlyReviewdComponent implements OnInit {

  recentlyProductList: ProductData[];
  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService,
    private authService: AuthServiceApp
  ) {
  }

  ngOnInit() {
    const products: ProductData[] = [];
    // for (let i = 1; i <= 9; i++) {
    //     products.push(importProduct(i));
    // }
    this.productService.getRecentlyViewedProduct(this.authService.getUserId()).subscribe(response => {
      console.log(response);
      for (let i = 0; i < response['data'].length; i++) {
        products.push(response['data'][i]);
      }
      this.recentlyProductList = products;
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  clearAll() {
    this.recentlyProductList = [];
    this.dataSource = new MatTableDataSource();
  }
}
export interface ProductData {
  product_id: string;
  product_image_path: string;
  contact: string;
  name: string;
  additional_info: string;
  condition_desc: string;
  condition_id: string;
  created_by: string;
  created_on: string;
  current_price: string;
  description: string;
  discount_price: string;
  duration: string;
  id: string;
  orig_quantity: string;
  quantity: string;
  ratings_count: string;
  ratings_value: string;
  reserve_price: string;
  sales_tax: string;
  selling_format: string;
  short_description: string;
  starting_price: string;
  sub_title: string;
  title: string;
  image_path: string;
  product_sub_title: string;
  product_title: string;
  user_id: string;
  visit_time: string;
  product_name: string;
}
// function importProduct(id: number , data): ProductData {

//   return {
//       imgSrc: 'assets/images/$_57.JPG',
//       contact: 'Apple iPhone 6s 16GB 32GB 64GB 128GB Unlocked SIM Free...'
//   };
// }
