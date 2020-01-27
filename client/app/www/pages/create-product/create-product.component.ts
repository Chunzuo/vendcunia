import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { Category } from '../../../app.models';
import { AppService } from '../../../app.service';
import { Services } from '@angular/core/src/view';
import { ProductConditionService } from '../../../shared/services/product-condition.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { AppConfig } from '../../../config/app.config';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { CreateProductService } from './create-product.service';
import { rgb } from 'd3-color';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  private fileUploadAPI = AppConfig.endpoints + '/products';

  createProductForm: FormGroup;
  categories: Category[];
  tax_array: String[];
  shipping_array: Object[];
  domestic_shipping_service_array: Object[];
  international_shipping_service_array: Object[];
  business_array = [];
  international_array: Object[];
  format_array: Object[];
  duration_array: Object[];
  pk_array: Object[];
  weight_array: Object[];
  listingFlag: Boolean;
  donationBuyFlag: Boolean;
  listing_value: Boolean;
  donation_values: Boolean;
  colors: any; // add by michael
  brands = []; // add by michael
  paramId: number;
  template: Object;
  ship_to_array: Object[];
  intern_additional_ship_to_array: Object[];

  public product_name: string;
  public product_title: string;
  public product_sub_title: string;
  public condition_desc: string;
  public material: string;
  public provenance: string;
  public description: string;
  public starting_price: Number;
  public current_price: Number;
  public reserve_price: Number;
  public quantity: Number;
  public domestic_shipping_cost: number;
  public international_shipping_cost: number;
  public additional_location: number;
  public offical_cost: number;
  public demetion1: string;
  public demetion2: string;
  public demetion3: string;
  public lbs: string;
  public oz: string;

  // public category: string;
  public format: string;
  public duration: string;
  public tax: string;
  public shipping: string;
  public service: string;
  public businessDay: string;
  public intern_shipping: string;
  public pktype: string;
  public weight: string;

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  // Created by Michael
  public product_condition_list: any;
  public categorylist: any;
  uploadUrl = AppConfig.endpoints.frontend + '/products/upload';

  afuConfig = {
    uploadAPI: {
      url: this.uploadUrl
    },
    multiple: true
  };

  @ViewChild('fileUpload')
  private fileUpload: AngularFileUploaderComponent;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthServiceApp,
    private productService: ProductService,
    public appService: AppService,
    private productConditionService: ProductConditionService,
    private createProductService: CreateProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

    this.template = {
      name: '',
      title: '',
      sub_title: '',
      condition_desc: '',
      condition_id: 0,
      category_id: 0,
      material: '',
      provenance: '',
      description: '',
      selling_format: 0,
      duration: 0,
      starting_price: 0,
      current_price: 0,
      reserve_price: 0,
      quantity: 0,
      sales_tax: 0,
      domestic_shipping_type: 0,
      domestic_service_type: 0,
      domestic_shipping_cost: 0,
      international_shipping_cost: 0,
      additional_location: 0,
      domestic_free_shipping: 0, // false
      domestic_offer_local_pickup: 0, // false
      domestic_handling_time: 0,
      internal_shipping_type: 0,
      package_type: 0,
      package_dimens_x: 0,
      package_dimens_y: 0,
      package_dimens_z: 0,
      weight_type: 0,
      weight_lbs: 0,
      weight_oz: 0,
      images: '',
      ship_to: 0,
      additional_ship_america: 0,
      additional_ship_canada: 0,
      additional_ship_mexico: 0,
      additional_ship_brazil: 0,
      additional_ship_europe: 0,
      additional_ship_uk: 0,
      additional_ship_germany: 0,
      additional_ship_france: 0,
      additional_ship_russia: 0,
      additional_ship_asia: 0,
      additional_ship_china: 0,
      additional_ship_japan: 0,
      additional_ship_australia: 0
    };
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.uploadUrl,
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  ngOnInit() {
    this.productConditionService.getList().subscribe((response) => {
      this.product_condition_list = response;
    });

    this.activatedRoute.params.subscribe(params => {
      this.paramId = params['templateId'];
    });

    if (this.paramId != null) {
      this.getTemplateDetail(this.paramId);
    }

    this.listingFlag = false;
    this.getCategories();
    this.createProductForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(80)])],
      'title': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(80)])],
      'sub_title': ['', Validators.compose([Validators.minLength(6), Validators.maxLength(80)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(1000)])],
      'condition_desc': ['', Validators.compose([Validators.minLength(6), Validators.maxLength(1000)])],
      'material': [''],
      'provenance': [''],
      'category': ['0', Validators.compose([Validators.required])],
      'selling_format': ['0', Validators.compose([Validators.required])],
      'duration': ['0'],
      'start_price' : [''],
      'now_price' : [''],
      'reserve_price' : [''],
      // 'paypal_value': ['false'],
      // 'buyNow_value': ['false'],
      // 'addtional_list' : ['', Validators.compose([Validators.minLength(6), Validators.maxLength(1000)])],
      'sales_tax': [''],
      'domestic_shipping_cost': [0, Validators.compose([Validators.min(0), Validators.max(10000)])],
      'international_shipping_cost': [0, Validators.compose([Validators.min(0), Validators.max(10000)])],
      'offical_cost': [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(10000)])],
      'additional_location': [0, Validators.compose([Validators.min(0), Validators.max(10000)])],
      // 'international': [''],
      // 'domestic': [''],
      'shipping': [1],
      'businessDay': [''],
      'quantity': ['0'],
      'service': ['0'],
      'intern_shipping': [1],
      'pktype': ['0'],
      'weight': ['0'],
      'dimention_x': ['0'],
      'dimention_y': ['0'],
      'dimention_z': ['0'],
      'lbs': ['0'],
      'oz': ['0'],
      'condition': ['0'],
      'freeShipping': [false],
      // 'offerLocalPickup': [''],
      'colors': [],
      'brands': [],
      'domestic_offer_local_pickup': [''],
      'ship_to': [1],
      // 'additional_ship_america': [0],
      // 'additional_ship_canada': [0],
      // 'additional_ship_mexico': [0],
      // 'additional_ship_brazil': [0],
      // 'additional_ship_europe': [0],
      // 'additional_ship_uk': [0],
      // 'additional_ship_germany': [0],
      // 'additional_ship_france': [0],
      // 'additional_ship_russia': [0],
      // 'additional_ship_asia': [0],
      // 'additional_ship_china': [0],
      // 'additional_ship_japan': [0],
      // 'additional_ship_australia': [0],
      shipping_id: -1
    });
    this.listing_value = false;
    this.donation_values = false;
    this.donationBuyFlag = false;
    this.tax_array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
    this.business_array = [
      { id: 1, name: 'Select a handling time' },
      { id: 2, name: 'Same business day' },
      { id: 3, name: '1 business days' },
      { id: 4, name: '2 business days' },
      { id: 5, name: 'Same business day' },
      { id: 6, name: '3 business days' },
      { id: 7, name: '4 business days' }
    ];
    this.shipping_array = [
      { id: 1, name: 'Flat: same cost to all buyers' },
      { id: 2, name: 'Calculated: Cost varies by buyer location' },
      { id: 3, name: 'Freight: large items over 150 lbs' },
      { id: 4, name: 'No shipping: Local pickup only' }
    ];
    this.domestic_shipping_service_array = [
      { id: 1, name: 'USPS Parcel Select Ground (2 to 9 business days)' },
      { id: 2, name: 'USPS Media Mail (2 to 8 business days)' },
      { id: 3, name: 'UPS Surepost (1 to 6 business days)' }
    ];
    this.international_array = [
      { id: 1, name: 'Flat: same cost to all buyers' },
      { id: 2, name: 'Calculated: Cost varies by buyer location' },
      { id: 3, name: 'No international shipping' }
    ];
    this.international_shipping_service_array = [
      { id: 1, name: 'USPS Parcel Select Ground (2 to 9 business days)' },
      { id: 2, name: 'USPS Media Mail (2 to 8 business days)' },
      { id: 3, name: 'UPS Surepost (1 to 6 business days)' }
    ];
    this.intern_additional_ship_to_array = [
      { id: 1, name: 'United States' },
      { id: 2, name: 'China' },
      { id: 3, name: 'Russia' },
      { id: 4, name: 'Japan' }
    ];
    this.format_array = [
      {
        id: 1,
        name: 'Auction-style'
      },
      {
        id: 2,
        name: 'Fixed price'
      },
    ];
    this.duration_array = [
      {
        id: 3,
        name: '3 days'
      },
      {
        id: 5,
        name: '5 days'
      },
      {
        id: 7,
        name: '7 days'
      },
      {
        id: 10,
        name: '10 days'
      }
    ];
    this.pk_array = [
      { id: 1, name: 'Letter' }, { id: 2, name: 'Large Envelope' }, { id: 3, name: 'Package (or thick envelope)' },
        { id: 4, name: 'Large Package' }
    ];
    this.weight_array = [
      { id: 1, name: '1 lb. or less' }, { id: 2, name: '1+ to 2 lbs'}, { id: 3, name: '2+ to 3 lbs' },
      { id: 4, name: '3+ to 4 lbs' }, { id: 5, name: '4+ to 5 lbs' },
      { id: 6, name: '5+ to 6 lbs' }, { id: 7, name: '6+ to 7 lbs' },
      { id: 8, name: '7+ to 8 lbs' }, { id: 9, name: '8+ to 9 lbs' }
    ];
    this.ship_to_array = [
      { id: 1, name: 'ship to 1' },
      { id: 2, name: 'ship to 2' },
      { id: 3, name: 'ship to 3' }
    ];

    this.getColors();
    this.brands = this.appService.getBrands();
  }

  public getCategories() {
    this.productService.getCategoryList(0).subscribe((data) => {
      this.categorylist = data;
      this.appService.Data.categorylist = data;
    });
  }

  public changedonationBuyFlag() {
    if (this.donationBuyFlag) {
      this.donation_values = false;
    } else {
      this.donation_values = true;
    }
    this.donationBuyFlag = !this.donationBuyFlag;
  }

  public onclickedPrivateListing() {
    if (this.listingFlag) {
      this.listing_value = false;
    } else {
      this.listing_value = true;
    }
    this.listingFlag = !this.listingFlag;
  }

  public onCancelClicked() {
    this.product_name = '';
    this.product_title = '';
    this.product_sub_title = '';
    this.condition_desc = '';
    // this.material = '';
    // this.provenance = '';
    this.description = '';
    this.starting_price = 0;
    this.current_price = 0;
    this.reserve_price = 0;
    this.quantity = 0;
    this.domestic_shipping_cost = 0;
    this.international_shipping_cost = 0;
    this.additional_location = 0;
    this.offical_cost = 0;
    this.demetion1 = '';
    this.demetion2 = '';
    this.demetion3 = '';
    this.lbs = '';
    this.oz = '';
    // this.category = '';
    this.format = '';
    this.duration = '';
    this.tax = '';
    this.shipping = '';
    this.service = '';
    this.businessDay = '';
    this.intern_shipping = '';
    this.pktype = '';
    this.weight = '';
  }
  public onCreateProductFormSubmit(): void {
    if (this.createProductForm.valid) {
      const productInfo = this.createProductForm.value;
      productInfo['buy_allowed'] = this.listing_value;
      productInfo['donation_allowed'] = this.donation_values;
      productInfo['user_id'] = this.authService.getUserId();
      productInfo['files'] = this.createProductService.uploadFiles;
      productInfo['domestic_cost'] = this.createProductForm.controls.offical_cost.value;
      productInfo['international_service'] = this.createProductForm.controls.service.value; // this.service;
      productInfo['free'] = this.createProductForm.controls.freeShipping.value;
      
      const thisObj = this;
      this.productService.create(productInfo)
        .subscribe(response => {
          if (response['status'] === 1) {
            thisObj.router.navigate(['create-listings']);
            this.snackBar.open('Create template succeed!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
          }
      });
    }
  }

  public uploadResponse(event) {
    console.log(event);
  }

  private getTemplateDetail(templateId) {
    this.productService.getTemplateDetail(templateId).subscribe(response => {
      this.template = response[0];
      if (response[0].colors != null) {
        response[0].colors = response[0].colors.split(',');
      }
      response[0].brands = response[0].brands.split(',');
      console.log(response[0]);
      this.createProductForm.setValue(response[0]);
    });
  }

  private getColors(): void {
    this.productService.getColors().subscribe((response) => {
      if (response['status'] === 1) {
        this.colors = response['data'];
      }
    });
  }

  public onClickListItem(): void {
    if (this.createProductForm.valid) {
      const productInfo = this.createProductForm.value;
      productInfo['buy_allowed'] = this.listing_value;
      productInfo['donation_allowed'] = this.donation_values;
      productInfo['user_id'] = this.authService.getUserId();
      productInfo['files'] = this.createProductService.uploadFiles;
      productInfo['publish'] = 1;
      productInfo['id'] = this.paramId;
      console.log(productInfo);
      const thisObj = this;
      this.productService.update(productInfo)
        .subscribe(response => {
          if (response['status'] === 1) {
            thisObj.router.navigate(['']);
            this.snackBar.open('Create Listing succeed!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
          }
      });
    }
  }
}
