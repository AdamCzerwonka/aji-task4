import { FC } from "react";
import ProductElement from "./ProductElement";
import { useProducts } from "../data/useProducts";

const ProductList: FC = () => {
  const { products } = useProducts();

  return (
    <>
      <div>
        <div>ID</div>
        <div>NAME</div>
        <div>DESCRIPTION</div>
        <div>PRICE</div>
        <div>WEIGHT</div>
      </div>
      <div>
        {products?.map((product) => (
          <ProductElement product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
