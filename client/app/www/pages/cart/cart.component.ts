import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

import { Data, AppService } from '../../../app.service';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  public cartList = [];

  constructor(
    public appService: AppService,
    private authService: AuthServiceApp,
    private socket: Socket,
    private productService: ProductService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()  && this.authService.isTwoFA() == true) {
      this.socket.emit('getCartList', this.authService.getUserId());
    }
    this.InitializeSocketListeners();
  }

  public getTotalPrice(value) {
    if (value) {
      this.total[value.productId] = value.total;
      this.grandTotal = 0;
      this.total.forEach(price => {
        this.grandTotal += price;
      });
    }
  }

  /**
   * Modified by Michael
   */
  public remove(cartId) {
    this.socket.emit('removeCart', {userId: this.authService.getUserId(), cartId: cartId});
  }

  public clear() {
    this.socket.emit('clearCart', this.authService.getUserId());
  }

  private InitializeSocketListeners(): void {
    const thisObj = this;
    this.socket.on('getCartListResponse', (carts) => {
      thisObj.cartList = carts;
      carts.forEach(cart => {
        thisObj.grandTotal += cart['price'];
      });
    });
  }
}
