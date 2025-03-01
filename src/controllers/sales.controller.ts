import { Request, Response } from "express";
import productModel from "../models/product.model";
import categoryModel from "../models/category.model";

export const topSelling = async (_req: Request, res: Response) => {
  try {
    const product = await productModel.find().sort({ salesCount: -1 }).limit(5);

    res.json({ topSellingProduct: product });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const worstSelling = async (_req: Request, res: Response) => {
  try {
    const product = await productModel.find().sort({ salesCount: 1 }).limit(5);

    res.json({ topSellingProduct: product });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const salesCategoryWise = async (_req: Request, res: Response) => {
  try {
    let salesByCategories = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          salesCount: { $sum: "$salesCount" },
        },
      },
    ]);

    res.json({ salesByCategories });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
