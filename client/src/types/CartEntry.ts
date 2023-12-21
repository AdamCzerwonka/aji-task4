import { Product } from "./Product";

export interface CartEntry {
  product: Product;
  amount: number;
}
