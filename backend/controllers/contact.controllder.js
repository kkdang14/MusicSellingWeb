const Contacts = require("../models/contact.model");
const asyncHandler = require('express-async-handler');

const recieveContact = asyncHandler(async(req, res) => {
    try {
        const contact = await Contacts.create(req.body)
        res.status(200).json({ message: 'Contact was sent', contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getAllContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contacts.find({})
        res.status(200).json(contact);
    } catch {
        res.status(500).json({ massage: "Error!" });
    }
})

module.exports = {
    recieveContact,
    getAllContact
}