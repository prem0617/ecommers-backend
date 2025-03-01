import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares";
import productModel from "../models/product.model";
import orderModel from "../models/order.model";

interface Product {
  product: string;
  quantity: number;
}

export const placeOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req?.user;

    // console.log(user);

    if (!user) {
      res.status(401).json({ message: "User is not authenticated" });
      return;
    }

    const { products } = req.body;

    let totalPrice = 0;

    for (const product of products) {
      const findProduct = await productModel.findById(product.product);
      if (!findProduct) {
        throw new Error(`Product ${product.product} not found`);
      }
      totalPrice += findProduct.price * product.quantity;
    }

    // console.log(totalPrice);

    const newOrder = await orderModel.create({
      user: user.id,
      products,
      totalPrice,
      status: "pending",
    });

    await newOrder.save();

    res.json({ newOrder });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const user = req?.user;

    if (!user) {
      res.status(401).json({ message: "User is not authenticated" });
      return;
    }

    const allOrders = await orderModel.find({ user: user.id });

    res.json({ allOrders });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};
