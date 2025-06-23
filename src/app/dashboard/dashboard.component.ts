// import { Component } from '@angular/core';

// @Component({
//   standalone:false,
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.html'
// })
// export class DashboardComponent {}


import { Component } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}