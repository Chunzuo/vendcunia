import { Component, OnInit, ViewChild, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthServiceApp } from '../../../shared/services/auth/auth.service';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen = true;
  public links = [
    { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Account Information', href: 'information', icon: 'info' },
    { name: 'Addresses', href: 'addresses', icon: 'location_on' },
    { name: 'ManageMyStore', href: '', icon: '' },
    { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },
    { name: 'Logout', href: '/sign-in', icon: 'power_settings_new' }
  ];
  constructor(
    public router:Router, 
    private authService: AuthServiceApp,
    private pageService: PagesService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn();
    this.authService.isTwoFA();
    if (window.innerWidth < 960){
      this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth < 960) {
          this.sidenav.close();
        }
      }
    });
  }

  ngOnDestroy() {
  }

}
