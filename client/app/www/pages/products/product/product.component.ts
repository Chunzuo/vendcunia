import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../../app.service';
import { Product } from '../../../../app.models';
import { emailValidator } from '../../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';

import { clearTimeout } from 'timers-browserify';
import { MatSnackBar } from '@angular/material';
import { PARAMETERS } from '@angular/core/src/util/decorators';

import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { ProductService } from '../../../../shared/services/product/product.service';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { MessageService } from '../../../../shared/services/message.service';

// socket module
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from '../../../../shared/utils/socketio-adapter';
import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';
import { count } from 'rxjs-compat/operator/count';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  public config: SwiperConfigInterface = {};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: any;
  public stimeRemaining: number;
  public mtimeRemaining: number;
  public htimeRemaining: number;
  public parentImage: boolean;
  private productQuantity: number;
  private bidCost: number;
  // Created by Michael
  public canBuy: boolean;
  public discountPrice: Number;
  public isMine: boolean;
  public images = [];

  currentCost: number;
  userId: string;
  username: string;
  currency: string;

  public reviewRating: number;
  public reviews: any;

  packageTypes = ['Letter', 'Large Envelope', 'Package (or thick envelope)', 'Large Package' ];
  weightTypes = ['1 lb. or less', '1+ to 2 lbs', '2+ to 3 lbs', '3+ to 4 lbs', '4+ to 5 lbs', '5+ to 6 lbs', '6+ to 7 lbs',
  '7+ to 8 lbs', '8+ to 9 lbs'];
  packageType = '';
  weightType = '';

  shipping_array: Object[];
  domestic_shpping_service_array: Object[];
  international_array: Object[];

  public adapter: ChatAdapter;
  shipping_type: any;
  shipping_service_type: any;
  inter_type: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public appService: AppService,
    public authService: AuthServiceApp,
    private productService: ProductService,
    private currencyService: CurrencyService,
    private userService: UserService,
    private messageService: MessageService,
    private socket: Socket
  ) {
    this.shipping_array = [
      {id: 1, name: 'Flat: same cost to all buyers'},
      {id: 2, name: 'Calculated: Cost varies by buyer location'},
      {id: 3, name: 'Freight: large items over 150 lbs'},
      {id: 4, name: 'No shipping: Local pickup only'}
    ];
    this.domestic_shpping_service_array = [
      {id: 1, name: 'USPS Parcel Select Ground (2 to 9 business days)'},
      {id: 2, name: 'USPS Media Mail (2 to 8 business days)'},
      {id: 3, name: 'UPS Surepost (1 to 6 business days)'}
    ];
    this.international_array = [
      {
        id: 1,
        name: 'Flat: same cost to all buyers'
      },
      {
        id: 2,
        name: 'Calculated: Cost varies by buyer location'
      },
      {
        id: 3,
        name: 'No international shipping'
      }
    ];
    this.productQuantity = 1;
  }

  public InitializeSocketListeners(): void {
    this.socket.on('remainTimeChanged', (remainTime) => {
      this.htimeRemaining = remainTime.hour;
      this.mtimeRemaining = remainTime.min;
      this.stimeRemaining = remainTime.sec;
    });
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getProductById(params['id']);
      this.getReviews(params['id']);

      this.socket.emit('getRemainTime', params['id']);
      this.InitializeSocketListeners();
    });
    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });
    this.getCurrency();
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    };
  }

  bidProduct(): void {
    if (this.authService.getUserId() === '') {
      this.snackBar.open('You need to login!', '×',
            { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    if (this.bidCost <= this.currentCost) {
      this.snackBar.open('You must bid it up more than ' + this.currentCost + ' afcash.', '×',
            { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else {
      this.currentCost = this.bidCost;

      this.productService.bidProduct(
        this.product.id, this.bidCost, this.authService.getUserId()
      ).subscribe(response => {
        if (response.status === 1) {
          this.snackBar.open('You bid this product to ' + this.currentCost + ' afcash', '×',
            { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

          this.getProductById(this.product.id);
        }
      });
    }
  }

  buyItNow(productId): void {
    const usrId = this.authService.getUserId();
    if (usrId === '') {
      this.snackBar.open('You need to login!', '×',
            {panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    if (this.productQuantity == null || this.productQuantity === 0) {
      this.snackBar.open('Please input valid quantity!', '×',
            { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
      return;
    }

    if (!this.authService.isLoggedIn()  && this.authService.isTwoFA() == true) {
      this.snackBar.open('You must sign in this page!', '×',
            { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else {
      this.userService.getBalance(this.authService.getEmail()).subscribe((results) => {
        if (results.success === 1) {
          const balance = results.balance;
          if (balance < this.productQuantity * this.product.current_price) {
            this.snackBar.open('Your afcash balance is insufficient!', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
          } else {
            sessionStorage.setItem('buy_product_id', this.product.id.toString());
            sessionStorage.setItem('buy_product_quantity', this.productQuantity.toString());
            sessionStorage.setItem('buy_product_price', this.product.current_price.toString());

            this.router.navigate(['checkout']);
          }
        } else if (results.success === 0) {
          this.snackBar.open('Invalid parameters!', '×',
                { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
        } else if (results.success === -1) {
          this.snackBar.open('Database query error when getting balance!', '×',
                { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
        } else if (results.success === -2) {
          this.snackBar.open('No user exist for email address!', '×',
                { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
        }
      });
    }
  }

  public getProductById(id) {
    const thisObj = this;
    this.productService.getProductById(id, this.authService.getUserId()).subscribe(response => {
      if (response.status === 1) {
        const productInfo = response.productInfo;
        console.log('product info : ' + JSON.stringify(productInfo));
        this.product = response.productInfo;
        for (let i = 0; i < this.shipping_array.length; i++) {
          if (this.shipping_array[i]['id'] === this.product.domestic_shipping_type) {
            this.shipping_type = this.shipping_array[i]['name'];
            break;
          }
        }
        for (let i = 0; i < this.domestic_shpping_service_array.length; i++) {
          if (this.domestic_shpping_service_array[i]['id'] === this.product.domestic_service_type) {
            this.shipping_service_type = this.shipping_array[i]['name'];
            break;
          }
        }
        for (let i = 0; i < this.international_array.length; i++) {
          if (this.international_array[i]['id'] === this.product.internal_shipping_type) {
            this.inter_type = this.international_array[i]['name'];
            break;
          }
        }
        this.packageType = this.packageTypes[productInfo.package_type];
        this.weightType = this.weightTypes[productInfo.weight_type];
        if (productInfo.colors) {
          this.product['colors'] = productInfo.colors.split(',');
        } else {
          this.product['colors'] = [];
        }
        const images = productInfo.images.split(',');

        this.images = images;
        this.product.images = images;
        this.image = images[0];
        this.zoomImage = images[1];
        // this.product.color = ['#1D1D1D', '#DADADA', '#597087']; // must modify this part
        this.product.size = ['24', '28', '32'];

        this.canBuy = productInfo.selling_format === 2 ? true : false;
        if (parseInt(this.product.remain_second, 10) < 1 && this.product['selling_format'] === 1) {
          this.canBuy = true;
        }

        this.currentCost = productInfo.current_price;

        this.htimeRemaining = parseInt(this.product.remain_second.toString().split(':')[0], 10);
        this.mtimeRemaining = parseInt(this.product.remain_second.toString().split(':')[1], 10);
        this.stimeRemaining = parseInt(this.product.remain_second.toString().split(':')[2], 10);

        this.getRelatedProducts(productInfo.category_id);
        if (productInfo.created_by === parseInt(this.authService.getUserId(), 10)) {
          this.isMine = true;
        } else {
          this.isMine = false;
        }

        if (productInfo.selling_format === 1 && parseInt(this.product.remain_second, 10) < 1) {
          this.productService.getBidder(productInfo.id).subscribe(response_1 => {
            if (response_1['status'] === -1) {
              this.snackBar.open('failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
            }
            if (response_1['status'] === 1) {
              /*if (response_1['data'] && (response_1['data'].buyer_id === this.authService.getUserId())) {
                this.snackBar.open('You have to buy this product.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                this.canBuy = true;
              } else {
                this.canBuy = false;
              }*/
            }
          });
        }
      } else if (response.status === 0) {
        this.snackBar.open('Invalid parameters', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      } else if (response.status === -1) {
        this.snackBar.open('Database Error : ' + response.msg.sqlMessage, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      } else if (response.status === -2) {
        this.snackBar.open('Invalid product id', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

  /**
   * Updated by Michael
   * @param category_id
   */
  private getRelatedProducts(category_id) {
    this.productService.getRelatedProducts(category_id).subscribe((response) => {
      this.relatedProducts = response;
    });
  }

  public selectImage(image) {
    this.image = image;
    this.zoomImage = image;
  }

  public onMouseMove(e) {
    if (window.innerWidth >= 1200) {
      let image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX / image.offsetWidth * 100;
      y = offsetY / image.offsetHeight * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onSubmitReview(values: Object): void {
    if (this.form.valid) {
      this.productService.sendReview({
        product_id: this.product.id,
        review: values['review'],
        email: values['email'],
        name: values['name'],
        rating: this.reviewRating
      }).subscribe((response) => {
        if (response['status'] === -1) {
          this.snackBar.open('error occured while fetching.', '×',
            { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
        if (response['status'] === 1) {
          this.snackBar.open('Your review submitted.', '×',
            { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.getReviews(this.product.id);
          this.form.reset();
        }
      });
    }
  }

  /**
   * Created by Michael
   */
  public onDiscount(): void {
    if (!this.authService.isLoggedIn() || this.authService.getUserId() === '') {
      this.snackBar.open('You need to login!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    if (!this.product.created_by) {
      this.snackBar.open('Invalid product!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    if (!this.discountPrice) {
      this.snackBar.open('Please input discount price!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    if (this.discountPrice <= 0) {
      this.snackBar.open('Discount price should not be less than 0!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    this.productService.offerDiscount({
      seller_id: this.product.created_by,
      buyer_id: this.authService.getUserId(),
      product_id: this.product.id,
      discount_price: this.discountPrice
    }).subscribe((response) => {
      if (response['status'] === -1) {
        this.snackBar.open('error occured while fetching.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
      if (response['status'] === -2) {
        this.snackBar.open('You can\'t offer anymore', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
      if (response['status'] === 1) {
        const messageOnDiscount = '';
        this.userService.getEmailById(this.product.created_by).subscribe((results) => {
          if (results.success === 1) {
            const discountMsgTitle = 'Discount Offer';
            const discountMsgContent = 'You\'ve got discount offer message for product ' + this.product.name +
                                      ' with the price(cash) ' + this.discountPrice + ' from ' + this.authService.getEmail();
            this.messageService.sendMessage(
              this.authService.getEmail(), results.email,
              discountMsgTitle, discountMsgContent,
              response['discountId']
            ).subscribe(response_1 => {
              if (response_1.status === 1) {
                this.snackBar.open('Offered to seller.', '×',
                      { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

                const discountOfferInfo = {
                  sender_email: this.authService.getEmail(),
                  receiver_email: results.email,
                  title: discountMsgTitle,
                  content: discountMsgContent
                };
                this.socket.emit('sendDiscountOffer', discountOfferInfo);
              } else if (response_1.status === 0) {
                this.snackBar.open('Invalid parameters!', '×',
                      { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
              } else if (response_1.status === -1) {
                this.snackBar.open('Database query error occured!', '×',
                      { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
              }
            });
          } else if (results.success === 0) {
            this.snackBar.open('Invalid parameters!', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
          } else if (results.success === -1) {
            this.snackBar.open('Database query error when getting balance!', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
          } else if (results.success === -2) {
            this.snackBar.open('No user exist for user id!', '×',
                  { panelClass: 'error', verticalPosition: 'top', duration: 30000 });
          }
        });
      }
    });
  }

  private getReviews(id) {
    this.productService.getReviews(id).subscribe((response) => {
      if (response['status'] === -1) {
        this.snackBar.open('error occured while fetching.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
      if (response['status'] === 1) {
        this.reviews = response['data'];
      }
    });
  }

  /**
   * Created by Michael
   *
   */
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

  public quantityChanged(event: any): void {
    if (!event) {
      return;
    }
    const productId = event.productId;
    const quantity = event.soldQuantity;
    const total = event.total;
    this.productQuantity = quantity;
  }

  public wishListAdded(status: number): void {
    if (status === 1) {
      this.snackBar.open('Succeed to add to wish list!', '×',
          { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    } else if (status === 0) {
      this.snackBar.open('Invalid post params!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else if (status === -1 || status === -3) {
      this.snackBar.open('Database query error! Failed to add to wish list!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else if (status === -2) {
      this.snackBar.open('Already added to wish list!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  public cartAdded(status: number): void {
    if (status === 1) {
      this.snackBar.open('Succeed to add to cart!', '×',
          { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    } else if (status === 0) {
      this.snackBar.open('Invalid post params!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else if (status === -1 || status === -3) {
      this.snackBar.open('Database query error! Failed to add to cart!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else if (status === -2) {
      this.snackBar.open('Already added to cart!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  public compareAdded(status: number): void {
    if (status === 1) {
      this.snackBar.open('Succeed to add to compare list!', '×',
          { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    } else if (status === 0) {
      this.snackBar.open('Invalid post params!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else if (status === -1 || status === -3) {
      this.snackBar.open('Database query error! Failed to add to compare list!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    } else if (status === -2) {
      this.snackBar.open('Already added to compare list!', '×',
          { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

}
