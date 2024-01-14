import { Category } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/categories");
      return response.json();
    },
  });

  return { categories: data, isLoading };
};
