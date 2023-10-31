import { FC } from "react";
import ProductList from "../../components/ProductList";

const ProductsPage: FC = () => {
  return (
    <>
      <div className="flex flex-row justify-center ">
        <div className="w-4/5">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
