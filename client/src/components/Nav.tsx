import { FC } from "react";
import { useCartStore } from "../store/cart";
import { NavLink } from "react-router-dom";

const Nav: FC = () => {
  const { items } = useCartStore();

  return (
    <div>
      <NavLink to={"/"}>Products</NavLink>
      <NavLink to={"/cart"}>Cart {items.length}</NavLink>
    </div>
  );
};

export default Nav;
