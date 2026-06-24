export interface OrderItem {
  productId: string;

  name: string;

  color?: string;

  size?: string;

  price: number;

  quantity: number;

  image: string;
}

export interface Order {
  _id: string;

  orderNumber: string;

  user: string;

  items: OrderItem[];

  subtotal: number;

  shippingFee: number;

  totalAmount: number;

  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  paymentStatus:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

  paymentMethod: string;

  paystackReference?: string;

  paystackTransactionId?: string;

  paidAt?: string;

  paymentFailureReason?: string;

  shippingAddress: {
    fullName: string;

    phone: string;

    address: string;

    city: string;

    state: string;
  };

  createdAt: string;

  updatedAt: string;
}

export interface CreateOrderPayload {
  items: {
    productId: string;
    name: string;
    color?: string;
    size?: string;
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
