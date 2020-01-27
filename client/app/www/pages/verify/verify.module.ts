import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { VerifyComponent } from './verify.component';
import { WwwModule } from '../../www.module';
// import { TopMenuComponent } from '../../../theme/components/top-menu/top-menu.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppConfig } from '../../../config/app.config';
import { InputcodeComponent } from './inputcode/inputcode.component';


export const routes = [
  { path: '', component: VerifyComponent, pathMatch: 'full' },
  { path: 'inputcode', component:InputcodeComponent}
];
const config: SocketIoConfig = { url: AppConfig.endpoints.ws, options: {} };

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    VerifyComponent,
    InputcodeComponent
  ]
})
export class VerifyModule { }
