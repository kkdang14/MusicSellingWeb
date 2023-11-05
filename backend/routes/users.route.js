const express = require("express");
const users = require("../controllers/users.controller");

const router = express.Router();

router.post('/', users.createProduct)
router.get('/', users.getAll)
router.post('/login', users.login)
router.get('/:id', users.getOne)
router.put('/:id', users.updateOne)
router.delete('/:id', users.deleteOne)

module.exports = router;