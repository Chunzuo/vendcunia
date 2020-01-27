import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { OverviewComponent } from './overview.component';
import { SharedModule } from '../../../shared/shared.module';
import { TasksComponent } from './tasks/tasks.component';
import { SalesComponent } from './sales/sales.component';
import { OrdersComponent } from './orders/orders.component';
import { ListingsComponent } from './listings/listings.component';
import { TrafficComponent } from './traffic/traffic.component';
import { GrowthComponent } from './growth/growth.component';
import { StatModule } from '../../../shared/components/stat/stat.module';


export const routes = [
  { path: '', component: OverviewComponent, pathMatch: 'full'  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    RouterModule.forChild(routes),
    StatModule
  ],
  declarations: [
    OverviewComponent,
    TasksComponent,
    SalesComponent,
    OrdersComponent,
    ListingsComponent,
    TrafficComponent,
    GrowthComponent
  ]
})
export class OverviewModule { }
