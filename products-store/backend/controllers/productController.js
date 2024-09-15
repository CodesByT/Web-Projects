import express from "express";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

export const getAllProducts = async (request, response) => {
  try {
    const products = await Product.find();
    response.status(200).json({
      status: "success",
      data: {
        data: products,
      },
    });
  } catch (error) {
    return response.status(404).json({
      status: "failure",
      message: error,
    });
  }
};
export const addNewProduct = async (request, response) => {
  const product = request.body;

  if (!product.name || !product.price || !product.image) {
    return response.status(404).json({
      status: "failed",
      message: "Provide the full data",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
  } catch (error) {
    return response.status(500).json({
      status: "failure",
      message: error,
    });
  }

  response.status(200).json({
    status: "success",
    message: {
      data: newProduct,
    },
  });
};
export const deleteProduct = async (request, response) => {
  const productID = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return response.status(404).json({
      status: "failure",
      message: "Invalid product ID",
    });
  }

  try {
    await Product.findByIdAndDelete(productID);
  } catch (error) {
    return response.status(404).json({
      status: "failure",
      message: "Not found",
    });
  }

  response.status(200).json({
    status: "success",
  });
};
export const updateProduct = async (request, response) => {
  const productID = request.params.id;
  const product = request.body;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return response.status(404).json({
      status: "failure",
      message: "Invalid product ID",
    });
  }

  try {
    await Product.findByIdAndUpdate(productID, product);
  } catch (error) {
    return response.status(404).json({
      status: "failure",
      message: error,
    });
  }

  response.status(200).json({
    status: "success",
  });
};
