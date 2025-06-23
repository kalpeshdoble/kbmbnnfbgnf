import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    standalone:false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not logged in');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:8080/auth/profile', { headers })
      .subscribe({
        next: (res) => this.user = res,
        error: (err) => {
          console.error('Error fetching profile:', err);
          alert('Failed to load profile data');
        }
      });
  }
}
