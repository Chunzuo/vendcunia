import { Component, OnInit, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Socket } from 'ng-socket-io';

import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Category } from '../../app.models';
import { SidenavMenuService } from '../../theme/components/sidenav-menu/sidenav-menu.service';
import { AuthServiceApp } from '../../shared/services/auth/auth.service';
import { PagesService } from './pages.service';
import { ProductService } from '../../shared/services/product/product.service';
import { SidenavMenu } from '../../theme/components/sidenav-menu/sidenav-menu.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ SidenavMenuService ]
})
export class PagesComponent implements OnInit, AfterViewInit {
  public showBackToTop: Boolean = false;
  public categories: Category[];
  public category: Category;
  public sidenavMenuItems: Array<any>;
  @ViewChild('sidenav') sidenav: any;

  public cartList = [];
  public cartTotalPrice = 0;

  public settings: Settings;
  constructor(public appSettings: AppSettings,
              public appService: AppService,
              public sidenavMenuService: SidenavMenuService,
              public router: Router,
              public authService: AuthServiceApp,
              public productService: ProductService,
              private socket: Socket,
              public pageService: PagesService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getCategories();
    this.socket.emit('getCartList', this.authService.getUserId());
    this.InitializeSocketListeners();
  }
  private getNavmenuItems() {
    this.productService.getCategoryList(-1).subscribe(response => {
      const menuItems = [];
      response.forEach((item) => {
        const id = item['id'] ;
        const title = item['name'];
        const routerLink = item['has_sub_menu'] === 1 ? null : 'products/' + item.id;
        const href = null;
        const target = null;
        const hasSubMenu = item['has_sub_menu'] === 1 ? true : false;
        const parentId = item['parent_id'];
        menuItems.push(new SidenavMenu(id, title, routerLink, href, target, hasSubMenu, parentId));
      });
      this.sidenavMenuItems = menuItems;
    });
  }

  public getCategories() {
    this.productService.getCategoryList(-1).subscribe(data => {
      const categories = [];
      data.map((item) => {
        categories.push(new Category(item['id'], item['name'], item['has_sub_category'], item['parent_id']));
      });
      this.categories = categories;
      this.category = categories[0];
      this.appService.Data.categories = categories;
    });
  }

  public changeCategory(event) {
    if (event.target) {
      this.category = this.categories.filter(category => category.name === event.target.innerText)[0];
    }
    if (window.innerWidth < 960) {
      this.stopClickPropagate(event);
    }
  }

  public remove(cartId) {
      this.socket.emit('removeCart', {userId: this.authService.getUserId(), cartId: cartId});
  }

  public clear() {
    this.socket.emit('clearCart', this.authService.getUserId());
  }

  public changeTheme(theme) {
    this.settings.theme = theme;
  }

  public stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  public search() {}

  public scrollToTop() {
    const scrollDuration = 200;
    const scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
      if (window.pageYOffset !== 0) {
         window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => { window.scrollTo(0, 0); });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
      }
    });
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  public closeSubMenus() {
    if (window.innerWidth < 960) {
      this.sidenavMenuService.closeAllSubMenus();
    }
  }

  public signOut() {
    this.authService.logout();
  }

  /**
   * Add by Michael
   */
  private getCarts() {
    this.productService.getCarts(this.authService.getUserId()).subscribe(response => {
      if (response['status'] === 1) {
        this.appService.Data.cartList = response['data'];
        response['data'].forEach(cart => {
          this.appService.Data.totalPrice += cart['price'];
        });
      }
    });
  }

  private InitializeSocketListeners(): void {
    this.socket.on('getCartListResponse', (carts) => {
      sessionStorage.setItem('cart_count', carts.length);
      this.productService.setCartList(carts);

      let cartTotalPrice = 0;
      carts.forEach(cart => {
        cartTotalPrice += cart['price'];
      });

      sessionStorage.setItem('cart_total_price', cartTotalPrice.toString());
    });
  }

}
