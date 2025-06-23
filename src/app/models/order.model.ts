export interface Order {
  id: number;
  date: string;
  paymentMode: 'COD' | 'WALLET';
  totalAmount: number;
  address: {
    fullName: string;
    flatNumber: string;
    city: string;
    state: string;
    pincode: string;
  };
  products: {
    productName: string;
    quantity: number;
    priceSnapshot: number;
  }[];
}
