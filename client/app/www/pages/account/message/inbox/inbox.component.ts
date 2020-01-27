import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MessageService } from '../../../../../shared/services/message.service';
import { Message } from '../../../../../app.models';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';
import { Socket } from 'ng-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})

export class InboxComponent implements OnInit {

  curPage = 1;
  showCount = 10;
  messageList: Array<Message> = [];

  allChecked = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthServiceApp,
    private socket: Socket,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.InitializeSocketListerners();
  }

  ngOnInit() {
    this.getMessageList();
    /**
     * Add by Michael
     * about check finish bids
     */
    this.getFinalBidInfo();
  }

  public getMessageList(): void {
    const userEmail = this.authService.getEmail();

    this.messageList = Array<Message>();
    this.messageService.getMessageList({email: userEmail, type: 2}).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        response[i].checked = false;
      }
      this.messageList = response;
    });
  }

  public deleteMessage(): void {
    const arr = [];
    for (let i = 0; i < this.messageList.length; i++) {
      const msg = this.messageList[i];
      if (msg.checked) {
        arr.push(msg.id);
      }
    }

    if (arr.length === 0) {
      return;
    }

    this.messageService.deleteMessage(arr.join(',')).subscribe(response => {
      if (response['success'] === 1) {
        this.getMessageList();
      }
    });
  }

  public allCheck(): void {
    for (let i = 0; i < this.messageList.length; i++) {
      const msg = this.messageList[i];
      if (!this.allChecked) {
        msg.checked = true;
      } else {
        msg.checked = false;
      }
    }
  }

  public InitializeSocketListerners(): void {
    this.socket.on('receiveEmail', (senderEmail) => {
      this.getMessageList();
    });
  }

  onViewMessage(messageId: number): void {
    this.router.navigate(['/account/message/' + messageId]);
  }

  private getFinalBidInfo(): void {
    const thisObj = this;
    this.messageService.getFinalBids(this.authService.getUserId()).subscribe(response => {
      if (response['status'] === 1) {
        this.getMessageList();
      }
    });
  }
}
