// product.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth';
@Component({
  standalone:false,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = ['All', 'Electronics', 'Clothing', 'Books', 'Grocery'];
  selectedCategory = 'All';

  constructor(
  private http: HttpClient,
  private cartService: CartService,
  private authService: AuthService
) {}

  searchTerm: string = '';

searchByName() {
  if (!this.searchTerm.trim()) {
    this.fetchProducts(); // fallback to all products
    return;
  }

  this.http.get<Product>(`http://localhost:8082/product/searchbyname?name=${this.searchTerm}`)
    .subscribe({
      next: (product) => this.products = [product],
      error: (err) => {
        alert("Product not found!");
        this.products = [];
      }
    });
}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    const baseUrl = 'http://localhost:8082/product';
    const url = this.selectedCategory === 'All'
      ? `${baseUrl}/all`
      : `${baseUrl}/category/${this.selectedCategory}`;

    this.http.get<Product[]>(url).subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error('Fetch error:', err)
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.fetchProducts();
  }

  addToCart(product: Product) {
  this.cartService.addToCart(product).subscribe({
    next: () => alert(`${product.name} added to cart!`),
    error: (err) => {
      console.error(err);
      alert('Failed to add product to cart. Are you logged in?');
    }
  });
}
expandedProductId: number | null = null;

  toggleProduct(productId: number) {
    this.expandedProductId = this.expandedProductId === productId ? null : productId;
  }

}
