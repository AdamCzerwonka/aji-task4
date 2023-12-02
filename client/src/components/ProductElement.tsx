import { FC } from "react";
import { Product } from "../data/useProducts";
import Button from "./Button";
import { Category } from "../data/useCategories";

interface Props {
  product: Product;
  category: Category;
  onAddToCart: (id: number, name: string, amount: number) => void;
}

const ProductElement: FC<Props> = ({ product, category, onAddToCart }) => {
  return (
    <div className="flex flex-row border-b border-l border-r table-cell-hover  align-bottom">
      <div className="table-cell text-left">{product.name}</div>
      <div className="table-cell">{category.name}</div>
      <div className="table-cell text-left basis-full break-keep">
        {product.description}
      </div>
      <div className="table-cell">{product.price}$</div>
      <div className="table-cell">{product.weight}kg</div>
      <div className="table-cell">
        <Button
          className="table-button"
          label="Add"
          onClick={() => onAddToCart(product.id, product.name, 1)}
        />
      </div>
    </div>
  );
};

export default ProductElement;
