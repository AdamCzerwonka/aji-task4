import { useQuery } from "@tanstack/react-query";

type Status = {
  id: number;
  name: string;
};

export const useOrderStatus = () => {
  const { data, isLoading } = useQuery<Status[]>({
    queryKey: ["orderStats"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/status");
      return response.json();
    },
  });

  return { orderStatus: data, isLoading };
};
