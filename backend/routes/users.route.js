const express = require("express");
const users = require("../controllers/users.controller");
const auth = require("../controllers/auth.controller")
const router = express.Router();

router.post('/', users.createUser)
router.get('/', users.getAll)
router.get('/:id', users.getOne)
router.put('/:id', users.updateOne)
router.delete('/:id', users.deleteOne)
router.delete('/', users.deleteAll)
router.put('/:id', users.updateFavorite)
router.put('/:id', users.updateCart)
router.put('/:id', users.deleteProductFromCart)

router.post('/login', auth.login)

module.exports = router;