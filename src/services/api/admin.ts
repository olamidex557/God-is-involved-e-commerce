import { api } from "./client";

export interface RecentOrder {
  _id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
}

export interface LowStockProduct {
  productId: string;
  productName: string;
  category: string;
  color: string;
  size: string;
  lowStockThreshold: number;
  stock: number;
}

export interface ActivityItem {
  type: string;
  title: string;
  date: string;
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
  cancelledOrders: number;

  healthyProducts: number;
  criticalProducts: number;
  outOfStockProducts: number;

  inventoryValue: number;

  lowStockProducts: LowStockProduct[];

  recentOrders: RecentOrder[];

  revenueTrend: {
    label: string;
    value: number;
  }[];

  ordersTrend: {
    label: string;
    value: number;
  }[];

  statusDistribution: {
    status: string;
    count: number;
  }[];
}

export const getDashboardStats =
  async (): Promise<DashboardStats> => {
    const response =
      await api.get(
        "/admin/stats"
      );

    return response.data;
  };

export const getActivity =
  async (): Promise<{
    activities: ActivityItem[];
  }> => {
    const response =
      await api.get(
        "/activity"
      );

    return response.data;
  };
