import express from 'express';
import { addToCart, createProduct, deleteFromCart, getAllProduct, totalPrice, viewCartProduct } from '../controller/ProductController.js';



const router = express.Router();


router.post('/createproducts', createProduct);
router.get('/getallproducts', getAllProduct);
router.post('/cart/:productId/:quantity', addToCart);
router.get('/cart', viewCartProduct);
router.delete('/cart/:productId', deleteFromCart);
router.get('/cart/total', totalPrice);


export default router;
