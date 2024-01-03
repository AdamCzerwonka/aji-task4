import { FC } from "react";
import { FormProvider, Message, useForm } from "react-hook-form";
import { OrderData } from "../types/OrderData";
import Button from "./Button";
import { useCartStore } from "../store/cart";
import { ErrorResponse } from "../types/ErrorResponse";
import toast, { Toaster } from "react-hot-toast";

const PersonalData: FC = () => {
  const notify = (msg: Message) => toast.error(msg);

  const methods = useForm<OrderData>({
    values: {
      username: "",
      email: "",
      phone: "",
      confirmationDate: null,
      items: [],
    },
  });
  const { register, handleSubmit } = methods;
  const { items } = useCartStore();

  const onSubmit = handleSubmit(async (values) => {
    values.items = items.map(({ product, amount }) => {
      return { productId: product.id, amount };
    });

    await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data: ErrorResponse[]) => {
        data.forEach((entry) => {
          notify(entry.detail);
        });
      });
  });

  return (
    <>
      <div className="bg-white rounded-md mt-2 p-4 shadow-sm w-5/6">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col mt-2">
              <label htmlFor="username">Username</label>
              <input
                {...register("username")}
                name="username"
                placeholder="Username"
                className="border-b-[1px] border-black p-1 shadow-sm focus:border-yellow-100"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                name="email"
                placeholder="email"
                className="border-b-[1px] border-black p-1 shadow-sm focus:border-none"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="phone">Phone</label>
              <input
                {...register("phone")}
                name="phone"
                placeholder="phone"
                className="border-b-[1px] border-black p-1 shadow-sm focus:border-yellow-100"
              />
            </div>
            <div className="text-right mt-2">
              <Button label="Order" className=" table-button" type="submit" />
            </div>
          </form>
        </FormProvider>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default PersonalData;
