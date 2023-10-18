import { FC } from "react";
import { useCartStore } from "../store/cart";
import { NavLink } from "react-router-dom";

const Nav: FC = () => {
  const { items } = useCartStore();

  return (
    <div className="flex justify-center bg-gray-200 p-2">
      <NavLink to={"/"} className="nav-option">
        Products
      </NavLink>
      <NavLink to={"/cart"} className="nav-option">
        Cart {items.length}
      </NavLink>
    </div>
  );
};

export default Nav;
