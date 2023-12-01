import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import productRoutes from './routes/productRoutes.js';

const app = express();
const port = 4000;

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://anuragp212:12345@cluster0.vhnjvvz.mongodb.net/');
        console.log("Mongodb Database connected");
    } catch (err) {
        console.log("Database connection failed");
    }
}

app.get('/', (req,res) => {
    res.json("server online")
});


app.use(express.json());
app.use(cors({
    origin:true,
}))

app.use('/products', productRoutes)



app.listen(port, () => {
    connect();
    console.log("server running successfully on port", port);
})