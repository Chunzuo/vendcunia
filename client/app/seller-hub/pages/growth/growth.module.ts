import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowthComponent } from './growth.component';

import { RouterModule } from '@angular/router';
import { GrowthSidebarComponent } from './growth-sidebar/growth-sidebar.component';
import { GrowthImprovementsComponent } from './growth-improvements/growth-improvements.component';
import { GrowthSourceComponent } from './growth-source/growth-source.component';
import { GrowthStockComponent } from './growth-stock/growth-stock.component';
import { SharedModule } from '../../../shared/shared.module';

export const routes = [
  { path: '', component: GrowthComponent, children: [
    { path: '', redirectTo: 'improvement', pathMatch: 'full' },
    { path: 'improvement', component: GrowthImprovementsComponent },
    { path: 'sourcing', component: GrowthSourceComponent },
    { path: 'stock', component: GrowthStockComponent }
   ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [GrowthComponent, GrowthSidebarComponent, GrowthImprovementsComponent, GrowthSourceComponent, GrowthStockComponent]
})
export class GrowthModule { }
