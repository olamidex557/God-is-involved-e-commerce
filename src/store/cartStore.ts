import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (id: string) => void;

  clearCart: () => void;

  updateQuantity: (
    id: string,
    quantity: number
  ) => void;
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set) => ({
        items: [],

        addItem: (item) =>
          set((state) => {
            const existing =
              state.items.find(
                (i) => i.id === item.id
              );

            if (existing) {
              return {
                items:
                  state.items.map((i) =>
                    i.id === item.id
                      ? {
                          ...i,
                          quantity:
                            i.quantity +
                            item.quantity,
                        }
                      : i
                  ),
              };
            }

            return {
              items: [
                ...state.items,
                item,
              ],
            };
          }),

        removeItem: (id) =>
          set((state) => ({
            items:
              state.items.filter(
                (item) =>
                  item.id !== id
              ),
          })),

        clearCart: () =>
          set({
            items: [],
          }),

        updateQuantity: (
          id,
          quantity
        ) =>
          set((state) => ({
            items:
              state.items.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity:
                        quantity < 1
                          ? 1
                          : quantity,
                    }
                  : item
              ),
          })),
      }),
      {
        name: "god-is-involved-cart",
      }
    )
  );