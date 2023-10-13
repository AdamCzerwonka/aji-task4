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
exports.orderRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma.order.findMany();
    res.json(orders);
}));
const orderInputSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(1),
    confirmationDate: zod_1.z.date().optional(),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.number().min(1),
        amount: zod_1.z.number().min(0),
    })),
});
exports.orderRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = orderInputSchema.parse(req.body);
    const result = yield prisma.order.create({
        data: Object.assign(Object.assign({ orderStatusId: 1 }, data), { items: {
                create: [...data.items],
            } }),
    });
    res.json(result);
}));
const orderUpdateSchema = zod_1.z.object({
    orderStatusId: zod_1.z.number().min(1).max(4),
});
exports.orderRouter.patch("/:id(\\d+)", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = orderUpdateSchema.parse(req.body);
    const result = yield prisma.order.update({
        where: {
            id: +id,
        },
        data,
    });
    res.json(result);
}));
exports.orderRouter.get("/status/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderStatusId } = req.params;
    const result = yield prisma.order.findMany({
        where: {
            orderStatusId: +orderStatusId,
        },
    });
    res.json(result);
}));
