import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <div className="container">
      <div className="flex flex-row gap-2 py-10">
        <Button asChild>
          <NavLink to={"/"}>Products</NavLink>
        </Button>
        <Button asChild>
          <NavLink to={"/orders/unrealised"}>Unrealised orders</NavLink>
        </Button>
        <Button asChild>
          <NavLink to={"/orders"}>All orders</NavLink>
        </Button>
      </div>
      <Toaster />
      <Outlet />
    </div>
  );
};

export default MainLayout;
