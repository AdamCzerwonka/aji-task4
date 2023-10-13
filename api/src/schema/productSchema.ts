import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  weight: z.number().min(0),
  categoryId: z.number().min(1),
});

export const productInputSchema = z.object({
  body: productSchema,
});

export const productUpdateSchema = z.object({
  body: productSchema.partial(),
  params: z.object({
    id: z.string().min(0),
  }),
});

export type ProdcutInputSchema = z.infer<typeof productInputSchema>["body"];
export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>["body"];
