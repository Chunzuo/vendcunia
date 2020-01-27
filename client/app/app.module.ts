import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { menuScrollStrategy } from './theme/utils/scroll-strategy';

import { RoutingModule } from './app.routing';

import { SharedModule } from './shared/shared.module';
import { WwwModule } from './www/www.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { AppInterceptor } from './theme/utils/app-interceptor';
import { SellerHubModule } from './seller-hub/seller-hub.module';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppConfig } from './config/app.config';
import { FeedbackDialogComponent } from './www/pages/account/activity/feedback-dialog/feedback-dialog.component';

const config: SocketIoConfig = { url: AppConfig.endpoints.ws, options: {} };

@NgModule({
   imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    WwwModule,
    AdminModule,
    SellerHubModule,
    RoutingModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppSettings,
    AppService,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
