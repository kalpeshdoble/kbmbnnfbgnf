// src/app/services/address.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';
import { Observable } from 'rxjs';

export interface Address {
  id: number;
   userEmail:string ;
  fullName: string;
  mobileNumber: string;
  flatNumber: string;
  city: string;
  pincode: number;
  state: string;
}

@Injectable({ providedIn: 'root' })
export class AddressService {
  private baseUrl = 'http://localhost:8085/order/address'; // your Address-Service URL

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAddress(): Observable<Address> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Address>(`${this.baseUrl}/user`, { headers });
  }
  saveAddress(addr: Address) {
  const token = this.auth.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`${this.baseUrl}/`, addr, { headers });
}

}
