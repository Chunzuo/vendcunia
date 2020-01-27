import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderDiscountComponent } from './order-discount/order-discount.component';
import { SharedModule } from '../../../shared/shared.module';
import { SaleEventComponent } from './sale-event/sale-event.component';
import { DiscountLevelComponent } from './sale-event/discount-level/discount-level.component';
import { VolumePricingComponent } from './volume-pricing/volume-pricing.component';
import { ShippingDiscountComponent } from './shipping-discount/shipping-discount.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodelessCouponComponent } from './codeless-coupon/codeless-coupon.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgxUploaderModule } from 'ngx-uploader';
import { SelectShippingProductsComponent } from './shipping-discount/select-shipping-products/select-shipping-products.component';

export const routes = [
  { path: '',
    children: [
      { path: '', redirectTo: 'shipDiscount', pathMatch: 'full' },
      { path: 'orderDiscount', component: OrderDiscountComponent},
      { path: 'saleEvent', component: SaleEventComponent },
      { path: 'volumePrice', component: VolumePricingComponent },
      { path: 'shipDiscount', component: ShippingDiscountComponent },
      { path: 'codeless', component: CodelessCouponComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    NgxUploaderModule
  ],
  declarations: [
    OrderDiscountComponent,
    SaleEventComponent,
    DiscountLevelComponent,
    VolumePricingComponent,
    ShippingDiscountComponent,
    SidebarComponent,
    CodelessCouponComponent,
    SelectShippingProductsComponent
  ],
  entryComponents: [
    SelectShippingProductsComponent
  ]
})
export class PromotionToolModule { }
