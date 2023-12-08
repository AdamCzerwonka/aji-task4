import { FC } from "react";
import { useCartStore } from "../../store/cart";
import Button from "../../components/Button";
import { Product } from "../../data/useProducts";
import CartSummary from "../../components/CartSummary";

const CartPage: FC = () => {
  const { items, add, remove } = useCartStore();

  const handleRemoveFromCart = (product: Product, amount: number) => {
    remove({ product, amount });
  };

  const handleAddToCart = (product: Product, amount: number) => {
    add({ product, amount });
  };

  return (
    <div className="flex flex-row flex-wrap justify-center mt-4 gap-3">
      <div className="box-border w-7/12 bg-white rounded-md shadow-sm h-min">
        {items.length === 0 && (
          <div className="font-bold text-center p-5 text-2xl">
            Cart is empty
          </div>
        )}
        {items.map((item) => (
          <div key={item.product.id} className="flex">
            <div className="table-cell basis-4/5 text-left border-l border-b">
              {item.product.name}
            </div>
            <div className="flex justify-end p-2 basis-1/5 border-r border-b">
              <Button
                label="+"
                className="table-button bg-blue-400 hover:bg-blue-600 w-10 mx-1"
                onClick={() => handleAddToCart(item.product, 1)}
              />
              <div className="table-button w-1/2 text-center">
                {item.amount}
              </div>
              <Button
                label="-"
                className="table-button bg-slate-400 hover:bg-slate-600 w-10 mx-1"
                onClick={() => handleRemoveFromCart(item.product, 1)}
              />
              <Button
                label="Remove"
                className="table-button bg-red-400 hover:bg-red-600 mx-1"
                onClick={() => handleRemoveFromCart(item.product, 999)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/12">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
