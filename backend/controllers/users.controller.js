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

const getClient = asyncHandler(async (req, res) => {
    try {
        const user = await Users.find({ role: "client" });
        res.status(200).json(user);
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
    getClient
}