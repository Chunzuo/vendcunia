import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { AppConfig } from '../../config/app.config';
import request from '../utils/request';
import { Order, Product, Bid } from '../../app.models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SellerHubService {

  sellerHubUrl: string;
  constructor(private http: HttpClient) {
    this.sellerHubUrl = AppConfig.endpoints.frontend + '/seller_hub';
  }

  public getOverViewInfo(userId: number) {
    return this.http.post(this.sellerHubUrl + '/get_overview_info', { userId: userId }, httpOptions);
  }

  public getSalesStatisticsInfo(userId: number) {
    return this.http.post(this.sellerHubUrl + '/get_sales_statistics_info', { userId: userId }, httpOptions);
  }

  public getSalesGraphInfo(userId: number, year: number) {
    return this.http.post(this.sellerHubUrl + '/get_sales_graph_info', { userId: userId, year: year }, httpOptions);
  }

  public getOrderList(type: number, userId: number): Observable<Order[]> {
    return this.http.post<Order[]>(this.sellerHubUrl + '/get_order_list', { type: type, userId: userId }, httpOptions);
  }

  public updateOrderStatus(orderId: number, status: number) {
    return this.http.post(this.sellerHubUrl + '/update_order_status', { orderId: orderId, status: status }, httpOptions);
  }

  public getActiveProductList(userId: number): Observable<Product[]> {
    return this.http.post<Product[]>(this.sellerHubUrl + '/get_active_product', { userId: userId }, httpOptions);
  }

  public getUnsoldProductList(userId: number): Observable<Product[]> {
    return this.http.post<Product[]>(this.sellerHubUrl + '/get_unsold_product', { userId: userId }, httpOptions);
  }

  public getPrivateProductList(userId: number): Observable<Product[]> {
    return this.http.post<Product[]>(this.sellerHubUrl + '/get_private_product', { userId: userId }, httpOptions);
  }

  public updateOrderList(userId: number, productId: number): Observable<Product[]> {
    return this.http.post<Product[]>(this.sellerHubUrl + '/update_order', { userId: userId, productId: productId }, httpOptions);
  }

  public updateOrderFeedback(userId: number, productId: number, feedback: string): Observable<Product[]> {
    return this.http.post<Product[]>(this.sellerHubUrl + '/update_order_feedback',
      { userId: userId, productId: productId, feedback: feedback }, httpOptions);
  }

  public remainOrderFeedback(orderId: number, userId: number, type: number, content: string, rating: number) {
    return this.http.post<Product[]>(this.sellerHubUrl + '/remain_order_feedback',
      { orderId: orderId, userId: userId, type: type, content: content, rating: rating }, httpOptions); 
  }

  public getFeedback(userId: number, type: number) {
    return this.http.post<Product[]>(this.sellerHubUrl + '/get_feedback',
      { userId: userId, type: type }, httpOptions);
  }

  public getBidList(userId): Observable<Bid[]> {
    return this.http.post<Bid[]>(this.sellerHubUrl + '/bid_list', { userId: userId }, httpOptions);
  }

}
