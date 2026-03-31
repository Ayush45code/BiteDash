import express from "express";
import { createOrder, listOrders, updateOrderStatus, deleteOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/update-status", updateOrderStatus);
orderRouter.post("/delete", deleteOrder);

export default orderRouter;
