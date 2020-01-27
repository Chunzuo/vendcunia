import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { WwwRoutingModule } from './www-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages/pages.component';
import { TopMenuComponent } from '../theme/components/top-menu/top-menu.component';
import { MenuComponent } from '../theme/components/menu/menu.component';
import { MenuAccountComponent } from '../theme/components/menu-account/menu-account.component';
import { SidenavMenuComponent } from '../theme/components/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { OptionsComponent } from '../theme/components/options/options.component';
import { FooterComponent } from '../theme/components/footer/footer.component';

import { LoggedInGuard } from '../shared/utils/logged-in.guard';
import { AUTH_PROVIDERS, AuthServiceApp } from '../shared/services/auth/auth.service';
import { CreateListingsComponent } from './pages/create-listings/create-listings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WwwRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3HQ_Gk_XRt6KitPdiHQNGpVn0NDwQGMI'
    }),
    SharedModule
  ],
  declarations: [
    PagesComponent,
    TopMenuComponent,
    MenuComponent,
    MenuAccountComponent,
    SidenavMenuComponent,
    BreadcrumbComponent,
    OptionsComponent,
    FooterComponent,
    CreateListingsComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard,
    AuthServiceApp
  ],
  entryComponents: [
    TopMenuComponent
  ]
})
export class WwwModule { }
