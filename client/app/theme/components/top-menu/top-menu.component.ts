import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Socket } from 'ng-socket-io';

import { Data, AppService } from '../../../app.service';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { ProductService } from '../../../shared/services/product/product.service';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {

  public currencies = ['USD', 'EUR'];
  public currency: any;
  public bLogin: boolean;
  public firstName: string;
  public flags = [
    { name: 'English', image: 'assets/images/flags/gb.svg' },
    { name: 'German', image: 'assets/images/flags/de.svg' },
    { name: 'French', image: 'assets/images/flags/fr.svg' },
    { name: 'Russian', image: 'assets/images/flags/ru.svg' },
    { name: 'Turkish', image: 'assets/images/flags/tr.svg' },
    { name: 'Chinese', image: 'assets/images/flags/cn.svg' }
  ];
  public flag: any;
  public avatar : any;
  public google_id : any;

  constructor(public appService: AppService,
              public authService: AuthServiceApp,
              public productService: ProductService,
              public snackBar: MatSnackBar,
              private socket: Socket) {
    this.firstName = '';

    this.InitializeSocketListeners();

    if (this.authService.isLoggedIn()  && this.authService.isTwoFA() == true) {
      this.socket.emit('getCompareCount', this.authService.getUserId());
      this.socket.emit('getWishListCount', this.authService.getUserId());
      this.socket.emit('getCartCount', this.authService.getUserId());
    }
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    this.avatar = sessionStorage.getItem('avatar');
    this.google_id = sessionStorage.getItem('google_id');
  }

  public changeCurrency(currency) {
    this.currency = currency;
  }

  public changeLang(flag) {
    this.flag = flag;
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
    this.socket.on('discountOfferReceived', (discountOfferInfo) => {
      if (discountOfferInfo.receiver_email === this.authService.getEmail()) {
        this.snackBar.open(discountOfferInfo.content, '×', { panelClass: 'success', verticalPosition: 'top', duration: 8000 });
      }
    });
    this.socket.on('discountOfferHandleReceived', (discountOfferHandlerInfo) => {
      if (discountOfferHandlerInfo.receiver_email === this.authService.getEmail()) {
        this.snackBar.open(discountOfferHandlerInfo.content, '×', { panelClass: 'success', verticalPosition: 'top', duration: 8000 });
      }
    });
  }

}
