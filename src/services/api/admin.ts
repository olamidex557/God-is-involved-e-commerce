import { api } from "./client";

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalQuotations: number;
  totalRevenue: number;
}

export const getDashboardStats =
  async () => {
    const response =
      await api.get<DashboardStats>(
        "/admin/stats"
      );

    return response.data;
  };
