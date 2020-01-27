import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AuthServiceApp } from '../../../../shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
    private socket: Socket,
    private authService: AuthServiceApp,
    public snackBar: MatSnackBar
  ) {
    // this.InitializeSocketListerners();
  }

  ngOnInit() {
    // this.socket.emit('join', this.authService.getEmail());
  }

  // public InitializeSocketListerners(): void {
  //   this.socket.on('receiveEmail', (senderEmail) => {
  //     console.log('new message arrived from ' + senderEmail);
  //     this.snackBar.open(
  //       'New message arrived from ' + senderEmail, '×',
  //       { panelClass: 'success', verticalPosition: 'top', duration: 3000 }
  //     );
  //   });
  // }
}
