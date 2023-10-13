import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage from "./pages/products/index.tsx";
import CartPage from "./pages/cart/index.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    Component: ProductsPage,
  },
  {
    path: "/cart",
    Component: CartPage,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
