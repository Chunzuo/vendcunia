import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './theme/layout/layout.module';

import { ThemeComponent } from './theme/theme.component';
import { LogoutComponent } from './auth/logout/logout.component';

import { AUTH_PROVIDERS, AuthServiceApp } from '../shared/services/auth/auth.service';
import { ScriptLoaderService } from '../shared/services/script-loader.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ThemeRoutingModule,
    SharedModule,
    AuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3HQ_Gk_XRt6KitPdiHQNGpVn0NDwQGMI'
    }),
    LayoutModule
  ],
  declarations: [
    ThemeComponent,
    LogoutComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthServiceApp,
    ScriptLoaderService
  ]
})
export class AdminModule {
}
