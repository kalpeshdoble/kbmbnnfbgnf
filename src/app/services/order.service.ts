import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8085/order';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`
      })
    };
  }

  // ✅ Get all orders for logged-in user
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user`, this.getAuthHeaders());
  }

  // ✅ Get order by ID
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`, this.getAuthHeaders());
  }

  // ✅ Place order using Cart (Cash On Delivery)
  placeOrderCOD(): Observable<any> {
    return this.http.post(`${this.baseUrl}/place-from-cart/cod`, {}, this.getAuthHeaders());
  }

  // ✅ Place order using Wallet
  placeOrderWallet(): Observable<any> {
    return this.http.post(`${this.baseUrl}/place-from-cart/wallet`, {}, this.getAuthHeaders());
  }

  // ✅ Cancel an order by ID (optional)
  cancelOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cancel/${orderId}`, this.getAuthHeaders());
  }
}
