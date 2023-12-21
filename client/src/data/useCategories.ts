import { useQuery } from "react-query";
import { Category } from "../types/Category";

export const useCategories = () => {
  const { data, isLoading } = useQuery<Category[]>("categories", async () => {
    const response = await fetch("http://localhost:5000/categories");
    if (!response.ok) {
      console.error("Data error");
    }
    return response.json();
  });

  return { categories: data, isLoading };
};
