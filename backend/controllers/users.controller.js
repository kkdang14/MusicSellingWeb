const Users = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createProduct = async (req, res) =>{
    try {
        const user = await Users.create(req.body);
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({massage: `Error! ${error}`});
    } 
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm người dùng dựa trên username
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        // Tạo và gửi token
        const token = jwt.sign({ userId: user._id }, 'yourSecretKeyHere', { expiresIn: '1h' });
        res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
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
    deleteOne,
    login
}