import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from './routes/product.route.js';
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Allows to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
