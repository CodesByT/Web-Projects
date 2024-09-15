import express from "express";
import {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").post(addNewProduct).get(getAllProducts);

router.route("/:id").delete(deleteProduct).patch(updateProduct);

export default router;
