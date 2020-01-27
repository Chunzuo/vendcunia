import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { ActivitySummaryComponent } from './activity-summary/activity-summary.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ActivityBidsOffersComponent } from './activity-bids-offers/activity-bids-offers.component';
import { ActivityWatchingComponent } from './activity-watching/activity-watching.component';
import { ActivityDialogWatchlistComponent } from './activity-dialog-watchlist/activity-dialog-watchlist.component';
import { AccountRecentlyReviewdComponent } from './account-recently-reviewd/account-recently-reviewd.component';
import { ActivityPurchaseHistoryComponent } from './activity-purchase-history/activity-purchase-history.component';
import { ActivitySidebarComponent } from './activity-sidebar/activity-sidebar.component';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const activityRoutes = [
  {
    path: '',
    component: ActivityComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary',  component: ActivitySummaryComponent, data: {breadcrumb: 'Summary'}},
      { path: 'bid_offer',  component: ActivityBidsOffersComponent , data: {breadcrumb: 'Bids/Offers'}},
      { path: 'watching',  component: ActivityWatchingComponent , data: {breadcrumb: 'Watching'}},
      { path: 'recently_viewed',  component: AccountRecentlyReviewdComponent , data: {breadcrumb: 'Recently Viewed'}},
      { path: 'purchase_history',  component: ActivityPurchaseHistoryComponent , data: {breadcrumb: 'Purchase history'}}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(activityRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ActivityComponent, ActivitySummaryComponent, ActivityBidsOffersComponent,
    ActivityWatchingComponent, ActivityDialogWatchlistComponent, AccountRecentlyReviewdComponent,
    ActivityPurchaseHistoryComponent, ActivitySidebarComponent],
  entryComponents: [ActivityDialogWatchlistComponent]
})
export class ActivityModule { }
