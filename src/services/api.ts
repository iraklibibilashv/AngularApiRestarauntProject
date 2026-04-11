import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private api: HttpClient) {}
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/';
  private authKey = '30b18ba6-b50d-45c4-a77c-e492a24f5337';
  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'X-API-KEY': this.authKey,
      ...(token && { Authorization: `Bearer ${token}` }),
    });
  }
  getAllProducts(url: string) {
    return this.api.get(this.baseUrl + url, {
      headers: this.getHeaders(),
    });
  }
  getFilter(filters: any) {
    let params = new HttpParams();
    if (filters.Query) params = params.set(`Query`, filters.Query);
    if (filters.Vegetarian) params = params.set(`Vegetarian`, filters.Vegetarian);
    if (filters.Spiciness) params = params.set(`Spiciness`, filters.Spiciness);
    if (filters.Rate) params = params.set(`Rate`, filters.Rate);
    if (filters.MinPrice) params = params.set(`MinPrice`, filters.MinPrice);
    if (filters.MaxPrice) params = params.set(`MaxPrice`, filters.MaxPrice);
    if (filters.CategoryId) params = params.set(`CategoryId`, filters.CategoryId);
    if (filters.Take) params = params.set(`Take`, filters.Take);
    if (filters.Page) params = params.set(`Page`, filters.Page)

    return this.api.get(this.baseUrl + 'products/filter', {
      headers: this.getHeaders(),
      params: params,
    });
  }
}
