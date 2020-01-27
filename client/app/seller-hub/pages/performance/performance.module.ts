import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance.component';
import { PerformanceSidebarComponent } from './performance-sidebar/performance-sidebar.component';
import { PerformanceSummaryComponent } from './performance-summary/performance-summary.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { PerformanceImpressionComponent } from './performance-impression/performance-impression.component';
import { PerformanceSalesComponent } from './performance-sales/performance-sales.component';
import { PerformanceSellingCostComponent } from './performance-selling-cost/performance-selling-cost.component';
import { PerformanceTrafficComponent } from './performance-traffic/performance-traffic.component';

export const routes = [
  { path: '', component: PerformanceComponent, children: [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'summary', component: PerformanceSummaryComponent, data: { breadcrumb: 'Summary' }},
  { path: 'impression', component: PerformanceImpressionComponent, data: { breadcrumb: 'Impression' }},
  { path: 'sales', component: PerformanceSalesComponent, data: { breadcrumb: 'Sales' }},
  { path: 'sellingcost', component: PerformanceSellingCostComponent, data: { breadcrumb: 'SellingCost' }},
  { path: 'traffic', component: PerformanceTrafficComponent, data: { breadcrumb: 'Traffic' }}
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChartsModule
  ],
  declarations: [PerformanceComponent, PerformanceSidebarComponent, PerformanceSummaryComponent, PerformanceImpressionComponent, PerformanceSalesComponent, PerformanceSellingCostComponent, PerformanceTrafficComponent]
})
export class PerformanceModule { }
