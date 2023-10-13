import { Router, Request, Response } from "express";
import { prisma } from "../utils/db";

export const categoryRouter = Router();

categoryRouter.get("/", async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  return res.json(categories);
});
