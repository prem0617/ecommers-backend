import { Request, Response } from "express";
import categoryModel from "../models/category.model";

export const addCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const isCategoryAlreadyExist = await categoryModel.findOne({
      name: name.toLowerCase(),
    });

    if (isCategoryAlreadyExist) {
      res.status(400).json({ message: "Category already exists" });
      return;
    }

    const newCategory = new categoryModel({ name: name.toLowerCase() });

    await newCategory.save();

    res.json({ newCategory });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const getCategories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allCategories = await categoryModel.find();

    res.json({ allCategories });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const updateCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const isCategoryExists = await categoryModel.findById(id);

    if (!isCategoryExists) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name: name.toLowerCase() },
      { new: true }
    );
    res.json({ updatedCategory });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

export const deleteCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const isCategoryExists = await categoryModel.findById(id);

    if (!isCategoryExists) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    res.json({ deletedCategory });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};
