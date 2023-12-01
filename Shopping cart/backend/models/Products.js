import  mongoose  from "mongoose";

const productSchema = new mongoose.Schema (

    {
        name:String,
        price:Number,
        quantity:Number,
    },
);




export default mongoose.model('Products', productSchema);