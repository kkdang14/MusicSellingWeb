const Products = require("../models/products.model");

const createProduct = async (req, res) => {
    let uploadedFilename;

    if (req.file) {
        uploadedFilename = req.file.path; 
    }

    try {
        const productData = {
            ...req.body,
            image: uploadedFilename, // Assuming you have an 'imageUrl' field in your product model
        };
        const product = await Products.create(productData);
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({massage: "Error!"});
    } 
}

const getAll = async (req, res) =>{
    try {
        const product = await Products.find({});
        res.status(200).json(product);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
}

const getOne = async (req, res) =>{
    try {
        const product = await Products.findById(req.params.id)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json(product);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
}

const updateOne = async (req, res) =>{
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json({message: "Product was updated"});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
}

const deleteOne = async (req, res) =>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id, req.body)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json({message: `Product with ID: ${req.params.id} was deleted`});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
}

const deleteAll = async (req, res) => {
    try {
        const result = await Products.deleteMany({});
        res.status(200).json({message:`Deleted ${result.deletedCount} products.`});
    } catch (error) {
        console.log(error)
        res.status(500).json({massage: "Error!"});
    }
}

module.exports = {
    createProduct,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    deleteAll
}