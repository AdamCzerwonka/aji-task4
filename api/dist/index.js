"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
require("express-async-errors");
const product_1 = require("./routes/product");
const category_1 = require("./routes/category");
const orderStatus_1 = require("./routes/orderStatus");
const order_1 = require("./routes/order");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use("/products", product_1.productsRouter);
app.use("/categories", category_1.categoryRouter);
app.use("/order", order_1.orderRouter);
app.use("/status", orderStatus_1.orderStatusRouter);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json("error");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
