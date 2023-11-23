const express = require("express");
const contacts = require("../controllers/contact.controllder")
const router = express.Router();

router.post("/", contacts.recieveContact)
router.get("/", contacts.getAllContact)

module.exports = router