import Products from "../models/Products.js";
import mongoose from "mongoose";



const cart = [];



export const createProduct = async (req, res) => {

    try {
        const { name, price, quantity } = req.body;
        const product = new Products({ name, price, quantity });
        await product.save();

        res.status(200).json({ success: true, message: "Product Created", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "failed" })
    }
}



export const getAllProduct = async (req, res) => {

    try {
        const { name, price, quantity } = req.body;
        const products = await Products.find();

        res.status(200).json({ success: true, message: "get all products", data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }
}


export const addToCart = async (req, res) => {

    try {
        const { productId, quantity } = req.params;
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (quantity > product.quantity) {
            return res.status(404).json({ success: false, message: "Requested quantity exceeds" });
        }


        //add to cart function

        cart.push({
            productId,
            name: product.name,
            price: product.price,
            quantity: Number(quantity),
        })

        res.status(404).json({ success: true, message: "Product added to cart successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }
}


export const viewCartProduct = async (req, res) => {

    if (cart.length === 0) {
        return res.status(404).json({ success: false, message: "Cart is empty" })
    }
    res.json(cart);
}



export const deleteFromCart = async (req, res) => {

    const { productId } = req.params;

    const index = cart.findIndex(item => item.productId === productId);

    if (index !== -1) {
        cart.splice(index, 1);

        return res.status(200).json({ success: true, message: "item removed from cart" })
    } else {
        return res.status(404).json({ success: false, message: "item not found in cart" })
    }


}



export const totalPrice = async (req, res) => {

    console.log(cart);

    if (cart.length === 0) {
        return res.status(404).json({ success: false, message: "cart empty" })
    }

    try {
    

        const totalprice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        res.json({ totalprice });

    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }


}






