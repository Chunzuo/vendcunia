import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationCancel, NavigationEnd, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Socket } from 'ng-socket-io';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../../../theme/utils/app-validators';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';
import { MessageService } from '../../../../../shared/services/message.service';
import { ProductService } from '../../../../../shared/services/product/product.service'

@Component({
  selector: 'app-message-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {

  messageForm: FormGroup;
  isDiscountMessage: boolean;

  private sub: any;
  private messageId: number;
  private discountId: number;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productService: ProductService,
    private router: Router,
    private authService: AuthServiceApp,
    private socket: Socket,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.messageForm = this.formBuilder.group({
      to:  ['', Validators.compose([Validators.required, emailValidator])],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.isDiscountMessage = false;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.messageId = params['id'];
      this.messageService.getMessageById(this.messageId).subscribe(response => {
        if (response['success'] === 1) {
          const messageInfo = response['messageInfo'];
          this.messageForm.controls.to.setValue(messageInfo.sender_email);
          this.messageForm.controls.subject.setValue(messageInfo.title);
          this.messageForm.controls.content.setValue(messageInfo.content);

          this.discountId = messageInfo.discount_id;

          this.productService.getDiscountInfo(this.discountId).subscribe(response_1 => {
            if (response_1.status === 1) {
              if (messageInfo.title === 'Discount Offer' && response_1.discount.status === 0) {
                this.isDiscountMessage = true;
              }
            }
          });
        }
      });
    });
  }

  public onMessageFormSubmit(values): void {
    if (this.messageForm.valid) {
      const messageObj = {
        sender_email: this.authService.getEmail(),
        receiver_email: values.to,
        title: values.subject,
        content: values.content
      };
      this.socket.emit('sendEmail', messageObj);
      this.router.navigateByUrl('/account/message/sent');
    }
  }

  accept(): void {
    const msgTitle = 'Discount Offer Accepted';
    const msgContent = this.authService.getEmail() + ' has accepted your discount offer';

    this.productService.updateDiscount(this.discountId).subscribe(response => {
      if (response.status === 1) {
        this.messageService.sendMessage(
          this.authService.getEmail(),
          this.messageForm.controls.to.value,
          'accept',
          msgContent,
          this.discountId
        ).subscribe(response_1 => {
          if (response_1.status === 1) {
            this.snackBar.open('Discount offer accepted!', '×',
                  { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

            const discountInfo = {
              sender_email: this.authService.getEmail(),
              receiver_email: this.messageForm.controls.to.value,
              status: 'accept',
              discount_id: this.discountId
            };
            this.socket.emit('sendDiscountOfferHandler', discountInfo);
          } else if (response_1.status === 0) {
            this.snackBar.open('Invalid parameters!', '×',
                  { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          } else if (response_1.status === -1) {
            this.snackBar.open('Database query error occured!', '×',
                  { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          }
        });
      } else if (response.status === 0) {
        this.snackBar.open('Invalid parameters!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else if (response.status === -1) {
        this.snackBar.open('Database query error occured!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

  reject(): void {
    const msgTitle = 'Discount Offer Rejected';
    const msgContent = this.authService.getEmail() + ' has rejected your discount offer';

    this.productService.removeDiscount(this.discountId).subscribe(response => {
      if (response.status === 1) {
        this.messageService.sendMessage(
          this.authService.getEmail(),
          this.messageForm.controls.to.value,
          'reject',
          msgContent,
          this.discountId
        ).subscribe(response_1 => {
          if (response_1.status === 1) {
            this.snackBar.open('Discount offer rejected!', '×',
                  { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

            const discountInfo = {
              sender_email: this.authService.getEmail(),
              receiver_email: this.messageForm.controls.to.value,
              status: 'reject',
              discount_id: this.discountId
            };
            this.socket.emit('sendDiscountOfferHandler', discountInfo);
          } else if (response_1.status === 0) {
            this.snackBar.open('Invalid parameters!', '×',
                  { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          } else if (response_1.status === -1) {
            this.snackBar.open('Database query error occured!', '×',
                  { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          }
        });
      } else if (response.status === 0) {
        this.snackBar.open('Invalid parameters!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else if (response.status === -1) {
        this.snackBar.open('Database query error occured!', '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

}
