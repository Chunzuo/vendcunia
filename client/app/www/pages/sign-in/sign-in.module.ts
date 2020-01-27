import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { SignInComponent } from './sign-in.component';
import { WwwModule } from '../../www.module';
// import { TopMenuComponent } from '../../../theme/components/top-menu/top-menu.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppConfig } from '../../../config/app.config';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angular-6-social-login-v2';


export const routes = [
  { path: '', component: SignInComponent, pathMatch: 'full' },
  { path: 'emailverify', component: EmailverifyComponent}
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
    SocketIoModule.forRoot(config),
    SocialLoginModule
  ],
  declarations: [
    SignInComponent,
    EmailverifyComponent
  ],
  providers: [
    {provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs}
  ]
})
export class SignInModule { }
