import { create } from "zustand";
import { CartEntry } from "../types/CartEntry";

interface CartStore {
  items: CartEntry[];
  add: (item: CartEntry) => void;
  remove: (item: CartEntry) => void;
  clear: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]") as CartEntry[],
  add: (item) => {
    const { items } = get();
    const updatedItems = updateItems(item, items);
    set({ items: updatedItems });
    localStorage.setItem("cart", JSON.stringify(get().items));
  },
  remove: (item) => {
    const { items } = get();
    const updatedItems = removeItem(item, items);
    set({ items: updatedItems });
    localStorage.setItem("cart", JSON.stringify(get().items));
  },
  clear: () => {
    set({ items: [] });
    localStorage.setItem("cart", JSON.stringify(get().items));
  },
}));

const updateItems = (item: CartEntry, cart: CartEntry[]): CartEntry[] => {
  let isOnCart: boolean = false;

  cart.map((entry) => {
    if (entry.product.id === item.product.id) {
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
    if (entry.product.id === item.product.id) {
      entry.amount -= item.amount;
      if (entry.amount <= 0) {
        isToRemove = true;
      }
    }
  });

  if (isToRemove) {
    return cart.filter((entry) => entry.product.id !== item.product.id);
  }
  return cart;
};
