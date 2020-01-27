import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';

import { ChatAdapter, User, Message, UserStatus, IChatController } from 'ng-chat';

import { SocketIOAdapter } from '../../../../../shared/utils/socketio-adapter';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';
import { CommunicationService } from './communication.service';
import { emailValidator } from '../../../../../theme/utils/app-validators';
import { Socket } from 'ng-socket-io';
import { ChatAcceptDialogComponent } from '../../../../../shared/components/chat-accept-dialog/chat-accept-dialog.component';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

  @ViewChild('ngChatInstance') ngChatInstance: IChatController;

  contactForm: FormGroup;
  userId: string;
  username: string;
  chatWindowTitle: string;

  public adapter: ChatAdapter;
  public incomingContacts: any;

  constructor(public formBuilder: FormBuilder,
              private socket: Socket,
              private http: Http,
              private snackBar: MatSnackBar,
              private authService: AuthServiceApp,
              private communicationService: CommunicationService,
              public dialog: MatDialog) {
    this.chatWindowTitle = 'Live Chat';
    this.userId = '';
    this.InitializeSocketListeners();
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])]
    });

    this.socket.emit('join', this.authService.getEmail());
    this.getIncomingContacts();
    /*const dialogRef = this.dialog.open(ChatAcceptDialogComponent, {
      width: '250px',
      data: 'accept'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        console.log('accept');
      } else {
        console.log('reject');
      }
    });*/
  }

  public InitializeSocketListeners(): void {
    this.adapter = new SocketIOAdapter('', this.socket, this.http, this.authService);

    this.socket.on('generatedUserId', (userId) => {
      this.userId = userId;
    });

    this.socket.on('friendsListChanged', (usersCollection: Array<User>) => {
      // this function changed by Michael.
    });

    this.socket.on('contactReceived', (response) => {
      this.getIncomingContacts();
    });
  }

  public onContactFormSubmit(values: Object): void {
    if (this.contactForm.valid) {
      this.communicationService.sendContact(this.contactForm.controls.email.value)
        .subscribe(response => {
          const status = response['success'];
          const msg = response['msg'];

          if (status === 1) {
            this.snackBar.open('Contact successfully sent!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.socket.emit('sendContact', {
              email: this.authService.getEmail(),
              receiver_email: this.contactForm.controls.email.value
            });
          } else if (status === 0) {
            this.snackBar.open('Please input valid email address!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (status === -1) {
            this.snackBar.open('No user exist for your email address!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (status === -2) {
            this.snackBar.open('No user exist for the contact email address!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (status === -3) {
            this.snackBar.open('Contact request for the contact email address has already been sent!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else if (status === -4) {
            this.snackBar.open('Failed to sent contact request!', '×',
              { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        });
    }
  }

  public onChatUserClicked(user: User): void {
    console.log('onChatUserClicked, user info : ' + JSON.stringify(user));
  }

  /**
   * Add by Michael
   */
  public acceptIncoming(contactId: number): void {
    const thisObj = this;
    this.communicationService.accetpIncoming(contactId)
      .subscribe(response => {
        if (response['status'] === 1) {
          this.socket.emit('join', thisObj.authService.getEmail());
          thisObj.getIncomingContacts();
        }
      });
  }

  public rejectIncoming(contactId: number): void {
    const thisObj = this;
    this.communicationService.receptIncoming(contactId)
      .subscribe(response => {
        if (response['status'] === 1) {
          this.socket.emit('join', thisObj.authService.getEmail());
          thisObj.getIncomingContacts();
        }
      });
  }

  private getIncomingContacts(): void {
    this.communicationService.getIncomingContacts(this.authService.getUserId())
      .subscribe(response => {
        this.incomingContacts = response;
      });
  }
}
