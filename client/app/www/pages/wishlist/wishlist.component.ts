import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

import { Data, AppService } from '../../../app.service';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishList = [];

  constructor(
    public appService: AppService,
    private authService: AuthServiceApp,
    private socket: Socket,
    private productService: ProductService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.InitializeSocketListeners();

    if (this.authService.isLoggedIn()  && this.authService.isTwoFA() == true) {
      this.socket.emit('getWishList', this.authService.getUserId());
    }
  }

  public remove(wishId) {
    // const index: number = this.appService.Data.wishList.indexOf(product);
    // if (index !== -1) {
    //     this.appService.Data.wishList.splice(index, 1);
    // }
    this.socket.emit('removeWish', {wishId: wishId, userId: this.authService.getUserId()});
  }

  public clear() {
    // this.appService.Data.wishList.length = 0;
    this.socket.emit('clearWish', this.authService.getUserId());
  }

  public addToCart(product) {
    const thisObj = this;
    this.productService.addToCart(this.authService.getUserId(), product.product_id,
    product.quantity, product.current_price).subscribe(response => {
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

  private InitializeSocketListeners() {
    const thisObj = this;
    this.socket.on('getWishListResponse', (wishes) => {
      thisObj.wishList = wishes;
      sessionStorage.setItem('wish_list_count', wishes.length);
    });
  }
}
