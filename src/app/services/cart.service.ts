import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { CartItem } from '../models/CartItem.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:8084/cart';

  constructor(private http: HttpClient, private authService: AuthService) {}

  addToCart(product: Product): Observable<any> {
    const token = this.authService.getToken();
    const payload = {
      name: product.name,
      quantity: 1
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/add`, payload, { headers });
  }

  getCart(token: string): Observable<CartItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CartItem[]>(`${this.baseUrl}`, { headers });
  }

removeItem(itemId: number): Observable<any> {
    const token = this.authService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(`${this.baseUrl}/remove/${itemId}`, { headers });
}
increaseQuantity(email: string, productName: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/increase`, null, {
    params: { email, productName }
  });
}

decreaseQuantity(email: string, productName: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/decrease`, null, {
    params: { email, productName }
  });
}


}
