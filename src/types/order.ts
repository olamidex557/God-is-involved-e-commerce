export interface CreateOrderPayload {
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];

  subtotal: number;

  shippingFee: number;

  totalAmount: number;

  paymentMethod: string;

  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
}