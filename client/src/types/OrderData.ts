export interface OrderData {
  username: string;
  email: string;
  phone: string;
  confirmationDate: Date | null;
  items: { productId: Number; amount: Number }[];
}
