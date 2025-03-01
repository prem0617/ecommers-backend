import { Request, Response } from "express";
import productModel from "../models/product.model";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const allProducts = await productModel.find();
    res.json({ allProducts });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.json({ product });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};
