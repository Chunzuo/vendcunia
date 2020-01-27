import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable, of, throwError as observableThrowError } from 'rxjs';

import { AppConfig } from '../../../config/app.config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getBalanceAPI = AppConfig.endpoints.frontend + '/users/get_balance';
  private getEmailByIdAPI = AppConfig.endpoints.frontend + '/users/get_email_by_id';

  constructor(private http: HttpClient) {
  }

  getBalance(email: string): Observable<any> {
    return this.http.post(this.getBalanceAPI, { email: email }, httpOptions);
  }

  getEmailById(id: number): Observable<any> {
    return this.http.post(this.getEmailByIdAPI, { id: id }, httpOptions);
  }

}
