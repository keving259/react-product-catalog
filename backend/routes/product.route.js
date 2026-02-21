import express from "express";

import { deleteProduct, getProducts, updateProduct, createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', getProducts); // GET all products
router.post('/', createProduct);
router.put('/:id', updateProduct); // Update a product using PUT method. The PATCH method can also be used
router.delete("/:id", deleteProduct);

export default router;