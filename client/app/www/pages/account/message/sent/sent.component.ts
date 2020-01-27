import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MessageService } from '../../../../../shared/services/message.service';
import { Message } from '../../../../../app.models';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {
  curPage = 1;
  showCount = 10;
  messageList : Array<Message> = [];

  allChecked = false;


  constructor(private messageService: MessageService,
   private authService: AuthServiceApp) { }

  ngOnInit() {
    this.getMessageList();
  }

  public getMessageList(): void {

    const userEmail = this.authService.getEmail();

    this.messageList = Array<Message>();
    this.messageService.getMessageList({email: userEmail, type: 1}).subscribe(response => {
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
}
