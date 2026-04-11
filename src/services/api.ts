import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private api : HttpClient){}
  private baseUrl = "https://restaurantapi.stepacademy.ge/api/"
  private authKey = "30b18ba6-b50d-45c4-a77c-e492a24f5337"
getHeaders(){
  const token = localStorage.getItem('token')
  return new HttpHeaders({
    'X-API-KEY' : this.authKey,
    ...(token && {'Authorization' : `Bearer ${token}`})
});
}
  getAllProducts(url : string){
    return this.api.get(this.baseUrl + url, {
      headers: this.getHeaders(),
    })
  }
}
