import { Order } from "@/types/Order";
import { useQuery } from "@tanstack/react-query";

export const useUnrealisedOrders = () => {
  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["unrealisedOrders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/order");
      return response.json();
    },
  });

  return { unrealisedOrders: data, isLoading };
};
