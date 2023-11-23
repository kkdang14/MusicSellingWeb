const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },


    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
    },

    message: {
        type: String,
    }

});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
