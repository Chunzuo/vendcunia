import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { Socket } from 'ng-socket-io';

import request from '../../utils/request';

import { AppConfig } from '../../../config/app.config';
import { Order, Product, Bid, Category } from '../../../app.models';

import { OrdersAllComponent } from '../../../seller-hub/pages/orders/orders-all/orders-all.component';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = AppConfig.endpoints.frontend + '/products';
  private buyProductAPI = AppConfig.endpoints.frontend + '/products/purchase';
  private uploadFileUrl = [];
  private colorUrl = AppConfig.endpoints.frontend + '/colors';

  public cartList = [];
  public cartTotalPrice: number;

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) {
    this.cartTotalPrice = 0;
  }

  getList(): Observable<Product[]> {
    return this.http.post<Product[]>(this.productUrl + '/list', {}, httpOptions);
  }

  getByType(type: Number): Observable<Product[]> {
    return this.http.post<Product[]>(this.productUrl + '/list', JSON.stringify({featured: 1}), httpOptions);
  }

  getCategoryList(parentId: Number): Observable<Category[]> {
    return this.http.post<Category[]>(this.productUrl + '/categorylist', JSON.stringify({parent_id: parentId}), httpOptions);
  }

  getProductById(id, userId): Observable<any> {
    return this.http.post(this.productUrl + '/load', JSON.stringify({user_id: userId, id: id}), httpOptions);
  }

  getRelatedProducts(categoryID) {
    return this.http.post(this.productUrl + '/list', JSON.stringify({category_id: categoryID, limit: 4}), httpOptions);
  }

  create(productInfo) {
    return this.http.post(this.productUrl + '/create', productInfo, httpOptions);
  }

  buyProduct(userId, productId, quantity) {
    const sendData = new URLSearchParams();
    sendData.append('user_id', userId);
    sendData.append('product_id', productId);
    sendData.append('quantity', quantity);
    return request({
      url: this.buyProductAPI,
      method: 'post',
      data: sendData
    });
  }

  bidProduct(productId, cost, userId): Observable<any> {
    return this.http.post(this.productUrl + '/bid', JSON.stringify({price: cost, id: productId, buyerId: userId}), httpOptions);
  }

  offerDiscount(offerObject) {
    return this.http.post(this.productUrl + '/discount', JSON.stringify(offerObject), httpOptions);
  }

  sendReview(reviewObject) {
    return this.http.post(this.productUrl + '/review', JSON.stringify(reviewObject), httpOptions);
  }

  getReviews(id) {
    return this.http.post(this.productUrl + '/getReviews', JSON.stringify({product_id: id}), httpOptions);
  }

  getBidder(id) {
    return this.http.post(this.productUrl + '/getBidder', JSON.stringify({id: id}), httpOptions);
  }

  getRecentlyViewedProduct(userId) {
    return this.http.post(this.productUrl + '/getRecentlyViewedProduct', JSON.stringify({id: userId}), httpOptions);
  }

  getProductsByCategory(categoryId: Number): Observable<Product[]> {
    return this.http.post<Product[]>(this.productUrl + '/getByCategory', JSON.stringify({category_id: categoryId}), httpOptions);
  }

  getProductFeedback(id) {
    return this.http.post(this.productUrl + '/feedback', JSON.stringify({id: id}), httpOptions);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    this.uploadFileUrl.push(this.productUrl + file.name);

    const req = new HttpRequest('POST', this.productUrl + '/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.productUrl + '/all');
  }

  getDrafts(userId) {
    return this.http.post(this.productUrl + '/drafts', {userId: userId}, httpOptions);
  }

  getTemplateDetail(templateId) {
    return this.http.post(this.productUrl + '/detail', {id: templateId}, httpOptions);
  }

  deleteTemplate(templateId) {
    return this.http.delete(this.productUrl + '/' + templateId);
  }

  addToCompare(userId, productId) {
    return this.http.post(this.productUrl + '/addCompare',
      JSON.stringify({ user_id: userId, product_id: productId }),
      httpOptions);
  }

  addToWishList(userId, productId) {
    return this.http.post(this.productUrl + '/addWishList',
      JSON.stringify({ user_id: userId, product_id: productId }),
      httpOptions);
  }

  addToCart(userId, productId, quantity, price) {
    return this.http.post(this.productUrl + '/addCart',
      JSON.stringify({ user_id: userId, product_id: productId, quantity: quantity, price: price }),
      httpOptions);
  }

  /**
   * Add by Michael
   */
  getCarts(userId) {
    return this.http.post(this.productUrl + '/getCart', {id: userId}, httpOptions);
  }

  removeCart(cartId) {
    return this.http.post(this.productUrl + '/removeCart', {id: cartId}, httpOptions);
  }

  clearCart(userId) {
    return this.http.post(this.productUrl + '/clearCart', {id: userId}, httpOptions);
  }

  placeOrder(orderData) {
    return this.http.post(this.productUrl + '/placeOrder',
      JSON.stringify({
        user_id: orderData.user_id,
        product_id: orderData.product_id,
        quantity: orderData.quantity,
        ordering_price: orderData.ordering_price,
        first_name: orderData.first_name,
        last_name: orderData.last_name,
        middle_name: orderData.middle_name,
        company: orderData.company,
        email: orderData.email,
        phone: orderData.phone,
        country: orderData.country,
        city: orderData.city,
        province: orderData.province,
        zip_code: orderData.zip_code,
        address: orderData.address,
        delivery_method: orderData.delivery_method,
        status: 5     // 1 => created, 2 => cancelled, 3 => awaiting payment, 4 => paid,
                      // 5 => awaiting shipment, 6 => shipping in progress, 7 => shipped, 8 => shipped and paid, 9 => completed
      }),
      httpOptions);
  }

  public getCompareCount() {
    const compareCount = sessionStorage.getItem('compare_count');
    if (!compareCount) {
        return 0;
    }
    return parseInt(compareCount, 10);
  }

  public getWishListCount() {
    const wishListCount = sessionStorage.getItem('wish_list_count');
    if (!wishListCount) {
        return 0;
    }
    return parseInt(wishListCount, 10);
  }

  public getCartCount() {
    const cartCount = sessionStorage.getItem('cart_count');
    if (!cartCount) {
        return 0;
    }
    return parseInt(cartCount, 10);
  }

  public getCartList() {
    return this.cartList;
  }

  public getCartTotalPrice(): string {
    const cartTotalPrice = sessionStorage.getItem('cart_total_price');
    if (!cartTotalPrice) {
        return '0';
    }
    return cartTotalPrice;
  }

  public setCartList(cartList): void {
    this.cartList = cartList;
  }

  public getColors() {
    return this.http.get(this.colorUrl);
  }

  public getImages(productId) {
    return this.http.post(this.productUrl + '/getImages', { id: productId }, httpOptions);
  }

  public update(productInfo) {
    return this.http.put(this.productUrl, productInfo, httpOptions);
  }
  
  public removeDiscount(discountId): Observable<any> {
    return this.http.post(this.productUrl + '/removeDiscount', { discount_id: discountId }, httpOptions);
  }

  public updateDiscount(discountId): Observable<any> {
    return this.http.post(this.productUrl + '/updateDiscount', { discount_id: discountId }, httpOptions);
  }

  public getDiscountInfo(discountId): Observable<any> {
    return this.http.post(this.productUrl + '/getDiscount', { discount_id: discountId }, httpOptions);
  }

  public getOrderList(type: number, userId: number): Observable<Order[]> {
    return this.http.post<Order[]>(this.productUrl + '/getOrderList', { type: type, userId: userId }, httpOptions);
  }

}
