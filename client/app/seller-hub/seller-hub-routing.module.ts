import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { LoggedInGuard } from '../shared/utils/logged-in.guard';
import { PagesComponent } from './pages/pages.component';

const sellerHubRoutes: Routes = [
  {
    path: 'sellerhub',
    component: PagesComponent, children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', loadChildren: 'app/seller-hub/pages/overview/overview.module#OverviewModule',
          data: { breadcrumb: 'Overview' }},
      { path: 'orders', loadChildren: 'app/seller-hub/pages/orders/orders.module#OrdersModule',
          data: { breadcrumb: 'Orders' }},
      { path: 'listings', loadChildren: 'app/seller-hub/pages/listings/listings.module#ListingsModule',
          data: { breadcrumb: 'Listings' } },
      { path: 'marketing', loadChildren: 'app/seller-hub/pages/marketing/marketing.module#MarketingModule',
          data: { breadcrumb: 'Marketing' }},
      { path: 'growth', loadChildren: 'app/seller-hub/pages/growth/growth.module#GrowthModule',
          data: { breadcrumb: 'Growth' }},
      { path: 'promotion', loadChildren: 'app/seller-hub/pages/promotion-tool/promotion-tool.module#PromotionToolModule',
          data: { breadcrumb: 'Promotion' }},
      { path: 'performance', loadChildren: 'app/seller-hub/pages/performance/performance.module#PerformanceModule',
          data: { breadcrumb: 'Performance' }}
    ]
  }
];

// export const SellerHubRoutingModule: ModuleWithProviders = RouterModule.forRoot(sellerHubRoutes, {
//   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
//   // useHash: true
// });

@NgModule({
  imports: [RouterModule.forChild(sellerHubRoutes)],
  exports: [RouterModule]
})
export class SellerHubRoutingModule {
}
