import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
    standalone:false,
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  balance: number = 0;
  email: string = '';  // retrieved from token or user service
  amount: number = 0;
  transactions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = JSON.parse(atob(token.split('.')[1]));
      this.email = decoded.sub;
      this.fetchWallet();
      this.fetchTransactions();
    }
  }

  fetchWallet() {
    this.http.get<any>(`http://localhost:8084/wallet/balance`, {
      params: new HttpParams().set('email', this.email)
    }).subscribe({
      next: res => this.balance = res.balance,
      error: err => console.error(err)
    });
  }

  fetchTransactions() {
    this.http.get<any[]>(`http://localhost:8084/wallet/transactions`, {
      params: new HttpParams().set('email', this.email)
    }).subscribe({
      next: res => this.transactions = res,
      error: err => console.error(err)
    });
  }

  addMoney() {
    if (this.amount <= 0) return;
    this.http.post<any>(`http://localhost:8084/wallet/add`, {}, {
      params: new HttpParams()
        .set('email', this.email)
        .set('amount', this.amount)
    }).subscribe({
      next: () => {
        this.fetchWallet();
        this.fetchTransactions();
        alert('Money added successfully!');
      },
      error: err => alert('Failed to add money')
    });
  }

  withdrawMoney() {
    if (this.amount <= 0) return;
    this.http.put<any>(`http://localhost:8084/wallet/deduct`, {}, {
      params: new HttpParams()
        .set('email', this.email)
        .set('amount', this.amount)
    }).subscribe({
      next: () => {
        this.fetchWallet();
        this.fetchTransactions();
        alert('Amount deducted successfully!');
      },
      error: err => alert('Insufficient funds or error')
    });
  }
}
