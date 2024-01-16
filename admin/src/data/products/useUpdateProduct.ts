import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type UpdateProduct = {
  id: number;
  categoryId: number;
  price: number;
  weight: number;
};
type ErrorResponse = {
  title: string;
  detail: string;
  instance: string;
  status: number;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: UpdateProduct) => {
      const response = await fetch(
        `http://localhost:5000/products/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errors = (await response.json()) as ErrorResponse[];
        toast.error(errors.map((x) => x.detail).join(""));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { updateProduct: mutate };
};
