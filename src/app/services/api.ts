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
    if (filters.Vegetarian !== null && filters.Vegetarian !== undefined)
      params = params.set('Vegetarian', String(filters.Vegetarian));
    if (filters.Spiciness) params = params.set(`Spiciness`, filters.Spiciness);
    if (filters.Rate) params = params.set(`Rate`, filters.Rate);
    if (filters.MinPrice) params = params.set(`MinPrice`, filters.MinPrice);
    if (filters.MaxPrice) params = params.set(`MaxPrice`, filters.MaxPrice);
    if (filters.CategoryId) params = params.set(`CategoryId`, filters.CategoryId);
    if (filters.Take) params = params.set(`Take`, filters.Take);
    if (filters.Page) params = params.set(`Page`, filters.Page);

    return this.api.get(this.baseUrl + 'products/filter', {
      headers: this.getHeaders(),
      params: params,
    });
  }
  postLogin(userData: any) {
    return this.api.post(this.baseUrl + 'auth/login', userData, {
      headers: this.getHeaders(),
    });
  }
  postRegister(userData: any) {
    return this.api.post(this.baseUrl + 'auth/register', userData, {
      headers: this.getHeaders(),
    });
  }
  getCart() {
    return this.api.get(this.baseUrl + 'cart', {
      headers: this.getHeaders(),
    });
  }
  addToCart(productId: number, quantity: number) {
    return this.api.post(
      this.baseUrl + 'cart/add-to-cart',
      { productId, quantity },
      {
        headers: this.getHeaders(),
      },
    );
  }
  editQuantity(itemId: number, quantity: number) {
    return this.api.put(
      this.baseUrl + 'cart/edit-quantity',
      { itemId, quantity },
      {
        headers: this.getHeaders(),
      },
    );
  }
  removeFromCart(itemId: number) {
    return this.api.delete(this.baseUrl + `cart/remove-from-cart/${itemId}`, {
      headers: this.getHeaders(),
    });
  }
  checkout() {
    return this.api.post(
      this.baseUrl + 'cart/checkout',
      {},
      {
        headers: this.getHeaders(),
      },
    );
  }
  verifyEmail(body: { email: string, code: string }) {
  return this.api.put(this.baseUrl + 'auth/verify-email', body, {
    headers: this.getHeaders()
  });
}

resendVerification(email: string) {
  return this.api.post(this.baseUrl + `auth/resend-email-verification/${email}`, {}, {
    headers: this.getHeaders()
  });
}

forgotPassword(email: string) {
  return this.api.post(this.baseUrl + `auth/forgot-password/${email}`, {}, {
    headers: this.getHeaders()
  });
}

resetPassword(body: { token: string, newPassword: string }) {
  return this.api.put(this.baseUrl + 'auth/reset-password', body, {
    headers: this.getHeaders()
  });
}
editProfile(body: any) {
  return this.api.put(this.baseUrl + 'users/edit', body, {
    headers: this.getHeaders()
  });
}

changePassword(body: any) {
  return this.api.put(this.baseUrl + 'users/change-password', body, {
    headers: this.getHeaders()
  });
}

deleteAccount() {
  return this.api.delete(this.baseUrl + 'users/delete', {
    headers: this.getHeaders()
  });
}
refreshToken(token: string) {
  return this.api.post(this.baseUrl + `auth/refresh-access-token/${token}`, {}, {
    headers: this.getHeaders()
  });
}
}
