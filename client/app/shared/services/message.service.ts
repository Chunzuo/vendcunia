import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { AppConfig } from '../../config/app.config';
import request from '../utils/request';
import { Message } from '../../app.models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
      this.url = AppConfig.endpoints.frontend + '/message';
  }

  public getMessageList(param: any): Observable<Message[]> {
    //type 1:sent, 2:receive
    return this.http.post<Message[]>(this.url + '/list', param, httpOptions);
  }

  public deleteMessage(ids: string) {
    return this.http.post(this.url + '/delete', { ids: ids }, httpOptions);
  }

  public sendMessage(sender_email: string, receiver_email: string, title: string, content: string, discountId: number): Observable<any> {
    return this.http.post(this.url + '/send',
      { 
        sender_email: sender_email,
        receiver_email: receiver_email,
        title: title,
        content: content,
        discount_id: discountId
      },
      httpOptions);
  }

  public getMessageById(messageId): Observable<any> {
    return this.http.post<Message[]>(this.url + '/get_message_by_id', { messageId: messageId }, httpOptions);
  }

  /**
   * Add by Michael
   */
  public getFinalBids(userId) {
    return this.http.post(this.url + '/bids', {userId}, httpOptions);
  }
}
