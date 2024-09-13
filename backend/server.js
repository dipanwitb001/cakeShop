import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './model/product.model.js';
import mongoose from 'mongoose';
import productRoutes from "./routes/product.route.js"
import cors from 'cors';
dotenv.config();

const app = express();

// app.get('/', (req, res) => {
//     //res.send('Welcome to website 122');

// });

const PORT = process.env.PORT || 5000;
app.use(express.json()); //allows us to accept JSON data in the req.body

//app.use(cors())

app.use("/api/products",productRoutes)


app.listen(5000, () => {
    connectDB()
    console.log('Server started at http://localhost:'+PORT);
});