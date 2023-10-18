import { create } from "zustand";

interface CartEntry {
  id: number;
  name: string;
  amount: number;
}

interface CartStore {
  items: CartEntry[];
  add: (item: CartEntry) => void;
  remove: (item: CartEntry) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  add: (item) => {
    const { items } = get();
    const updatedItems = updateItems(item, items);
    set({ items: updatedItems });
  },
  remove: (item) => {
    const { items } = get();
    const updatedItems = removeItem(item, items);
    set({ items: updatedItems });
  },
}));

const updateItems = (item: CartEntry, cart: CartEntry[]): CartEntry[] => {
  let isOnCart: boolean = false;

  cart.map((entry) => {
    if (entry.id === item.id) {
      entry.amount += item.amount;
      isOnCart = true;
    }
  });

  if (!isOnCart) {
    cart.push(item);
  }

  return cart;
};

const removeItem = (item: CartEntry, cart: CartEntry[]): CartEntry[] => {
  let isToRemove: boolean = false;

  cart.map((entry) => {
    if (entry.id === item.id) {
      entry.amount -= item.amount;
      if (entry.amount <= 0) {
        isToRemove = true;
      }
    }
  });

  if (isToRemove) {
    return cart.filter((entry) => entry.id !== item.id);
  }
  return cart;
};
