// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing-module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './auth/login/login';
// import { RegisterComponent } from './auth/register/register';
// import { HttpClientModule } from '@angular/common/http';
// import { DashboardComponent  } from './dashboard/dashboard';
// import { NavbarComponent } from './navbar/navbar';
// import { ProductComponent } from './product/product';
// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     RegisterComponent,
//     DashboardComponent ,
//     NavbarComponent,
//     ProductComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     ReactiveFormsModule,
//      HttpClientModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AddAddressComponent } from './address/address';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
  AppComponent,
  NavbarComponent,
  LoginComponent,
  RegisterComponent,
  DashboardComponent,
  ProductComponent,
  CartComponent,
  AddAddressComponent,
  WalletComponent,
  ProfileComponent
],
  imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,              // ✅ For ngModel
    ReactiveFormsModule,  
  HttpClientModule,
  RouterModule,
  CommonModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
