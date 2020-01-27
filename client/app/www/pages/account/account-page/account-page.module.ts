import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { NgChatModule } from 'ng-chat';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AccountPageComponent} from './account-page.component';
import { AccountSidebarComponent} from './account-sidebar/account-sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

import { BusinessInfoComponent } from './business-info/business-info.component';
import { ExcoincialAccountComponent } from './excoincial-account/excoincial-account.component';
import { AccountFeedbackComponent } from './account-feedback/account-feedback.component';
import { SellerAccountComponent } from './seller-account/seller-account.component';
import { CommunicationComponent } from './communication/communication.component';
import { CommunicationService } from './communication/communication.service';
import { BussinessPassDlgComponent } from './bussiness-pass-dlg/bussiness-pass-dlg.component';

import { AppConfig } from '../../../../config/app.config';

const config: SocketIoConfig = { url: AppConfig.endpoints.ws, options: {} };

export const routes = [
  {
      path: '',
      component: AccountPageComponent, children: [
        { path: '', redirectTo: 'businessInfo', pathMatch: 'fill' },
        { path: 'businessInfo', component: BusinessInfoComponent, data: {  breadcrumb: 'businessInfo' } },
        { path: 'excoincial', component: ExcoincialAccountComponent, data: {  breadcrumb: 'ExcoincialAccount' } },
        { path: 'feedback', component: AccountFeedbackComponent, data: {  breadcrumb: 'Feedback' } },
        { path: 'sellerAccount', component: SellerAccountComponent, data: {  breadcrumb: 'SellerAccount' } },
        { path: 'communication', component: CommunicationComponent, data: {  breadcrumb: 'SellerAccount' } }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3HQ_Gk_XRt6KitPdiHQNGpVn0NDwQGMI'
    }),
    RouterModule.forChild(routes),
    SharedModule,
    NgChatModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    AccountPageComponent,
    AccountSidebarComponent,
    BusinessInfoComponent,
    ExcoincialAccountComponent,
    AccountFeedbackComponent,
    SellerAccountComponent,
    CommunicationComponent,
    BussinessPassDlgComponent
  ],
  entryComponents: [BussinessPassDlgComponent]
})
export class AccountPageModule { }
