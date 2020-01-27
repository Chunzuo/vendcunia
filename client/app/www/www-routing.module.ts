import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { LoggedInGuard } from '../shared/utils/logged-in.guard';
import { CreateListingsComponent } from './pages/create-listings/create-listings.component';

const wwwRoutes : Routes = [
  { 
    path: '', 
    component: PagesComponent, children: [
        { path: '', loadChildren: 'app/www/pages/home/home.module#HomeModule' },
        { path: 'account', loadChildren: 'app/www/pages/account/account.module#AccountModule', data: { breadcrumb: 'Account Settings' } },
        { path: 'compare', loadChildren: 'app/www/pages/compare/compare.module#CompareModule', data: { breadcrumb: 'Compare' } },
        { path: 'wishlist', loadChildren: 'app/www/pages/wishlist/wishlist.module#WishlistModule', data: { breadcrumb: 'Wishlist' } },
        { path: 'cart', loadChildren: 'app/www/pages/cart/cart.module#CartModule', data: { breadcrumb: 'Cart' } },
        { path: 'checkout', loadChildren: 'app/www/pages/checkout/checkout.module#CheckoutModule', data: { breadcrumb: 'Checkout' } },
        { path: 'contact', loadChildren: 'app/www/pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Contact' } },
        { path: 'sign-in', loadChildren: 'app/www/pages/sign-in/sign-in.module#SignInModule', data: { breadcrumb: 'Sign In ' } },
        { path: 'register', loadChildren: 'app/www/pages/register/register.module#RegisterModule', data: { breadcrumb: 'Register ' } },
        { path: 'brands', loadChildren: 'app/www/pages/brands/brands.module#BrandsModule', data: { breadcrumb: 'Brands' } },
        { path: 'products', loadChildren: 'app/www/pages/products/products.module#ProductsModule' },
        { path: 'verify', loadChildren: 'app/www/pages/verify/verify.module#VerifyModule' },
        {
          path: 'create-product',
          loadChildren: 'app/www/pages/create-product/create-product.module#CreateProductModule',
          data: { breadcrumb: 'Create Product' },
          canActivate: [ LoggedInGuard ]
        },
        {
          path: 'create-listings',
          component: CreateListingsComponent,
          canActivate: [LoggedInGuard]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(wwwRoutes)],
  exports: [RouterModule]
})
export class WwwRoutingModule {
}
