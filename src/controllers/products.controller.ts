import { Request, Response } from "express";
import productModel from "../models/product.model";
import categoryModel from "../models/category.model";

export const addProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, description, stock, salesCount, categoryId } =
      req.body;

    console.log(categoryId);

    // Check if category exists
    const categoryExists = await categoryModel.findById(categoryId);
    if (!categoryExists) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const isProductAlreadyExists = await productModel.findOne({
      name: name.toLowerCase(),
    });

    if (isProductAlreadyExists) {
      res.status(400).json({ message: "Product already exists" });
      return;
    }

    const newProduct = await productModel.create({
      name: name.toLowerCase(),
      price,
      description,
      category: categoryId,
      stock: stock || 0,
      salesCount: salesCount || 0,
    });

    await newProduct.save();

    res.json({ newProduct });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};

export const getProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allProcucts = await productModel.find();

    res.json({ allProcucts });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, description, stock, salesCount, categoryId } =
      req.body;

    const isProductExists = await productModel.findById(id);

    if (!isProductExists) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name: name.toLowerCase(),
        price: price,
        description,
        stock,
        salesCount: salesCount || 0,
        category: categoryId,
      },
      { new: true }
    );
    res.json({ updatedProduct });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const isProductExists = await productModel.findById(id);

    if (!isProductExists) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);
    res.json({ deletedProduct });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};
