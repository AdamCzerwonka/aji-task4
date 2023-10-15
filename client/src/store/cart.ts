import { create } from "zustand";

interface CartEntry {
  id: number;
  amount: number;
}

interface CartStore {
  items: CartEntry[];
  add: (item: CartEntry) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  add: (item) => {
    const { items } = get();
    const updatedItems = updateItems(item, items);
    set({ items: updatedItems });
  },
}));

function updateItems(item: CartEntry, cart: CartEntry[]): CartEntry[] {
  let isOnCart: boolean = false;

  cart.map((entry) => {
    if (entry.id === item.id) {
      entry.amount++;
      isOnCart = true;
    }
  });

  if (!isOnCart) {
    cart = [...cart, item];
  }

  return cart;
}
