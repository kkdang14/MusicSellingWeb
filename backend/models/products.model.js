const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a product title"],
            trim: true,
        },

        artist: {
            type: String,
            trim: true,
        },

        desc: {
            type: String,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: [0, "Price must be a non-negative number"],
        },

        image: {
            type: String,
        },
            
        category: {
            type: String,
            required: [true, "Please enter a category"],
            trim: true,
        },
    },

    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;