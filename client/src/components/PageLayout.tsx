import { FC } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const PageLayout: FC = () => {
  return (
    <div className="bg-gray-100  w-screen h-screen">
      <Nav />
      <Outlet />
    </div>
  );
};

export default PageLayout;
