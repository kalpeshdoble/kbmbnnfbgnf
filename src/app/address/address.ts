import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService, Address } from '../services/address.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-add-address',
  templateUrl: './address.html',
  styleUrls: ['./address.scss']
})
export class AddAddressComponent implements OnInit {
  addressForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router
  ) {
    // 👇 Email field is enabled for manual input
    this.addressForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      flatNumber: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // You can add logic here later if you want to autofill from token
  }

  onSubmit(): void {
    if (this.addressForm.invalid) {
      this.errorMessage = 'Please correct the errors above.';
      return;
    }

    const address: Address = this.addressForm.value; // ✅ includes manually typed email

    this.addressService.saveAddress(address).subscribe({
      next: () => {
        alert('Address saved!');
        this.router.navigate(['/cart']);
      },
      error: err => {
        console.error('Save address failed:', err);
        this.errorMessage = 'Failed to save address.';
      }
    });
  }
}
