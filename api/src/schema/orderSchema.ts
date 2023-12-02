import { z } from "zod";

export const orderInputSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  confirmationDate: z.date().optional(),
  items: z.array(
    z.object({
      productId: z.number().min(1),
      amount: z.number().min(0),
    })
  ),
});

export const orderUpdateSchema = z.object({
  orderStatusId: z.number().min(1).max(4),
});

export type OrderInputSchema = z.infer<typeof orderInputSchema>;
export type OrderUpdateSchema = z.infer<typeof orderUpdateSchema>;
