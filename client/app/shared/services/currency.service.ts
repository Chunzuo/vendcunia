import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  url: string;
  public currency: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = AppConfig.endpoints.frontend + '/currencies';
  }

  public getList() {
    return this.http.get(this.url);
  }

  public getCurrency(id) {
    return this.http.get(this.url + '/' + id);
  }
}
