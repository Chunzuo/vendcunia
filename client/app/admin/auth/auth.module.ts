import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthRoutingModule } from './auth-routing.routing';

import { AuthComponent } from './auth.component';
import { AlertComponent } from './_directives/alert.component';

import { AuthGuard } from './_guards/auth.guard';

import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    AlertComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    MockBackend,
    BaseRequestOptions
],
})
export class AuthModule { }
