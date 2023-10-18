import { FC } from "react";
import { useCartStore } from "../../store/cart";
import Button from "../../components/Button";

const CartPage: FC = () => {
  const { items, remove } = useCartStore();

  const handleRemoveFromCart = (id: number, amount: number) => {
    remove({ id, amount });
  };

  return (
    <div className="flex flex-row flex-wrap justify-center">
      <div className="box-border w-4/5 mt-4 bg-white rounded-md shadow-sm">
        {items.map((item) => (
          <div key={item.id} className="flex">
            <div className="table-cell basis-4/5 text-left border-l border-b">
              ID: {item.id}, ammount: {item.amount}
            </div>
            <div className="table-cell basis-1/5 text-right border-r border-b">
              <Button
                label="Remove"
                className=" table-button bg-red-400 hover:bg-red-600"
                onClick={() => handleRemoveFromCart(item.id, 1)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
