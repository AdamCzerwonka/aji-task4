import { FC } from "react";
import { useCartStore } from "../../store/cart";

const CartPage: FC = () => {
  const { items } = useCartStore();

  return (
    <div>
      {items.map((item) => (
        <div>{item.id}</div>
      ))}
    </div>
  );
};

export default CartPage;
