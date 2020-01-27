import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersSidebarComponent } from './orders-sidebar/orders-sidebar.component'
import { OrdersArchivedComponent } from './orders-archived/orders-archived.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrdersAllComponent } from './orders-all/orders-all.component';
import { OrdersAwaitingPaymentComponent } from './orders-awaiting-payment/orders-awaiting-payment.component';
import { OrdersAwaitingShipmentComponent } from './orders-awaiting-shipment/orders-awaiting-shipment.component';
import { OrdersCancelComponent } from './orders-cancel/orders-cancel.component';
import { FeedbackDialogComponent } from '../../../www/pages/account/activity/feedback-dialog/feedback-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: OrdersComponent,
    children:[
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: OrdersAllComponent },
      { path: 'awaiting_pay', component: OrdersAwaitingPaymentComponent },
      { path: 'awaiting_ship', component: OrdersAwaitingShipmentComponent },
      { path: 'cancel', component: OrdersCancelComponent },
      { path: 'archive', component: OrdersArchivedComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrdersComponent,
    OrdersSidebarComponent,
    OrdersArchivedComponent,
    OrdersAllComponent,
    OrdersAwaitingPaymentComponent,
    OrdersAwaitingShipmentComponent,
    OrdersCancelComponent
  ]
})
export class OrdersModule { }
