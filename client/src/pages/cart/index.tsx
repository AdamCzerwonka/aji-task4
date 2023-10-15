import { FC } from "react";
import { useCartStore } from "../../store/cart";
import Button from "../../components/Button";

const CartPage: FC = () => {
  const { items, remove } = useCartStore();

  const handleRemoveFromCart = (id: number, amount: number) => {
    remove({ id, amount });
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          ID: {item.id}, ammount: {item.amount}
          <div>
            <Button
              label="Remove"
              onClick={() => handleRemoveFromCart(item.id, 1)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
