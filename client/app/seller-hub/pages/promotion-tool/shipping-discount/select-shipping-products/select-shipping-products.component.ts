import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Product } from '../../../../../app.models';

@Component({
  selector: 'app-select-shipping-products',
  templateUrl: './select-shipping-products.component.html',
  styleUrls: ['./select-shipping-products.component.scss']
})
export class SelectShippingProductsComponent implements OnInit {
  displayedColumns = ['#', 'id', 'name', 'price'];
  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    public dialogRef: MatDialogRef<SelectShippingProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const products: ProductData[] = [];
    data.forEach(product => {
      products.push(createNewProduct(product));
    });
    this.dataSource = new MatTableDataSource(products);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

export class ProductData {
  id: number;
  name: string;
  price: number;
  select: boolean;
}

/** Builds and returns a new User. */
function createNewProduct(product: Product): ProductData {
  return {
      id: product.id,
      name: product.name,
      price: product.current_price,
      select: false
  };
}
