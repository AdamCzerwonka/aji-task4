import { Router, Request, Response } from "express";
import { prisma } from "../utils/db";

export const orderStatusRouter = Router();

orderStatusRouter.get("/", async (req: Request, res: Response) => {
  const orderStatus = await prisma.orderStatus.findMany();
  return res.json(orderStatus);
});
