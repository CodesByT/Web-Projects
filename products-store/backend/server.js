import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // allows to accept json data in request.body

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log("Server is listening...");

  connectDB();
});
