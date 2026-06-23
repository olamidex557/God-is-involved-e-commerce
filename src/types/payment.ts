import type {
  Order,
} from "./order";

export interface InitializePaymentResponse {
  success: true;
  payment: {
    authorizationUrl: string;
    accessCode: string;
    reference: string;
    orderNumber: string;
  };
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  order: Order;
}

export interface PaymentCustomer {
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
}

export interface PaymentTransaction
  extends Order {
  customer: string;
}

export interface PaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  averageOrderValue: number;
  topCustomers: PaymentCustomer[];
  recentTransactions: PaymentTransaction[];
}
