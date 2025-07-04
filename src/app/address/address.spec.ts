import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressComponent } from './address';

describe('Address', () => {
  let component: AddAddressComponent;
  let fixture: ComponentFixture<AddAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
