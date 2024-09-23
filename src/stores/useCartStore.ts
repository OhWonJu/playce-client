import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AlbumInfo } from "@/types";
import { toast } from "react-toastify";

interface CartStore {
  items: {
    [key: string]: {
      product: AlbumInfo;
      quantity: number;
    };
  };
  totalItems: number;
  orderToken?: string;
  addItem: (data: AlbumInfo) => void;
  removeItem: (id: string) => void;
  initCart: () => void;
  setOrderToken: (token: string | null) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: {},
      totalItems: 0,
      orderToken: undefined,

      addItem: (data: AlbumInfo) => {
        const { items: currentItems, totalItems } = get();

        if (data.id in currentItems) {
          currentItems[data.id].quantity += 1;
        } else {
          currentItems[data.id] = {
            product: data,
            quantity: 1,
          };
        }

        set({ items: currentItems, totalItems: totalItems + 1 });
        toast.success("상품이 장바구니에 추가됨.");
      },
      removeItem: (id: string) => {
        const { items: currentItems, totalItems } = get();

        if (!(id in currentItems)) {
          toast.error("상품을 찾을 수 없습니다.");
          return;
        }

        if (currentItems[id].quantity > 1) {
          currentItems[id].quantity -= 1;
          set({ totalItems: totalItems - 1 });
        } else {
          delete currentItems[id];
          set({ items: currentItems, totalItems: totalItems - 1 });
        }
      },

      initCart: () => set({ items: {}, totalItems: 0 }),

      setOrderToken: (token: string) => set({ orderToken: token }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
