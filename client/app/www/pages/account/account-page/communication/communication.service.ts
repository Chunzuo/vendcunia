import { Injectable } from '@angular/core';
import { AppConfig } from '../../../../../config/app.config';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthServiceApp } from '../../../../../shared/services/auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private sendContactAPI = AppConfig.endpoints.frontend + '/contacts/send';
  private incomingContactAPI = AppConfig.endpoints.frontend + '/contacts/incoming';

  constructor(public router: Router,
              private http: HttpClient,
              private authService: AuthServiceApp) {
  }

  sendContact(email) {
    const contactInfo = {
      sender_email: this.authService.getEmail(),
      receiver_email: email
    };
  return this.http.post(this.sendContactAPI, JSON.stringify(contactInfo), httpOptions);
  }

  getIncomingContacts(id) {
    return this.http.post(this.incomingContactAPI, {receiver_id: id}, httpOptions);
  }

  accetpIncoming(id) {
    return this.http.post(this.incomingContactAPI + '/accept', {id: id}, httpOptions);
  }

  receptIncoming(id) {
    return this.http.post(this.incomingContactAPI + '/reject', {id: id}, httpOptions);
  }
}
