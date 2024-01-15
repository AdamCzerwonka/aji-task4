import { FC } from "react";
import { FormProvider, Message, useForm } from "react-hook-form";
import Button from "./Button";
import { useCartStore } from "../store/cart";
import { ErrorResponse } from "../types/ErrorResponse";
import toast, { Toaster } from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const createOrderSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email(),
  phone: z.string().regex(/\d{9}/, "Invalid phone number format"),
});

type CreateOrderSchema = z.infer<typeof createOrderSchema>;

const PersonalData: FC = () => {
  const notify = (msg: Message) => toast.error(msg);

  const methods = useForm<CreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    values: {
      username: "",
      email: "",
      phone: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { items, clear } = useCartStore();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        confirmationDate: undefined,
        items: items.map(({ product, amount }) => {
          return { productId: product.id, amount };
        }),
      }),
    });

    if (response.ok) {
      clear();
      navigate("/order/success");
    }

    if (!response.ok) {
      const errors = (await response.json()) as ErrorResponse[];
      errors.forEach((error) => {
        notify(error.detail);
      });
    }
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
              <p className="text-red-600">{errors.username?.message}</p>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                name="email"
                placeholder="email"
                className="border-b-[1px] border-black p-1 shadow-sm focus:border-none"
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="phone">Phone</label>
              <input
                {...register("phone")}
                name="phone"
                placeholder="phone"
                className="border-b-[1px] border-black p-1 shadow-sm focus:border-yellow-100"
              />
              <p className="text-red-600">{errors.phone?.message}</p>
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
