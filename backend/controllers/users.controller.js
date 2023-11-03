const Users = require("../models/users.model");

const createProduct = async (req, res) =>{
    try {
        const user = await Users.create(req.body);
        res.status(200).json(user);
    } catch{
        res.status(500).json({massage: "Error!"});
    } 
}

const getAll = async (req, res) =>{
    try {
        const user= await Users.find({});
        res.status(200).json(user);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
}

const getOne = async (req, res) =>{
    try {
        const user = await Users.findById(req.params.id)
        if(!user){
            res.status(404).json({message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json(user);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
}

const updateOne = async (req, res) =>{
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body)
        if(!user){
            res.status(404).json({message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json({message: "User profile was updated"});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
}

const deleteOne = async (req, res) =>{
    try {
        const user = await Users.findByIdAndDelete(req.params.id, req.body)
        if(!user){
            res.status(404).json({message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json({message: `User with ${req.params.id} was deleted`});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
}

module.exports = {
    createProduct,
    getAll,
    getOne,
    updateOne,
    deleteOne
}