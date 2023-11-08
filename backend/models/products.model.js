const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a product name"]
        },

        artist: {
            type: String,
        },

        desc: {
            type: String,
        },

        price: {
            type: Number,
            required: true
        },

        image: {
            type: String,
            required: false
        },
            
        category: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;