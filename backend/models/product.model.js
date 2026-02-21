import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        requiered: true
    },
    price: {
        type: Number,
        requiered: true
    },
    image: {
        type: String,
        requiered: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
