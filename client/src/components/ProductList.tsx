import { FC } from "react";
import ProductElement from "./ProductElement";
import { useProducts } from "../data/useProducts";
import { useCartStore } from "../store/cart";

const ProductList: FC = () => {
  const { products } = useProducts();
  const { add } = useCartStore();

  const handleAddToCart = (id: number, amount: number) => {
    add({ id, amount });
  };

  return (
    <>
      <div className="table-product">
        <div>ID</div>
        <div>NAME</div>
        <div>DESCRIPTION</div>
        <div>PRICE</div>
        <div>WEIGHT</div>
        <div>ACTION</div>
      </div>
      <div className="flex flex-col gap-2">
        {products?.map((product) => (
          <ProductElement
            product={product}
            onAddToCart={handleAddToCart}
            key={product.id}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
