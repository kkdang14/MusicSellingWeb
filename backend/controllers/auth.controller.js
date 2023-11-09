const Users = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, 'your_secret_key', { expiresIn: '1h' });
    return token;
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user with the provided username exists
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If both username and password are valid, generate a token
        const token = generateAuthToken(user);

        res.json({ token, user: { _id: user._id, username: user.username, isAdmin: user.isAdmin } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const register = async (req, res) => {
//     try {
//         const user = await Users.create(req.body);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Tìm người dùng dựa trên username
//         const user = await Users.findOne({ username });

//         if (!user) {
//             return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
//         }

//         // So sánh mật khẩu
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Mật khẩu không đúng' });
//         }

//         // Tạo và gửi token
//         const token = jwt.sign({ userId: user._id }, 'yourSecretKeyHere', { expiresIn: '1h' });
//         res.status(200).json({ message: 'Đăng nhập thành công', token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Lỗi server' });
//     }
// }


module.exports = {
    login,
};