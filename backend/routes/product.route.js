import express from 'express';
import Product from '../model/product.model.js';
import mongoose from 'mongoose';
import { addProducts, deleteProduct, getProducts, updateProducts } from '../controllers/product.controller.js';
const router = express.Router();

router.get("/getProducts", getProducts);

router.post("/add", addProducts);

router.put("/update/:id", updateProducts);


router.post("/delete/:id", deleteProduct);

export default router;