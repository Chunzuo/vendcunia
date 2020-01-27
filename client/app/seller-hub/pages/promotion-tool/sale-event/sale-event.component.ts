import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent, MatSort , MatTableDataSource, MatSnackBar, MatDatepicker } from '@angular/material';
import { HttpResponse } from '@angular/common/http';

import { SaleEventService } from './sale-event.service';
import { ProductService } from '../../../../shared/services/product/product.service';
import { PromotionService } from '../promotion.service';
import { Product } from '../../../../app.models';
import { dateRangeValidator } from '../../../../theme/utils/app-validators';

@Component({
  selector: 'app-sale-event',
  templateUrl: './sale-event.component.html',
  styleUrls: ['./sale-event.component.scss']
})
export class SaleEventComponent implements OnInit {

  levelArray = [];
  selectClick = 1;
  offerTypeForm: FormGroup;
  selectItemsForm: FormGroup;
  reviewForm: FormGroup;
  sale_desc: string;
  categoryList = [];

  displayedColumns = ['checked', 'Name' , 'Price', 'Shipping', 'Available', 'Sold', 'Views', 'Watchers', 'DaysOnSite'];

  public dataSource: MatTableDataSource<ProductData>;

  allCheck: boolean;
  count: Number;
  selectedCount: Number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  saleDiscountMessage = '';
  findProducts = [];
  selectedProducts = [];

  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  private isSaveLaterClicked: boolean;

