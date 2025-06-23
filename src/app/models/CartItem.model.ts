export interface CartItem {
  id: number;
  productName: string;
  quantity: number;
  priceSnapshot: number;
  userEmail: string;
  imgUrl?: string;
}
