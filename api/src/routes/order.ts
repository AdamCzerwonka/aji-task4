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
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: {},
        },
      },
    },
  });
  res.json(orders);
});

orderRouter.post(
  "/",
  validate(orderInputSchema),
  async (req: Request<{}, {}, OrderInputSchema>, res: Response) => {
    const order = req.body;
    const result = await prisma.$transaction(async (tx) => {
      const orderResult = await tx.order.create({
        data: {
          orderStatusId: 1,
          ...order,
          items: undefined,
        },
      });

      const results = order.items.map(async (item) => {
        const product = await tx.product.findFirst({
          where: { id: item.productId },
        });
        await tx.orderItem.create({
          data: {
            orderId: orderResult.id,
            amount: item.amount,
            productId: item.productId,
            price: (product?.price ?? 0) * item.amount,
          },
        });
      });

      await Promise.all(results);

      return orderResult;
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
