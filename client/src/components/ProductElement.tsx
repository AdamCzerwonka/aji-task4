import { FC } from "react";
import { Product } from "../data/useProducts";
import Button from "./Button";

interface Props {
  product: Product;
  onAddToCart: (id: number, amount: number) => void;
}

const ProductElement: FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="border border-black flex flex-col">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <div>{product.description}</div>
      <div>{product.price}$</div>
      <div>{product.weight}</div>
      <div>
        <Button label="Add" onClick={() => onAddToCart(product.id, 1)} />
      </div>
    </div>
  );
};

export default ProductElement;
