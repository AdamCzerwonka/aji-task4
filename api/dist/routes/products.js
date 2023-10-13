"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany();
    res.json(products);
}));
exports.productsRouter.get("/:id(\\d+)", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield prisma.product.findUnique({
        where: {
            id: +id,
        },
    });
    res.json(product);
}));
const productInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().min(0),
    weight: zod_1.z.number().min(0),
    categoryId: zod_1.z.number().min(1),
});
exports.productsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const data = productInputSchema.parse(product);
    const result = yield prisma.product.create({ data });
    res.json(result);
}));
exports.productsRouter.put("/:id(\\d+)", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield prisma.product.update({
        where: { id: +id },
        data: req.body,
    });
    res.json(product);
}));
