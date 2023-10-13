import { Request, Response, Router } from "express";
import { z } from "zod";
import { prisma } from "../utils/db";

export const orderRouter = Router();

orderRouter.get("/", async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
});

const orderInputSchema = z.object({
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

type OrderInputSchema = z.infer<typeof orderInputSchema>;

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

const orderUpdateSchema = z.object({
  orderStatusId: z.number().min(1).max(4),
});

type OrderUpdateSchema = z.infer<typeof orderUpdateSchema>;

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
