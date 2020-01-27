import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsComponent } from './listings.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListingsSidebarComponent } from './listings-sidebar/listings-sidebar.component';
import { ListingsActiveComponent } from './listings-active/listings-active.component';
import { ListingsDraftsComponent } from './listings-drafts/listings-drafts.component';
import { ListingsUnsoldComponent } from './listings-unsold/listings-unsold.component';
import { ListingsScheduledComponent } from './listings-scheduled/listings-scheduled.component';
import { ListingsEndedComponent } from './listings-ended/listings-ended.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { ListTemplatesComponent } from './list-templates/list-templates.component';

export const routes = [
  { path: '', component: ListingsComponent, children: [
    { path: '', redirectTo: 'active', pathMatch: 'full' },
    { path: 'active', component: ListingsActiveComponent },
    { path: 'drafts', component: ListingsDraftsComponent },
    { path: 'unsold', component: ListingsUnsoldComponent },
    { path: 'schedule', component: ListingsScheduledComponent },
    { path: 'ended', component: ListingsEndedComponent },
    { path: 'prRequest', component: ProductRequestComponent },
    { path: 'listTemplate', component: ListTemplatesComponent }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ListingsComponent,
    ListingsSidebarComponent,
    ListingsActiveComponent,
    ListingsDraftsComponent,
    ListingsUnsoldComponent,
    ListingsScheduledComponent,
    ListingsEndedComponent,
    ProductRequestComponent,
    ListTemplatesComponent
  ]
})
export class ListingsModule { }
