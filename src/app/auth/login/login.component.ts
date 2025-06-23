


import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  standalone:false,
  selector: 'app-login',
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
 errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    const loginData = this.loginForm.value;
  this.errorMessage = '';
    this.successMessage = '';
    this.http.post<any>('http://localhost:8080/auth/login', loginData).subscribe({
      next: (res) => {
         this.successMessage = 'Login successful!';
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', loginData.username);
        alert('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
          this.errorMessage = err.error.message || 'Login failed!';
        console.log('login error:', loginData);
        console.error('Login error:', err);
        alert('Login failed');
      }
    });
  }
}
