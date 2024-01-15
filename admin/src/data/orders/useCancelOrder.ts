import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (orderId: number) => {
      await fetch(`http://localhost:5000/order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          orderStatusId: 3,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { cancelOrder: mutate };
};
