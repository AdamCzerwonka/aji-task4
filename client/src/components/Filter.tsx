import { FC } from "react";
import { useCategories } from "../data/useCategories";

const Filter: FC = () => {
  const { categories } = useCategories();

  return (
    <div className="flex align-middle justify-center m-5">
      <form>
        <input
          type="text"
          placeholder="Name"
          className="mx-2 font-medium p-2 rounded-md shadow-md"
        />

        <select
          defaultValue={0}
          className="mx-2 font-medium p-2 rounded-md shadow-md"
        >
          <option value={0}>all</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          className="mx-2 font-medium p-2 rounded-md shadow-md bg-yellow-100 hover:bg-yellow-400 ease-in-out duration-100"
          type="submit"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default Filter;
