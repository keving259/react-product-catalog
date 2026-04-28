import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 6, 
            search = '',
            sort = 'newest',
            minPrice,
            maxPrice,
            onlyStock
        } = req.query;

        let query = {};

        if (search) query.name = { $regex: search, $options: 'i' };

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (onlyStock === 'true') query.stock = { $gt: 0 };

        let sortOption = {};
        if (sort === 'priceAsc') sortOption.price = 1;
        else if (sort === 'priceDesc') sortOption.price = -1;
        else sortOption.createdAt = -1;
        const products = await Product.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        
        const total = await Product.countDocuments(query);

        res.status(200).json({ 
            success: true, 
            data: products, 
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req,res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error('Error in Create product:', error.message);
        res.status(500).json({ success: false, message: "Server Error"}); // 500 internal server error
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    console.log("id:", id);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ sucess: true, message: "Product deleted" });        
    }
    catch (error) {
        console.log("error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};