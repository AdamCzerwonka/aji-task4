import { z } from "zod";

export const orderSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  confirmationDate: z.date().optional().nullable(),
  items: z
    .array(
      z.object({
        productId: z.number().min(1),
        amount: z.number().min(0),
      })
    )
    .min(1),
});

export const orderInputSchema = z.object({
  body: orderSchema,
});

export const orderUpdateSchema = z.object({
  body: orderSchema.partial(),
  params: z.object({
    id: z.string().min(0),
  }),
});

export const orderUpdateStatusSchema = z.object({
  body: z.object({
    orderStatusId: z.number().min(1).max(4),
  }),
  params: z.object({
    id: z.string().min(0),
  }),
});

export type OrderInputSchema = z.infer<typeof orderInputSchema>["body"];
export type OrderUpdateSchema = z.infer<typeof orderUpdateSchema>["body"];
export type orderUpdateStatusSchema = z.infer<
  typeof orderUpdateStatusSchema
>["body"];
