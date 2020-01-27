import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingComponent } from './marketing.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MarketingSidebarComponent } from './listings-sidebar/listings-sidebar.component';
import { MarketingBodyComponent } from './marketing-body/marketing-body.component';
import { MarketingStoreComponent } from './marketing-store/marketing-store.component';
import { MarketingStoreselComponent } from './marketing-storesel/marketing-storesel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketingManagepromotionComponent } from './marketing-managepromotion/marketing-managepromotion.component';
import { ChartsModule } from 'ng2-charts';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MarketingDialogComponent } from './marketing-dialog/marketing-dialog.component';
import { MarketingService } from './marketing.service';

export const routes = [
  { path: '', component: MarketingComponent,children: [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'summary', component: MarketingBodyComponent, data: { breadcrumb: 'Summary' }},
  { path: 'store', component: MarketingStoreComponent },
  { path: 'store_sel', component: MarketingStoreselComponent },
  { path: 'manage_promotion', component: MarketingManagepromotionComponent, data: { breadcrumb: 'Promotion' } }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule
  ],
  declarations: [MarketingComponent, MarketingSidebarComponent, MarketingBodyComponent, MarketingStoreComponent, MarketingStoreselComponent, MarketingManagepromotionComponent, MarketingDialogComponent],
  entryComponents: [MarketingDialogComponent],
  providers: [
    MarketingService
  ]
})
export class MarketingModule { }
