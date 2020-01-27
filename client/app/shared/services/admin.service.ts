import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { Observable, of, throwError as observableThrowError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminUrl: string;
  constructor(private http: HttpClient) {
    this.adminUrl = AppConfig.endpoints.frontend + '/admin';
  }

  getUserList(userEmail: string): Observable<any[]> {
    return this.http.post<any[]>(this.adminUrl + '/get_user_list', {email: userEmail}, httpOptions);
  }

  getIpList(userEmail: string): Observable<any[]> {
    return this.http.post<any[]>(this.adminUrl + '/get_ip_list', {email: userEmail}, httpOptions);
  }

  getFeedbackList(userEmail: string): Observable<any[]> {
    return this.http.post<any[]>(this.adminUrl + '/get_feedback_list', {email: userEmail}, httpOptions);
  }

  getProductList(userEmail: string): Observable<any[]> {
    return this.http.post<any[]>(this.adminUrl + '/get_product_list', {email: userEmail}, httpOptions);
  }

  getSalePurchaseHistoryList(userEmail: string): Observable<any[]> {
    return this.http.post<any[]>(this.adminUrl + '/get_sales_purchase_history_list', {email: userEmail}, httpOptions);
  }
}
