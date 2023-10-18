import { FC } from "react";
import ProductList from "../../components/ProductList";

const ProductsPage: FC = () => {
  return (
    <div className="flex flex-row justify-center ">
      <div className="box-border w-4/5 mt-4 bg-white rounded-md shadow-sm">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
