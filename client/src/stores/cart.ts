import { create } from "zustand";

interface CartEntry {
  id: number;
  amount: number;
}

interface CartStore {
  items: CartEntry[];
  add: (item: CartEntry) => void;
  get: () => CartEntry[];
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  add(item) {
    set({});
  },
  get() {
    return [];
  },
}));
