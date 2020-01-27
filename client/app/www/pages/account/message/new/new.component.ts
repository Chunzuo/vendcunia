import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';
import { MessageService } from '../../../../../shared/services/message.service';
import { Router } from '@angular/router';
import { Socket } from 'ng-socket-io';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

  messageForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private messageServie: MessageService,
    private router: Router,
    private authService: AuthServiceApp,
    private socket: Socket
  ) {
    this.messageForm = this.formBuilder.group({
      to:  ['', Validators.compose([Validators.required, emailValidator])],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onMessageFormSubmit(values): void {
    if (this.messageForm.valid) {
      // const messageObj = values;
      // messageObj['userId'] = this.authService.getUserId();
      const messageObj = {
        sender_email: this.authService.getEmail(),
        receiver_email: values.to,
        title: values.subject,
        content: values.content
      };
      this.socket.emit('sendEmail', messageObj);
      this.router.navigateByUrl('/account/message/sent');
      // this.messageServie.sendMessage(messageObj).subscribe(response => {
      //   if (response['success'] === 1) {
      //     this.router.navigateByUrl('/account/message/sent');
      //   }
      // });

    }
  }

}
