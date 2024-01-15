import { FC } from "react";
import { NavLink } from "react-router-dom";

const OrderPage: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-2xl">Your order was placed!</div>
      <NavLink to={"/"}>Go back to products page</NavLink>
    </div>
  );
};

export default OrderPage;
