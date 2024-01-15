import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage from "./pages/products";
import UnrealisedOrdersPage from "./pages/unrealisedOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./pages/Layout";
import OrdersPage from "./pages/orders";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: ProductsPage,
      },
      { path: "/orders", Component: OrdersPage },
      { path: "/orders/unrealised", Component: UnrealisedOrdersPage },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
