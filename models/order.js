import mongoose from "mongoose";
import Product from "./product.js";

const orderSchema = new mongoose.Schema({

    orderId : {
        type : String,
        required : true,
        unique : true
    },

    date : {
        type : Date,
        required : true,
        default : Date.now
    },

    email : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    status : {
        type : String,
        required : true,
        default : "Pending"
    },

    phoneNumber : {
        type : String,
        required : true
    },

    billItems : {
        type : [
            {
                ProductId : String,
                productName : String,
                image : String,
                quntity : Number,
                price : Number
            }
        ],
        required : true
        
    },

    total : {
        type : Number,
        required : true
    }

})

const Order = mongoose.model("Order",orderSchema);

export default Order;


