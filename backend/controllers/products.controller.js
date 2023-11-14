const Products = require("../models/products.model");
const asyncHandler = require("express-async-handler");
// const upload = require('../middlewares/upload');
// const path = require('path')

const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Products.create({
            ...req.body,
            image: req.file ? req.file.filename : null
        });

        res.status(200).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getAll = asyncHandler(async (req, res) =>{
    try {
        const product = await Products.find({});
        res.status(200).json(product);
    } catch(error){
        res.status(500);
        throw new Error(error.message)
    }
})

const getOne = asyncHandler(async (req, res) =>{
    try {
        const product = await Products.findById(req.params.id)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json(product);
    } catch(error){
        res.status(500);
        throw new Error(error.message)
    }
})

const updateOne = asyncHandler(async (req, res) =>{
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json({message: "Product was updated"});
    } catch(error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const deleteOne = asyncHandler(async (req, res) =>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id, req.body)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json({message: `Product with ID: ${req.params.id} was deleted`});
    } catch(error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const deleteAll = asyncHandler(async (req, res) => {
    try {
        const result = await Products.deleteMany({});
        res.status(200).json({message:`Deleted ${result.deletedCount} products.`});
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    createProduct,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    deleteAll
} 