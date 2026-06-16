import { api } from "./client";

export interface DashboardStats {
  totalProducts: number;

  totalOrders: number;

  totalUsers: number;

  totalQuotations: number;

  totalRevenue: number;

  pendingOrders: number;

  processingOrders: number;

  shippedOrders: number;

  deliveredOrders: number;

  lowStockProducts: {
    _id: string;
    name: string;
    stock: number;
  }[];

  recentOrders: {
    _id: string;
    orderNumber: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  }[];
}

export const getDashboardStats =
  async () => {
    const response =
      await api.get<DashboardStats>(
        "/admin/stats"
      );

    return response.data;
  };