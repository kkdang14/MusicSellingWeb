const Users = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, cart: user.cart, favorite: user.favorite, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
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

        res.json({ token, user: { _id: user._id, username: user.username, cart: user.cart, favorite: user.favorite, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    login,
};