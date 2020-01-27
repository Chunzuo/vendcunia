import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessageSidebarComponent } from './message-sidebar/message-sidebar.component';
import { SharedModule } from '../../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentComponent } from './sent/sent.component';
import { NewComponent } from './new/new.component';
import { ViewComponent } from './view/view.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppConfig } from '../../../../config/app.config';

export const messageRoutes = [
  {
    path: '',
    component: MessageComponent,
    children: [
      { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      { path: 'new', component: NewComponent, data: { breadcrumb: 'New' } },
      { path: 'inbox',  component: InboxComponent, data: {breadcrumb: 'Inbox'} },
      { path: 'sent', component: SentComponent, data: {breadcrumb: 'Sent'} },
      { path: ':id', component: ViewComponent, data: { breadcrumb: 'New' } }
    ]
  }
];

const config: SocketIoConfig = { url: AppConfig.endpoints.ws, options: {} };

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(messageRoutes),
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    MessageComponent,
    InboxComponent,
    MessageSidebarComponent,
    SentComponent,
    NewComponent,
    ViewComponent
  ]
})
export class MessageModule {
}
