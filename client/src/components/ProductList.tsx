import { FC, useState } from "react";
import ProductElement from "./ProductElement";
import { useProducts } from "../data/useProducts";
import { useCartStore } from "../store/cart";
import { useCategories } from "../data/useCategories";
import { Product } from "../types/Product";

const ProductList: FC = () => {
  const { products } = useProducts();
  const filteredProducts = products;
  const { categories } = useCategories();
  const { add } = useCartStore();
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [nameFilter, setNameFilter] = useState("");

  const handleAddToCart = (product: Product, amount: number) => {
    add({ product, amount });
  };

  return (
    <>
      <div className="flex align-middle justify-center m-5">
        <form>
          <input
            type="text"
            placeholder="Name"
            className="mx-2 font-medium p-2 rounded-md shadow-md"
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </form>

        <form>
          <select
            defaultValue={0}
            className="mx-2 font-medium p-2 rounded-md shadow-md"
            onChange={(e) => setCategoryFilter(+e.target.value)}
          >
            <option value={0}>all</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </form>
      </div>

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
          {filteredProducts
            ?.filter((product) => {
              return categoryFilter === 0
                ? product
                : product.categoryId === categoryFilter;
            })
            .filter((product) => {
              return nameFilter === ""
                ? product
                : product.name.toLowerCase().includes(nameFilter.toLowerCase());
            })
            .map((product) => (
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
