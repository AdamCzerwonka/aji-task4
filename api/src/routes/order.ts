import { Request, Response, Router } from "express";
import { prisma } from "../utils/db";
import {
  OrderInputSchema,
  OrderUpdateSchema,
  orderInputSchema,
  orderSchema,
  orderUpdateSchema,
  orderUpdateStatusSchema,
} from "../schema/orderSchema";
import { validate } from "../middleware/validate";
import { pick, typedKeys } from "../utils/typescript";

export const orderRouter = Router();

orderRouter.get("/", async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
});

orderRouter.post(
  "/",
  validate(orderInputSchema),
  async (req: Request<{}, {}, OrderInputSchema>, res: Response) => {
    const order = req.body;
    const result = await prisma.order.create({
      data: {
        orderStatusId: 1,
        ...order,
        items: {
          create: [...order.items],
        },
      },
    });

    res.json(result);
  }
);

orderRouter.patch(
  "/:id(\\d+)",
  validate(orderUpdateStatusSchema),
  async (
    req: Request<{ id: string }, {}, orderUpdateStatusSchema>,
    res: Response
  ) => {
    const { id } = req.params;
    const order = req.body;
    const result = await prisma.order.update({
      where: {
        id: +id,
      },
      data: {
        orderStatusId: order.orderStatusId,
      },
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
