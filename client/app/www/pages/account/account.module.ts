import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountPageModule } from './account-page/account-page.module';

export const routes = [
  {
    path: '',
    component: AccountComponent, children: [
        { path: '', redirectTo: 'activity', pathMatch: 'full' },
        { path: 'activity', loadChildren: 'app/www/pages/account/activity/activity.module#ActivityModule',
            data: {  breadcrumb: 'Activity' } },
        { path: 'account', loadChildren: 'app/www/pages/account/account-page/account-page.module#AccountPageModule',
            data: {  breadcrumb: 'Account' } },
        { path: 'message', loadChildren: 'app/www/pages/account/message/message.module#MessageModule',
            data: {  breadcrumb: 'Message' } }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent
  ]
})
export class AccountModule {
}
