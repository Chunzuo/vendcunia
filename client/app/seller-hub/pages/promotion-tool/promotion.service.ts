import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { Product } from '../../../app.models';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private productUrl: string;
  private promotionUrl: string;
  private uploadFileUrl = [];

  constructor(
    private http: HttpClient
  ) {
    this.productUrl = AppConfig.endpoints.frontend + '/products';
    this.promotionUrl = AppConfig.endpoints.frontend + '/promotions';
  }

  launchOrderDiscount(object) {
    return this.http.post(this.promotionUrl + '/addOrderDiscount', JSON.stringify(object), httpOptions);
  }

  getSearchedProducts(keyword, category): Observable<Product[]> {
    return this.http.post<Product[]>(this.productUrl + '/getByTitle', {keyword: keyword, category: category}, httpOptions);
  }

  getOrderDiscountImages(): Observable<any> {
    return this.http.get(this.promotionUrl + '/getOrderDiscountImages');
  }

  pushFileToStorage(file: File, type: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    this.uploadFileUrl.push(this.promotionUrl + file.name);

    const req = new HttpRequest('POST', this.promotionUrl + '/' + type, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public launchVolumePricing(pricingObject): Observable<any> {
    return this.http.post(this.promotionUrl + '/launch_volume_pricing', JSON.stringify(pricingObject), httpOptions);
  }

  /**
   * Add by Michael
   * This function is called when seller click <select individual items> in shipDiscount page.
   * This function returns product list filtered by minimum price and quantity.
   * @param price minimum price
   * @param quantity mimimum quantity
   */
  getSelectProducts(price: Number, quantity: Number): Observable<Product[]> {
    const url = this.productUrl + '/getByMinPriceAndQuantity';
    return this.http.post<Product[]>(url, {'price': price, 'quantity': quantity}, httpOptions);
  }

  addShippingDiscount(shipDiscount) {
    return this.http.post(this.promotionUrl + '/addShipDiscount', shipDiscount, httpOptions);
  }

  getSaleEventSearchProducts(category: number, min_price: number, max_price: number, search_keyword: string,
        page_index: number, page_size: number): Observable<Product[]> {
    const url = this.productUrl + '/getBySaleEventSearch';
    return this.http.post<Product[]>(url, {
      category: category,
      min_price: min_price,
      max_price: max_price,
      search_keyword: search_keyword,
      page_index: page_index,
      page_size: page_size
    }, httpOptions);
  }

  getSaleEventImages() {
    return this.http.get(this.promotionUrl + '/getSaleEventImages');
  }

  addSaleEvent(saleEvent) {
    return this.http.post(this.promotionUrl + '/addSaleEvent', saleEvent, httpOptions);
  }
}
