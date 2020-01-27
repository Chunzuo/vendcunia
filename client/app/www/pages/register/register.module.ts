import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angular-6-social-login-v2';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppConfig } from '../../../config/app.config';

export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

const config: SocketIoConfig = { url: AppConfig.endpoints.ws, options: {} };

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("163812453324-2ujg6q05r77alht3m0tsqc3mej63aqts.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    SocialLoginModule,
    SocketIoModule.forRoot(config),
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [
    {provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs}
  ]
})
export class RegisterModule { }
