import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppConfig } from './config/app.config';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
    { path: AppConfig.routes.admin, loadChildren: './admin/admin.module#AdminModule' },
    { path: AppConfig.routes.www, loadChildren: './www/www.module#WwwModule' },
    { path: AppConfig.routes.sellerHub, loadChildren: './seller-hub/seller-hub.module#SellerHubModule', data: { breadcrumb: 'Sellerhub' } },
    { path: '**', component: NotFoundComponent },
    { path: AppConfig.routes.error404, component: NotFoundComponent }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});
