import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Socket } from 'ng-socket-io';

import { Data, AppService } from '../../../app.service';
import { Product } from '../../../app.models';
import { ProductService } from '../../services/product/product.service';
import { AuthServiceApp } from '../../services/auth/auth.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  @Input() product: Product;
  @Input() type: string;
  @Output() openProductDialogEvent: EventEmitter<any>;
  @Output() quantityChangeEvent: EventEmitter<any>;
  @Output() addToWishListEvent: EventEmitter<number>;
  @Output() addToCartEvent: EventEmitter<number>;
  @Output() addToCompareEvent: EventEmitter<number>;

  public count = 1;
  public align = 'center center';

  constructor(public appService: AppService,
              public authService: AuthServiceApp,
              public productService: ProductService,
              public snackBar: MatSnackBar,
              private socket: Socket) {
    this.openProductDialogEvent = new EventEmitter();
    this.quantityChangeEvent = new EventEmitter();
    this.addToWishListEvent = new EventEmitter();
    this.addToCartEvent = new EventEmitter();
    this.addToCompareEvent = new EventEmitter();

    this.InitializeSocketListeners();
  }

  ngOnInit() {
    if (this.product) {
      // console.log(this.product);
    }
    this.layoutAlign();
  }

  public layoutAlign() {
    if (this.type === 'all') {
      this.align = 'space-between center';
    } else if (this.type === 'wish') {
      this.align = 'start center';
    } else {
      this.align = 'center center';
    }
  }

  public increment(count) {
    if (this.count < this.product.quantity) {
      this.count++;
      const obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.current_price
      };
      this.changeQuantity(obj);
    } else {
      this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×',
        { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  public decrement(count) {
    if (this.count > 1) {
      this.count--;
      const obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.current_price
      };
      this.changeQuantity(obj);
    }
  }

  public addToCompare(product: Product) {
    const usrId = this.authService.getUserId();
    if (usrId === '') {
      this.snackBar.open('You need to login!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    this.productService.addToCompare(usrId, this.product.id).subscribe((response) => {
      const status = response['status'];
      if (status === 1) {
        this.snackBar.open('Succeed to add to compare list!', '×',
            { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.socket.emit('getCompareCount', this.authService.getUserId());
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
    });
  }

  public addToWishList(product: Product) {
    const usrId = this.authService.getUserId();
    if (usrId === '') {
      this.snackBar.open('You need to login!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    this.productService.addToWishList(usrId, this.product.id).subscribe((response) => {
      const status = response['status'];
      if (status === 1) {
        this.snackBar.open('Succeed to add to wish list!', '×',
            { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.socket.emit('getWishListCount', this.authService.getUserId());
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
    });
  }

  public addToCart(product: Product) {
    const usrId = this.authService.getUserId();
    if (usrId === '') {
      this.snackBar.open('You need to login!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return;
    }

    const thisObj = this;
    this.productService.addToCart(usrId, this.product.id, this.product.quantity, this.product.current_price).subscribe((response) => {
      const status = response['status'];
      if (status === 1) {
        this.snackBar.open('Succeed to add to cart!', '×',
            { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.socket.emit('getCartList', thisObj.authService.getUserId());
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
    });
  }

  public openProductDialog(event) {
    this.openProductDialogEvent.emit(event);
  }

  public changeQuantity(value) {
      this.quantityChangeEvent.emit(value);
  }

  public InitializeSocketListeners(): void {
    this.socket.on('compareChanged', (compareCount) => {
      sessionStorage.setItem('compare_count', compareCount);
    });
    this.socket.on('wishListChanged', (wishListCount) => {
      sessionStorage.setItem('wish_list_count', wishListCount);
    });

    this.socket.on('cartChanged', (cartCount) => {
      sessionStorage.setItem('cart_count', cartCount);
    });
  }

}
