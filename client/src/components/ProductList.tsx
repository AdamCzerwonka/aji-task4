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
      <div className="flex flex-row border-b-2 bg-gray-50">
        <div className="table-cell">NAME</div>
        <div className="table-cell basis-full">DESCRIPTION</div>
        <div className="table-cell">PRICE</div>
        <div className="table-cell">WEIGHT</div>
        <div className="table-cell">ACTION</div>
      </div>
      <div className="flex flex-col">
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
