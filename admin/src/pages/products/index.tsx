import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/data/products/useProducts";
import { FC, useState } from "react";
import EditProductModal from "./EditProductModal";
import { Product } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/data/category/useCategories";

const ProductsPage: FC = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [isEditOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>();
  return (
    <div>
      {editProduct && (
        <EditProductModal
          product={editProduct}
          open={isEditOpen}
          setOpen={setEditOpen}
        />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Descirption</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableHead>
                {
                  categories?.find(
                    (category) => category.id === product.categoryId
                  )?.name
                }
              </TableHead>
              <TableCell>{product.price.toFixed(2)}$</TableCell>
              <TableCell>{product.weight.toFixed(1)} kg</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setEditProduct(product);
                    setEditOpen(true);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsPage;
