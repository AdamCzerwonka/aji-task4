import { FC } from "react";
import { useCartStore } from "../../store/cart";
import Button from "../../components/Button";

const CartPage: FC = () => {
  const { items, add, remove } = useCartStore();

  const handleRemoveFromCart = (id: number, name: string, amount: number) => {
    remove({ id, name, amount });
  };

  const handleAddToCart = (id: number, name: string, amount: number) => {
    add({ id, name, amount });
  };

  return (
    <div className="flex flex-row flex-wrap justify-center">
      <div className="box-border w-4/5 mt-4 bg-white rounded-md shadow-sm">
        {items.map((item) => (
          <div key={item.id} className="flex">
            <div className="table-cell basis-4/5 text-left border-l border-b">
              {item.name}
            </div>
            <div className="flex justify-end p-2 basis-1/5 border-r border-b">
              <Button
                label="+"
                className="table-button bg-blue-400 hover:bg-blue-600 w-10 mx-1"
                onClick={() => handleAddToCart(item.id, item.name, 1)}
              />
              <div className="table-button w-1/2 text-center">
                {item.amount}
              </div>
              <Button
                label="-"
                className="table-button bg-slate-400 hover:bg-slate-600 w-10 mx-1"
                onClick={() => handleRemoveFromCart(item.id, item.name, 1)}
              />
              <Button
                label="Remove"
                className="table-button bg-red-400 hover:bg-red-600 mx-1"
                onClick={() => handleRemoveFromCart(item.id, item.name, 999)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
