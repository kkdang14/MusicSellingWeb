const express = require("express");
const products = require("../controllers/products.controller");

const router = express.Router();

router.post('/', products.createProduct)
router.get('/', products.getAll)
router.get('/:id', products.getOne)
router.put('/:id', products.updateOne)
router.delete('/:id', products.deleteOne)

module.exports = router;