export type Order = {
  id: number;
  confirmationDate: Date | undefined;
  username: string;
  email: string;
  phone: string;
  orderStatusId: number;
  items: Array<{
    id: number;
    amount: number;
    orderId: number;
    productId: number;
    price: number;
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      weight: number;
      categoryId: number;
    };
  }>;
};
