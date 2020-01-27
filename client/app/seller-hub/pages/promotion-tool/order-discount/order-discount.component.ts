import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper, MatDatepicker, MatSnackBar } from '@angular/material';
import { MatPaginator, MatSort , MatTableDataSource } from '@angular/material';
import { ProductService } from '../../../../shared/services/product/product.service';
import { PromotionService } from '../promotion.service';
import { HttpResponse } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-discount',
  templateUrl: './order-discount.component.html',
  styleUrls: ['./order-discount.component.scss']
})
export class OrderDiscountComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('startPicker') startPicker: MatDatepicker<Date>;
  @ViewChild('endPicker') endPicker: MatDatepicker<Date>;

  displayedColumns = ['checked', 'Item' , 'Price', 'Shipping', 'Available', 'Sold', 'Views', 'Watchers', 'DaysOnSite', 'EndDate'];
  public pItems: MatTableDataSource<ProductData>;
  public dataSource: MatTableDataSource<ProductData>;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  offerTypeForm: FormGroup;
  selectItemsForm: FormGroup;
  reviewForm: FormGroup;
  selectClick = 1;
  allCheck: boolean;
  count: Number;
  selectedCount: any;
  description: string;
  saleEventName: string;
  eventStartDate: string;
  eventEndDate: string;
  /**
   * Created by Michael
   */
  public categoryList = [];
  public offerTypeList: Object[] = [
    {id: 1, name: 'Introduce new items'},
    {id: 2, name: 'Attract buyers at peak shopping times'},
    {id: 3, name: 'Move older items'}
  ];
  public selCategoryName: string;
  public findProducts = [];
  discountType = '1';
  searchKeyword = '';
  selectedProducts = [];

  private discountTypes = [
    'Extra AFCASH _discountValue off AFCASH _eventValue +',
    'Extra _discountValue % off AFCASH _eventValue +',
    'Save AFCASH _discountValue for everyday AFCASH _eventValue',
    'Extra AFCASH _discountValue off _eventValue + items',
    'Extra _discountValue % off _eventValue + items',
    'Save AFCASH _discountValue for everyday AFCASH _eventValue items',
    'Buy _buyNumber , get _getNumber free',
    'Buy _buyNumber , get _getNumber at _discountValue %off',
    'Buy _buyNumber , get _getNumber free(one per transaction)',
    'Buy _buyNumber , get _getNumber at _discountValue %off(one per transaction)',
    'Extra AFCASH _discountValue off',
    'Extra _discountValue %off',
    'Extra AFCASH _discountValue off each item'
  ];
  private typeStr: string;
  eventImagePath: string;
  eventImages = [];

  constructor(
    public formBuilder: FormBuilder,
    private productService: ProductService,
    private promotionService: PromotionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.allCheck = false;
    this.selectedCount = 0;
    this.description = '';
    this.saleEventName = '';
    this.offerTypeForm = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      discountType: '1',
      discountValue: '5',
      eventValue: '50',
      buyNumber: '1',
      getNumber: '1'
    });
    this.selectItemsForm = this.formBuilder.group({
      // searchKeyword: ''
    });
    this.reviewForm = this.formBuilder.group({
    });
    /**
     * Created by Michael
     */
    this.productService.getCategoryList(0).subscribe(response => {
      this.categoryList = response;
    });
    this.typeStr = this.discountTypes[0];
    this.formatTypeStr();
    this.startPicker._select(new Date());
    setTimeout(() => {
      this.startPicker._datepickerInput.value = new Date();
    }, 100);

    this.promotionService.getOrderDiscountImages().subscribe((response) => {
      if (parseInt(response.status, 10) === 1) {
        const images = response.images;
        if (images.length > 0) {
          this.eventImagePath = images[0].path;
        }
        const thisObj = this;
        for (let i = 0; i < images.length; i++) {
          thisObj.eventImages.push(images[i].path);
        }
      } else {
        this.snackBar.open('Failed to get order discount images!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
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
  selectItems() {
    this.selectClick = 0;
    /**
     * Added by Michael
     */
    this.productService.getProductsByCategory(this.offerTypeForm.controls.category.value).subscribe(response => {
      this.findProducts = response;
      this.count = this.findProducts.length;
      this.findProducts.map((value, index) => {
        value['selected'] = false;
      });
    });
    this.selCategoryName = this.categoryList[this.offerTypeForm.controls.category.value - 1]['name'];
  }
  prevClick() {
    this.selectClick = 1;
  }
  deleteAllFunc() {
    this.selectedCount = 0;
    this.selectedProducts = [];
    this.findProducts.map(product => {
      product['selected'] = false;
    });
  }
  confrimClick() {
    this.selectClick = 2;
    this.selectedProducts = [];
    this.findProducts.forEach((product, idx) => {
      if (product['selected'] === true) {
        this.selectedProducts.push(product);
      }
    });
  }
  saveReview () {
    this.selectClick = 3;
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
      for (let i = 0; i < this.pItems.data.length; i++) {
        this.pItems.data[i].checked = true;
      }
      this.selectedCount = this.pItems.data.length;
    } else {
      for (let i = 0; i < this.pItems.data.length; i++) {
        this.pItems.data[i].checked = false;
      }
      this.selectedCount = 0;
    }
  }
  /**
   * Created by Michael
   */
  onClickCheckBox(index): void {
    const thisObj = this;
    setTimeout(function () {
      thisObj.selectedCount = 0;
      thisObj.findProducts.map((product, idx) => {
        if (product['selected'] === true) {
          thisObj.selectedCount++;
        }
      });
    }, 100);
  }

  onClickCheckAll(): void {
    this.allCheck = !this.allCheck;
    this.findProducts.map((product) => {
      product.selected = this.allCheck;
    });
  }

  onClickLaunch(): void {
    const selProdIds = [];
    this.selectedProducts.forEach(product => {
      selProdIds.push(product.id);
    });
    const obj = {
      discount_type: this.offerTypeForm.controls.discountType.value,
      discount_value: this.offerTypeForm.controls.discountValue.value,
      event_value: this.offerTypeForm.controls.eventValue.value,
      buy_number: this.offerTypeForm.controls.buyNumber.value,
      get_number: this.offerTypeForm.controls.getNumber.value,
      products: selProdIds,
      name: this.saleEventName,
      start_date: this.startPicker._selected,
      end_date: this.endPicker._selected,
      description: this.description,
      image: this.eventImagePath,
      message: this.typeStr
    };

    this.promotionService.launchOrderDiscount(obj).subscribe(response => {
      this.snackBar.open('Success in launch order discount!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.router.navigate(['/sellerhub/marketing/manage_promotion']);
    });
  }

  /**
   * Add by Michael
   */
  onClickSearch() {
    const thisObj = this;
    this.promotionService.getSearchedProducts(this.searchKeyword, this.offerTypeForm.controls.category.value)
      .subscribe(response => {
        thisObj.findProducts = response;
      });
  }

  onClickAddMore() {
    this.selectClick = 0;
  }

  onClickSelectItems() {
    this.selectClick = 0;
  }

  onChangeType() {
    const type = parseInt(this.offerTypeForm.controls.discountType.value, 10);
    this.typeStr = this.discountTypes[type - 1];
    this.formatTypeStr();
  }

  formatTypeStr() {
    const discountValue = this.offerTypeForm.controls.discountValue.value;
    const eventValue = this.offerTypeForm.controls.eventValue.value;
    const buyNumber = this.offerTypeForm.controls.buyNumber.value;
    const getNumber = this.offerTypeForm.controls.getNumber.value;

    this.typeStr = this.typeStr.replace('_discountValue', discountValue);
    this.typeStr = this.typeStr.replace('_eventValue', eventValue);
    this.typeStr = this.typeStr.replace('_buyNumber', buyNumber);
    this.typeStr = this.typeStr.replace('_getNumber', getNumber);
  }

  onClickEditTypes() {
    this.horizontalStepper._steps.first.select();
    this.selectClick = 1;
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    this.promotionService.pushFileToStorage(file, 'order_discount_upload').subscribe(response => {
      if (response instanceof HttpResponse) {
        this.eventImages.push(response['body'].toString());
        this.snackBar.open('File is completely uploaded!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

}

export interface ProductData {
  id: string;
  Item: Array<string>;
  Price: string;
  Available: string;
  Shipping: string;
  Sold: string;
  checked: boolean;
  Views: string;
  Watchers: string;
  DaysOnSite: string;
  EndDate: string;
}

/** Builds and returns a new User. */
function createNewProduct(id: number): ProductData {

  return {
      id: id.toString(),
      Item: ['Pennywort Centella Asiatica Gotu Kola Dried Tea Powder Herbal tea 100g', '12321313'],
      Price: Math.round(Math.random() * 100) + ' afcash',
      Available: '9',
      Shipping: 'Free',
      Sold: '7',
      checked: false,
      Views: '47',
      Watchers: '5',
      DaysOnSite: '640',
      EndDate: new Date().toString()
  };
}
