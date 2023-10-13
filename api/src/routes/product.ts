import { Router, Request, Response } from "express";
import { prisma } from "../utils/db";
import { validate } from "../middleware/validate";
import { pick, typedKeys } from "../utils/typescript";
import {
  ProdcutInputSchema,
  ProductUpdateSchema,
  productInputSchema,
  productSchema,
  productUpdateSchema,
} from "../schema/productSchema";
export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

productsRouter.get("/:id(\\d+)", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });
  res.json(product);
});

productsRouter.post(
  "/",
  validate(productInputSchema),
  async (req: Request<{}, {}, ProdcutInputSchema>, res: Response) => {
    const product = req.body;
    const result = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        weight: product.weight,
        categoryId: product.categoryId,
      },
    });
    res.json(result);
  }
);

productsRouter.put(
  "/:id(\\d+)",
  validate(productUpdateSchema),
  async (
    req: Request<{ id: string }, {}, ProductUpdateSchema>,
    res: Response
  ) => {
    const { id } = req.params;
    const product = req.body;
    const result = await prisma.product.update({
      where: { id: +id },
      data: pick(product, typedKeys(productSchema.shape)),
    });

    res.json(result);
  }
);
