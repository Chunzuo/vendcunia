import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';

import { Socket } from 'ng-socket-io';
import { MatSnackBar } from '@angular/material';
import { AuthServiceApp } from './shared/services/auth/auth.service';

import { Helpers } from './shared/utils/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  loading = false;
  title = 'app';
  public settings: Settings;
  globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';

  constructor(
    public appSettings: AppSettings,
    public router: Router,
    private socket: Socket,
    public snackBar: MatSnackBar,
    private authService: AuthServiceApp
  ) {
    this.settings = this.appSettings.settings;
    this.InitializeSocketListeners();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.socket.emit('login', this.authService.getEmail());
    }

    this.router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
        Helpers.bodyClass(this.globalBodyClass);
      }
      if (route instanceof NavigationEnd) {
        Helpers.setLoading(false);
      }
    });
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
      }
    });
  }

  public InitializeSocketListeners(): void {
    this.socket.on('receiveEmail', (senderEmail) => {
      console.log('new message arrived from ' + senderEmail);
      this.snackBar.open(
        'New message arrived from ' + senderEmail, '×',
        { panelClass: 'success', verticalPosition: 'top', duration: 3000 }
      );
    });
  }

}
