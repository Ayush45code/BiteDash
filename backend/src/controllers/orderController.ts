import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import type { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { items, customerName, customerEmail, customerAddress, customerPhone, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "No items in order" });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const food = await foodModel.findById(item.food);
            if (!food) {
                return res.json({ success: false, message: `Food item not found: ${item.food}` });
            }
            
            totalAmount += food.price * item.quantity;
            orderItems.push({
                food: food._id,
                quantity: item.quantity
            });
        }

        const order = await orderModel.create({
            items: orderItems,
            totalAmount,
            customerName,
            customerEmail,
            customerAddress,
            customerPhone,
            paymentMethod: paymentMethod || 'cod'
        });

        res.json({ success: true, message: "Order created successfully", data: order });
    } catch (error) {
        res.json({ success: false, message: "Error creating order" });
    }
};

export const listOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderModel.find({})
            .populate('items.food', 'name description price image category')
            .sort({ createdAt: -1 });
        
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: "Error fetching orders" });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.json({ success: false, message: "Order ID and status are required" });
        }

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate('items.food', 'name description price image category');

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order status updated", data: order });
    } catch (error) {
        res.json({ success: false, message: "Error updating order status" });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.json({ success: false, message: "Order ID is required" });
        }

        const order = await orderModel.findByIdAndDelete(orderId);

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error deleting order" });
    }
};
