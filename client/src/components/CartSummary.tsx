import { FC } from "react";
import { useCartStore } from "../store/cart";

const Summary: FC = () => {
  const { items } = useCartStore();

  const calculateItemsNumber = (): String => {
    var itemsNumber = 0;

    items.map((entry) => {
      itemsNumber += entry.amount;
    });

    return itemsNumber.toString();
  };

  const calculatePrice = (): String => {
    var price = 0;

    items.map((entry) => {
      price += entry.product.price * entry.amount;
    });

    return price.toFixed(2);
  };

  return (
    <div className="bg-white rounded-md p-4 shadow-sm w-5/6 text-[24px]">
      <div className="flex justify-between">
        <div>Products:</div>
        <div>{items.length}</div>
      </div>
      <div className="flex justify-between">
        <div>Items:</div>
        <div>{calculateItemsNumber()}</div>
      </div>
      <div className="flex justify-between">
        <div>Price:</div>
        <div>{calculatePrice()}$</div>
      </div>
    </div>
  );
};

export default Summary;
