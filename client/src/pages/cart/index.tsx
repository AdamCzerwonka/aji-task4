import { FC } from "react";
import { useCartStore } from "../../store/cart";

const CartPage: FC = () => {
  const { items } = useCartStore();

  return (
    <div>
      {items.map((item) => (
        <div>
          ID: {item.id}, ammount: {item.amount}
        </div>
      ))}
    </div>
  );
};

export default CartPage;
