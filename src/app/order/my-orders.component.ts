import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth';
import { Order } from '../models/order.model';;
import { CommonModule } from '@angular/common';
@Component({
    //standalone:false,
     imports: [CommonModule], 
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (res) => this.orders = res,
      error: (err) => console.error('Failed to fetch orders', err)
    });
  }
}
