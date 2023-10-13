import { FC } from "react";
import { Product } from "../data/useProducts";

interface Props {
  product: Product;
}

const ProductElement: FC<Props> = ({ product }) => {
  return (
    <div key={product.id}>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>{product.weight}</div>
    </div>
  );
};

export default ProductElement;
