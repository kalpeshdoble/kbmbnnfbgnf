import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/CartItem.model';
import { AuthService } from '../services/auth';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AddressService } from '../services/address.service';
@Component({
  standalone:false,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private http: HttpClient,private router: Router, private addressService: AddressService)  {}

  ngOnInit(): void {
    this.loadCart();
  }

 loadCart(): void {
  const token = this.authService.getToken();
  if (!token) {
    console.error('No token');
    return;
  }

 this.cartService.getCart(token).subscribe({
  next: (items) => {
    this.cartItems = items;
    this.total = items.reduce((sum, item) => sum + (item.quantity * item.priceSnapshot), 0);

    // Fetch image for each product
    this.cartItems.forEach(item => {
     this.http.get<Product>(`http://localhost:8082/product/searchbyname?name=${item.productName}`)
  .subscribe({
    next: (product: Product) => {
      item.imgUrl = product.imgUrl || 'https://via.placeholder.com/100';
    },
    error: () => {
      item.imgUrl = 'https://via.placeholder.com/100';
    }
  });
    });
  },
  error: (err) => {
    console.error('Error loading cart:', err);
  }
});

}


  
  removeFromCart(itemId: number): void {
  this.cartService.removeItem(itemId).subscribe({
    next: (res) => {
      console.log(res.message);  // ✅ should show "Item removed successfully"
      this.loadCart();
    },
    error: (error) => {
      console.error('Error removing item from cart:', error);
    }
  });
}
increase(item: CartItem): void {
  this.cartService.increaseQuantity(item.userEmail, item.productName).subscribe({
    next: (res) => {
      console.log("Increased:", res);
      this.loadCart();
    },
    error: (err) => {
      console.error("Error increasing quantity:", err);
    }
  });
}

getTotalQuantity(): number {
  return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
}


decrease(item: CartItem): void {
  this.cartService.decreaseQuantity(item.userEmail, item.productName).subscribe({
    next: (res) => {
      if (res.message) {
        console.log(res.message);  // "Item removed from cart."
      } else {
        console.log("Decreased:", res);
      }
      this.loadCart();
    },
    error: (err) => {
      console.error("Error decreasing quantity:", err);
    }
  });
}
calculateTotals() {
    this.totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.quantity * item.priceSnapshot, 0);
  }
placeOrder(paymentMode: 'COD' | 'WALLET') {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("User not logged in!");
    return;
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const url = paymentMode === 'COD'
    ? 'http://localhost:8085/order/place-from-cart/cod'
    : 'http://localhost:8085/order/place-from-cart/wallet';

  this.http.post(url, {}, headers).subscribe({
    next: (response) => {
      alert('Order placed successfully!');
      this.cartItems = [];
      this.total = 0;
      this.router.navigate(['/orders']);
    },
 error: (error) => {
  console.error('Order placement failed:', error);
  console.log('Full error object:', JSON.stringify(error));

  // ✅ Extract the real message from nested error.error.error
  const errorMsg = 
    typeof error.error === 'string' 
      ? error.error
      : error?.error?.error || error?.error?.message || 'Unknown error';

  console.log('Extracted error message:', errorMsg); // Confirm it's now correct

  if (errorMsg.includes('Please store your address')) {
    alert('Please store your address first.');
    this.router.navigate(['/address/add']);
  } else if (errorMsg.includes('Insufficient wallet balance')) {
    alert('Insufficient wallet balance.');
  } else {
    alert('Failed to place order: ' + errorMsg);
  }
}



  });
}
}