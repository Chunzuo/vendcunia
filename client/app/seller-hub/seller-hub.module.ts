import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerHubRoutingModule } from './seller-hub-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { AgmCoreModule } from '@agm/core';
import { TopMenuComponent } from '../theme/components/top-menu/top-menu.component';
import { MenuSellerhubComponent } from '../theme/components/menu-sellerhub/menu-sellerhub.component';
import { BreadcrumbSellerhubComponent } from '../theme/components/breadcrumb-sellerhub/breadcrumb-sellerhub.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SellerHubRoutingModule,
    SharedModule
  ],
  declarations: [
    PagesComponent,
    MenuSellerhubComponent,
    BreadcrumbSellerhubComponent,
    NotFoundComponent
  ]
})
export class SellerHubModule { }
