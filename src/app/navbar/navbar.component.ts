// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   standalone:false,
//   selector: 'app-navbar',
//   styleUrls: ['./navbar.scss'],
//   templateUrl: './navbar.html'
  
// })
// export class NavbarComponent {
//   constructor(private router: Router) {}

//   logout() {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}