import { Component, OnInit, EventEmitter, ViewChild  } from '@angular/core';
import { DISABLED } from '@angular/forms/src/model';
import { Attribute } from '@angular/compiler';
import { FormControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { MatDialog, MatDatepicker, MatSnackBar } from '@angular/material';
import { SelectShippingProductsComponent } from './select-shipping-products/select-shipping-products.component';
import { PromotionService } from '../promotion.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-shipping-discount',
  templateUrl: './shipping-discount.component.html',
  styleUrls: ['./shipping-discount.component.scss']
})
export class ShippingDiscountComponent implements OnInit {
  offerFlag = 0;
  checkValue = false;
  uploadFlag = 1;
  dateCtrl: FormControl;
// upload structure
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
//  uload end

  /**
   * Add by Michael
   */
  method = '1';

  shippingDiscountObject = {
    method: '',
    economy_price: 0,
    standard_price: 0,
    expected_price: 0,
    twoday_price: 0,
    overnight_price: 0,
    description: '',
    title: '',
    priority: 1,
    image_path: '',
    promotional_price: 0,
    economy_check: false,
    standard_check: false,
    expected_check: false,
    twoday_check: false,
    overnight_check: false,
    promotional_check: false,
    min_price: 0,
    min_quantity: 0
  };
  economySelect = '0';
  standardSelect = '0';
  expectedSelect = '0';
  twodaySelect = '0';
  overnightSelect = '0';
  promotionalSelect = 0;

  displayMode = 0;
  offerModeSelect = '0';
  visible_inputProducts = false;
  products: number[] = [];

  @ViewChild('startPicker') startPicker: MatDatepicker<Date>;
  @ViewChild('endPicker') endPicker: MatDatepicker<Date>;

  constructor(
    public dialog: MatDialog,
    private promotionService: PromotionService,
    private snackBar: MatSnackBar
  ) {
    this.dateCtrl = new FormControl();
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
  }

  toggleEnableState() {
    this.dateCtrl.disabled ? this.dateCtrl.enable() : this.dateCtrl.disable();
  }

  onClickStandardCheck() {
    this.shippingDiscountObject.economy_check = false;
  }

  onClickEconomyCheck() {
    this.shippingDiscountObject.standard_check = false;
  }

  onClickExpectedCheck() {
    this.shippingDiscountObject.twoday_check = false;
  }

  onClickTwodayCheck() {
    this.shippingDiscountObject.expected_check = false;
  }

  openSelectProductsDialog() {
    this.promotionService.getSelectProducts(this.shippingDiscountObject.min_price, this.shippingDiscountObject.min_quantity)
      .subscribe(products => {
        const dialogRef = this.dialog.open(SelectShippingProductsComponent, {
          width: '500px',
          data: products
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result != null) {
            result.forEach(product => {
              if (product.select === true) {
                this.products.push(product.id);
              }
            });
            console.log(this.products);
          }
        });
      });
  }

  selectFile(event): void {
    const file = event.target.files.item(0);
    this.promotionService.pushFileToStorage(file, 'shipping_discount_upload').subscribe(response => {
      if (response instanceof HttpResponse) {
        this.shippingDiscountObject.image_path = response['body'].toString();
        this.snackBar.open('File is completely uploaded!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

  onSubmitClick(): void {
    this.shippingDiscountObject['products'] = this.products;
    this.shippingDiscountObject['start_date'] = this.startPicker._selected;
    this.shippingDiscountObject['end_date'] = this.endPicker._selected;

    this.promotionService.addShippingDiscount(this.shippingDiscountObject).subscribe(response => {
      if (parseInt(response['status'], 10) === 1) {
        this.snackBar.open('Success in add shipping discount', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

  onEconomySelectChange(): void {
    if (parseInt(this.economySelect, 10) === 0) {
      this.shippingDiscountObject.economy_price = 0;
    }
  }

  onStandardSelectChange(): void {
    if (parseInt(this.standardSelect, 10) === 0) {
      this.shippingDiscountObject.standard_price = 0;
    }
  }

  onExpectedSelectChange(): void {
    if (parseInt(this.expectedSelect, 10) === 0) {
      this.shippingDiscountObject.expected_price = 0;
    }
  }

  onTwodaySelectChange(): void {
    if (parseInt(this.twodaySelect, 10) === 0) {
      this.shippingDiscountObject.twoday_price = 0;
    }
  }

  onOvernightSelectChange(): void {
    if (parseInt(this.overnightSelect, 10) === 0) {
      this.shippingDiscountObject.overnight_price = 0;
    }
  }

  onDisplayModeChange(): void {
    if (this.displayMode === 0) {
      this.shippingDiscountObject.promotional_price = 0;
    }
    this.shippingDiscountObject.promotional_check = this.displayMode === 0 ? false : true;
  }
}
