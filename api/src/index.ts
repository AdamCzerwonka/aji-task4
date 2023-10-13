import express, { Express } from "express";
import dotenv from "dotenv";
import "express-async-errors";

import { productsRouter } from "./routes/product";
import { categoryRouter } from "./routes/category";
import { orderStatusRouter } from "./routes/orderStatus";
import { orderRouter } from "./routes/order";
import { globalErrorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "5000");

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/order", orderRouter);
app.use("/status", orderStatusRouter);

app.use(globalErrorHandler());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
