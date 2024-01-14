import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/products");
      return response.json();
    },
  });

  return { products: data, isLoading };
};
