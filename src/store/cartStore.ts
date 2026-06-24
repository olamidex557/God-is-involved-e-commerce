import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  color: string;
  size: string;
  unitPrice: number;
  price: number;
  image?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (
    item: CartItem
  ) => void;

  removeItem: (
    id: string
  ) => void;

  updateQuantity: (
    id: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set) => ({
        items: [],

        addItem: (
          item
        ) =>
          set((state) => {
            const normalizedItem =
              {
                ...item,
                productId:
                  item.productId ??
                  item.id,
                id:
                  item.id ||
                  `${item.productId}-${item.color}-${item.size}`,
                color:
                  item.color ??
                  "Default",
                size:
                  item.size ??
                  "Standard",
                unitPrice:
                  item.unitPrice ??
                  item.price,
                price:
                  item.price ??
                  item.unitPrice,
              };

            const existing =
              state.items.find(
                (i) =>
                  i.id === normalizedItem.id
              );

            if (existing) {
              return {
                items:
                  state.items.map(
                    (i) =>
                      i.id === normalizedItem.id
                        ? {
                            ...i,
                            quantity:
                              i.quantity +
                              normalizedItem.quantity,
                          }
                        : i
                  ),
              };
            }

            return {
              items: [
                ...state.items,
                normalizedItem,
              ],
            };
          }),

        removeItem: (
          id
        ) =>
          set((state) => ({
            items:
              state.items.filter(
                (item) =>
                  item.id !== id
              ),
          })),

        updateQuantity: (
          id,
          quantity
        ) =>
          set((state) => ({
            items:
              state.items.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        quantity,
                      }
                    : item
              ),
          })),

        clearCart: () =>
          set({
            items: [],
          }),
      }),
      {
        name:
          "god-is-involved-cart",
      }
    )
  );
