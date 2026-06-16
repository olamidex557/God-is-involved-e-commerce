import { api } from "./client";

export interface RecentOrder {
  _id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
}

export interface LowStockProduct {
  _id: string;
  name: string;
  stock: number;
}

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

  healthyProducts: number;
  criticalProducts: number;
  outOfStockProducts: number;

  inventoryValue: number;

  lowStockProducts: LowStockProduct[];

  recentOrders: RecentOrder[];
}

export const getDashboardStats =
  async (): Promise<DashboardStats> => {
    const response =
      await api.get(
        "/admin/stats"
      );

    return response.data;
  };