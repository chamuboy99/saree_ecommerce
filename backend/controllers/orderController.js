import Order from '../models/order.js';
import Saree from '../models/sarees.js';

export const createOrder = async (req, res) => {
    try {
        const { customerName, phoneNumber, address, notes, items } = req.body;

        if (!customerName || !phoneNumber || !address) {
            return res.status(400).json({
                success: false,
                message: 'Customer details are missing'
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty."
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (let item of items) {
            const saree = await Saree.findById(item.productId);

            if (!saree || !saree.isActive) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found.`
                });
            }

            orderItems.push({
                product: saree._id,
                name: saree.name,
                price: saree.price,
                quantity: item.quantity,
                image: saree.image || ""
            });

            totalAmount += saree.price * item.quantity;
        }

        const order = await Order.create({
            customerName,
            phoneNumber,
            address,
            notes,
            items: orderItems,
            totalAmount
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}