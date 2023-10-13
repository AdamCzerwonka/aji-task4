import { create } from "zustand";

interface CartEntry {
  id: number;
  amount: number;
}

interface CartStore {
  items: CartEntry[];
  add: (item: CartEntry) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  add(item) {
    // TODO: add some logic
    set((state) => ({
      items: [item, ...state.items],
    }));
  },
}));
