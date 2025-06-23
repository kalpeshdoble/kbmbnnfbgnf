import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent  } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { AddAddressComponent } from './address/address';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './order/my-orders.component';
const routes: Routes = [
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent  },
{ path: 'cart', component: CartComponent },
{ path: 'address/add', component: AddAddressComponent },
{ path: 'wallet', component: WalletComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-orders', component: MyOrdersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
