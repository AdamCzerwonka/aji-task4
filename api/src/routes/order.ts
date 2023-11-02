import { Request, Response, Router } from "express";
import { prisma } from "../utils/db";
import {
  OrderInputSchema,
  OrderUpdateSchema,
  orderInputSchema,
  orderUpdateSchema,
} from "../schema/orderSchema";

export const orderRouter = Router();

orderRouter.get("/", async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
});

orderRouter.post(
  "/",
  async (req: Request<{}, {}, OrderInputSchema>, res: Response) => {
    const data = orderInputSchema.parse(req.body);
    const result = await prisma.order.create({
      data: {
        orderStatusId: 1,
        ...data,
        items: {
          create: [...data.items],
        },
      },
    });

    res.json(result);
  }
);

orderRouter.patch(
  "/:id(\\d+)",
  async (
    req: Request<{ id: string }, {}, OrderUpdateSchema>,
    res: Response
  ) => {
    const { id } = req.params;
    const data = orderUpdateSchema.parse(req.body);
    const result = await prisma.order.update({
      where: {
        id: +id,
      },
      data,
    });

    res.json(result);
  }
);

orderRouter.get(
  "/status/:id",
  async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const { id: orderStatusId } = req.params;
    const result = await prisma.order.findMany({
      where: {
        orderStatusId: +orderStatusId,
      },
    });
    res.json(result);
  }
);
