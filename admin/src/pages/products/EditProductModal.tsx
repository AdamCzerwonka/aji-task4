import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/Product";
import { FC } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/data/category/useCategories";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProduct } from "@/data/products/useUpdateProduct";
import { Button } from "@/components/ui/button";

type EditProductModalProps = {
  product: Product;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const editProductSchema = z.object({
  categoryId: z.number(),
  price: z.number(),
  weight: z.number(),
});

type EditProductSchema = z.infer<typeof editProductSchema>;

const EditProductModal: FC<EditProductModalProps> = ({
  product,
  open,
  setOpen,
}) => {
  const { updateProduct } = useUpdateProduct();
  const { categories } = useCategories();
  const form = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    values: {
      ...product,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateProduct({ id: product.id, ...values });
    setOpen(false);
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit: {product.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(+value)}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          value={category.id.toString()}
                          key={`category_${category.id}`}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={({ target }) => {
                        field.onChange(+target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={({ target }) => {
                        field.onChange(+target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
