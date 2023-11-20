const Users = require("../models/users.model");
const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const createUser = asyncHandler(async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ massage: `Error! ${error}` });
    }
})

const getAll = asyncHandler(async (req, res) => {
    try {
        const user = await Users.find({});
        res.status(200).json(user);
    } catch {
        res.status(500).json({ massage: "Error!" });
    }
})

const getOne = asyncHandler(async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        if (!user) {
            res.status(404).json({ message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json(user);
    } catch {
        res.status(500).json({ massage: "Error!" });
    }
})

const updateOne = asyncHandler(async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            res.status(404).json({ message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json({ message: "User profile was updated" });
    } catch {
        res.status(500).json({ massage: "Error!" });
    }
})

const updateFavorite = asyncHandler(async (req, res) => {
    try {
        // Assuming you have a method in your UserService to update favorites
        const response = await Users.findByIdAndUpdate(req.params.id, req.body.favorite);
        res.status(200).json({ message: 'Favorites updated successfully', response});
    } catch (error) {
        console.error('Error updating favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const updateCart = asyncHandler(async (req, res) => {
    try {
        // Assuming you have a method in your UserService to update favorites
        const response = await Users.findByIdAndUpdate(req.params.id, req.body.cart);
        res.status(200).json({ message: 'Cart updated successfully', response });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const deleteProductFromCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const productIdToDelete = req.params.productId;

        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Filter out the product to be deleted from the user's cart
        user.cart = user.cart.filter((item) => item.productId.toString() !== productIdToDelete);

        // Update the user document in the database
        const response = await Users.findByIdAndUpdate(userId, { cart: user.cart });

        res.status(200).json({ message: 'Product deleted from cart successfully', response });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const deleteOne = asyncHandler(async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id, req.body)
        if (!user) {
            res.status(404).json({ message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json({ message: `User with ${req.params.id} was deleted` });
    } catch {
        res.status(500).json({ massage: "Error!" });
    }
})

const deleteAll = asyncHandler(async (req, res) => {
    try {
        const result = await Users.deleteMany({});
        res.status(200).json({message:`Deleted ${result.deletedCount} users.`});
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    createUser,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    deleteAll,
    updateFavorite,
    updateCart,
    deleteProductFromCart
}