  @ViewChild('startPicker') startPicker: MatDatepicker<Date>;
  @ViewChild('endPicker') endPicker: MatDatepicker<Date>;
  eventImagePath: string;
  eventImages = [];

  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private saleEventService: SaleEventService,
    private productService: ProductService,
    private promotionService: PromotionService
  ) {
    this.dataSource = new MatTableDataSource();
    this.count = 0;

    this.saleEventService._array.push({
      sel1: '5',
      sel2: '50'
    });
    this.levelArray = this.saleEventService._array;

    this.isSaveLaterClicked = false;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.allCheck = false;
    this.selectedCount = 0;
    this.sale_desc = '';

    this.offerTypeForm = this.formBuilder.group({
      discount_sale_type: ['', Validators.compose([Validators.required])],
      discount_select_1: ['5'],
      sale_select_1: ['50'],
      discount_select_2: ['5'],
      sale_select_2: ['50'],
      discount_select_3: ['30'],
      sale_select_3: ['50'],
      discount_select_4: ['5'],
      sale_select_4: ['50'],
      discount_select_5: ['5'],
      sale_select_5: ['50'],
      discount_select_6: ['5'],
      sale_select_6: ['50'],
      discount_select_7: ['5'],
      sale_select_7: ['50'],
      discount_select_8: ['5'],
      sale_select_8: ['50'],
      discount_select_9: ['5'],
      sale_select_9: ['50'],
      discount_select_10: ['5'],
      sale_select_10: ['50'],
      discount_select_afcash: ['5'],
      sale_select_afcash: ['50'],
      sale_event_only_select: ['20'],
      discount_value: ['0'],
      type: ['0'],
      event_value: ['0'],
      message: ['']
    });
    this.selectItemsForm = this.formBuilder.group({
      category: ['0'],
      min_price: ['1', Validators.compose([Validators.required])],
      max_price: ['1', Validators.compose([Validators.required])],
      search_keyword: [''],
      item_checked: [false]
    }, { validator: dateRangeValidator('min_price', 'max_price') });
    this.reviewForm = this.formBuilder.group({
      event_name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])]
    });

    this.productService.getCategoryList(0).subscribe(response => {
      this.categoryList = response;
    });

    this.promotionService.getSaleEventImages().subscribe((response) => {
      if (response['length'] > 0) {
        this.eventImagePath = response[0].path;
        const thisObj = this;
        for (let i = 0; i < response['length']; i++) {
          thisObj.eventImages.push(response[i].path);
        }
      }
    });
  }

  removeEach(id) {
    const products: ProductData[] = [];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].id !== id) {
        products.push(this.dataSource.data[i]);
      }
    }
    this.selectedCount = products.length;
    this.dataSource = new MatTableDataSource(products);
  }

  deleteAllFunc() {
    this.selectedCount = 0;
    this.selectedProducts = [];
    this.findProducts.map(product => {
      product.checked = false;
    });
    this.dataSource = new MatTableDataSource(this.selectedProducts);
  }

  confirmClick() {
    this.selectClick = 2;
    this.dataSource = new MatTableDataSource(this.selectedProducts);
  }

  clickEachCheck(val) {
    if (val.toString() === 'false') {
      this.selectedCount = this.plus(this.selectedCount);
    } else {
      this.selectedCount = this.minus(this.selectedCount);
    }
  }

  plus(a) {
    return ++a;
  }

  minus(a) {
    return --a;
  }

  clickAllCheckBox() {
    if (!this.allCheck) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].checked = true;
      }
      this.selectedCount = this.dataSource.data.length;
    } else {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].checked = false;
      }
      this.selectedCount = 0;
    }
  }

  addDiscount() {
    if (this.levelArray.length >= 9) {
      this.snackBar.open('You can add up to 10 levels of discounts in a single sale event.', '×',
            { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    this.levelArray.push({
      sel1: '5',
      sel2: '50'
    });
  }

  selectItems() {
    this.selectClick = 0;
  }

  prevClick() {
    this.selectClick = 1;
  }

  saveReview () {
    this.selectClick = 3;
  }

  removeLevel(index) {
    this.levelArray.splice(index, 1);
  }

  onSearchClick(): void {
    this.searchProducts();
  }

  searchProducts(): void {
    this.promotionService.getSaleEventSearchProducts(
      this.selectItemsForm.controls.category.value,
      this.selectItemsForm.controls.min_price.value,
      this.selectItemsForm.controls.max_price.value,
      this.selectItemsForm.controls.search_keyword.value,
      this.pageIndex,
      this.pageSize
    ).subscribe(response => {
      if (response['success'] === 1) {
        const products = response['products'];
        const data: ProductData[] = [];
        const thisObj = this;
        products.forEach(product => {
          const checked = false;
          /*for (let i = 0; i < thisObj.selectedProducts.length; i++) {
            if (product.id === thisObj.selectedProducts[i]['id']) {
              checked = true;
              break;
            }
          }*/
          data.push(createNewProduct(product, checked));
        });
        this.dataSource = new MatTableDataSource(data);
        this.count = response['count'];
        this.findProducts = data;
      } else if (response['success'] === 0) {
        this.snackBar.open('Invalid parameters!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else if (response['success'] === -1) {
        this.snackBar.open('Database query error!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

  onCheckBoxClick(): void {
    const thisObj = this;
    setTimeout(() => {
      this.findProducts.forEach(product => {
        let index = -1;
        for (let i = 0; i < thisObj.selectedProducts.length; i++) {
          if (product.id === thisObj.selectedProducts[i]['id']) {
            index = i;
            break;
          }
        }

        if (product.checked === true) {
          if (index === -1) {
            thisObj.selectedProducts.push(product);
          }
        } else {
          if (index !== -1) {
            thisObj.selectedProducts.splice(index, 1);
          }
        }
      });
      this.selectedCount = this.selectedProducts.length;
    }, 100);
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    this.promotionService.pushFileToStorage(file, 'sale_event_upload').subscribe(response => {
      if (response instanceof HttpResponse) {
        this.eventImages.push(response['body'].toString());
        this.snackBar.open('File is completely uploaded!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

  onOfferTypeFormSubmit(values: Object): void {
    let type, discount_value = 0, event_value = 0, msg = '';
    if (this.offerTypeForm.controls.discount_sale_type.value.indexOf('discount_sale_percent_') > -1) {
      type = parseInt(this.offerTypeForm.controls.discount_sale_type.value.replace('discount_sale_percent_', ''), 10);
      discount_value = this.offerTypeForm.controls['discount_select_' + type].value;
      event_value = this.offerTypeForm.controls['sale_select_' + type].value;
      msg = 'Take ' + discount_value + '% off each item ' + event_value;
    } else if (this.offerTypeForm.controls.discount_sale_type.value === 'discount_sale_afcash') {
      type = 11;
      discount_value = this.offerTypeForm.controls.discount_select_afcash.value;
      event_value = this.offerTypeForm.controls.sale_select_afcash.value;
      msg = 'Take AFCASH off each item ' + discount_value + ' ' + event_value;
    } else if (this.offerTypeForm.controls.discount_sale_type.value === 'free_shipping_discount') {
      type = 12;
      msg = 'Offer free shipping for all discounted items';
    } else if (this.offerTypeForm.controls.discount_sale_type.value === 'sale_event_only') {
      type = 13;
      event_value = this.offerTypeForm.controls.sale_event_only_select.value;
      msg = 'Save up to %' + event_value;
    }

    this.saleDiscountMessage = msg;

    this.offerTypeForm.controls.discount_value.setValue(discount_value);
    this.offerTypeForm.controls.type.setValue(type);
    this.offerTypeForm.controls.event_value.setValue(event_value);
    this.offerTypeForm.controls.message.setValue(msg);
  }

  onSelectItemsFormSubmit(values: Object): void {
  }

  save_later(): void {
    this.isSaveLaterClicked = true;
  }

  onReviewFormSubmit(values: Object): void {
    if (this.isSaveLaterClicked) {
      this.isSaveLaterClicked = false;
      return;
    }

    const saleEventObject = {
      event_name: this.reviewForm.controls.event_name.value,
      description: this.reviewForm.controls.description.value,
      discount_value: this.offerTypeForm.controls.discount_value.value,
      event_value: this.offerTypeForm.controls.event_value.value,
      type: this.offerTypeForm.controls.type.value,
      message: this.offerTypeForm.controls.message.value,
      products: [],
      start_date: this.startPicker._selected,
      end_date: this.endPicker._selected,
      image_path: this.eventImagePath
    };

    this.selectedProducts.forEach(product => {
      saleEventObject.products.push(product.id);
    });
    this.promotionService.addSaleEvent(saleEventObject).subscribe(response => {
      if (parseInt(response['status'], 10) === 1) {
        this.snackBar.open('Succeed to launch sale event', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else if (parseInt(response['status'], 10) === 0) {
        this.snackBar.open('Invalid parameters!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      } else if (parseInt(response['status'], 10) === -1) {
        this.snackBar.open('Database query error!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

  pageChanged(event: Object): void {
    this.pageIndex = event['pageIndex'];
    this.pageSize = event['pageSize'];

    this.searchProducts();
  }

}

const COLORS = [
  'maroon',
  'red',
];
const NAMES = [
  'Maia',
  'Asher',
];

export interface ProductData {
  id: number;
  name: string;
  Price: string;
  Available: number;
  Shipping: string;
  Sold: string;
  checked: boolean;
  Views: string;
  Watchers: string;
  DaysOnSite: string;
  imagePath: string;
}

/** Builds and returns a new User. */
function createNewProduct(product: Product, checked): ProductData {
  return {
    id: product.id,
    name: product.name,
    Price: product.current_price + ' AFCASH',
    Available: product.quantity,
    Shipping: 'Free',
    Sold: '7',
    checked: checked,
    Views: '47',
    Watchers: '5',
    DaysOnSite: '640',
    imagePath: product.thumnail_image
  };
}
