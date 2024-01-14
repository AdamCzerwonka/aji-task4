import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateProduct = {
  id: number;
  categoryId: number;
  price: number;
  weight: number;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: UpdateProduct) => {
      await fetch(`http://localhost:5000/products/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { updateProduct: mutate };
};
