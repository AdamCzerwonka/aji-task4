import { FC } from "react";
import ProductElement from "./ProductElement";
import { useProducts } from "../data/useProducts";
import { useCartStore } from "../store/cart";
import Filter from "./Filter";
import { useCategories } from "../data/useCategories";

const ProductList: FC = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { add } = useCartStore();

  const handleAddToCart = (id: number, name: string, amount: number) => {
    add({ id, name, amount });
  };

  return (
    <>
      <Filter />
      <div className="shadow-sm rounded-md">
        <div className="flex flex-row border-b-2">
          <div className="table-cell bg-gray-50">NAME</div>
          <div className="table-cell bg-gray-50">CATEGORY</div>
          <div className="table-cell basis-full bg-gray-50">DESCRIPTION</div>
          <div className="table-cell bg-gray-50">PRICE</div>
          <div className="table-cell bg-gray-50">WEIGHT</div>
          <div className="table-cell bg-gray-50">ACTION</div>
        </div>
        <div className="flex flex-col">
          {products?.map((product) => (
            <ProductElement
              product={product}
              category={
                categories!.find(
                  (category) => category.id === product.categoryId
                )!
              }
              onAddToCart={handleAddToCart}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
