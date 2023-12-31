import { useQuery } from "react-query";
import { Product } from "../types/Product";

export const useProducts = () => {
  const { data, isLoading } = useQuery<Product[]>("products", async () => {
    const response = await fetch("http://localhost:5000/products");
    if (!response.ok) {
      console.error("Data error");
    }
    return response.json();
  });

  return { products: data, isLoading };
};
