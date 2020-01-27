import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductConditionService {
  product_condition_url: string;

  constructor(
    private http: HttpClient
  ) {
    this.product_condition_url = AppConfig.endpoints.frontend + '/productConditions';
  }

  getList() {
    return this.http.get(this.product_condition_url);
  }
}
