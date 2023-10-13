import { FC } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const PageLayout: FC = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default PageLayout;
