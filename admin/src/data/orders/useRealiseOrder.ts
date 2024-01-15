import { useMutation, useQueryClient } from "@tanstack/react-query";

type RealiseOrderData = {
  orderId: number;
  orderStatusId: number;
};

export const useRealiseOrder = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: RealiseOrderData) => {
      await fetch(`http://localhost:5000/order/${data.orderId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          orderStatusId: data.orderStatusId,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { realiseOrder: mutate };
};
