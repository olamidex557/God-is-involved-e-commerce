export interface User {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verified?: boolean;
  createdAt: string;
  updatedAt?: string;
  totalOrders?: number;
  totalSpent?: number;
}
