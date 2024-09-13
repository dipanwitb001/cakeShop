import Product from "../model/product.model.js";
import mongoose from 'mongoose';


export const addProducts = async (req, res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image){
        return res
        .status(400)
        .json({
            success: false,
            message: "Please provide all fields"
        });
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res
        .status(201)
        .json({
            success: true,
            data: newProduct,
        });
    }catch(err){
        console.log("Error in creating new product: ", err.message);
        res
        .status(500)
        .json({
            success: false,
            message: "Server Error"
        });
    }
};

export const updateProducts = async (req, res) => {
    const { id} = req.params;

    const product = req.body;
    // console.log(product.data);

    // if(product.data==null){
    //     return res
    //         .status(402)
    //         .json({
    //             success: false,
    //             message: " Product doesnt exists"
    //         })
    // }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res
            .status(404)
            .json({
                success: false,
                message: "Invalid Product Id"
            })
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); //if new:true is not mentioned, then findByIdAndUpdate method will return the old record(the one before update)
        res
        .status(200)
        .json({
            success: true,
            data: updatedProduct
        });
    }catch(err){
        res
        .status(500)
        .json({
            success:false,
            message: "Server Error"
        });
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    //console.log("id :",id);

    try{
        await Product.findByIdAndDelete(id);
        res
        .status(200)
        .json({
            success: true,
            message: "Product deleted successfully"
        });
    }catch(err){
        res
        .status(500)
        .json({
            success: false,
            message: "Server Error",
        })
    }
}

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({}); //passing empty object means it will return all the products from the database
        res
        .status(200)
        .json({
            success: true,
            data: products
        });
    }catch(err){
        console.log("error in fetching products: ", err.message);
        res
        .status(500)
        .json({
            success: false,
            message: "Server Error"
        })
    }
}