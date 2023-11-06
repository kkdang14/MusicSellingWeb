const express = require("express")
const products = require("../controllers/products.controller")
const upload = require("../middlewares/upload")

const router = express.Router()

router.post('/',upload.single('image'), products.createProduct)
router.get('/', products.getAll)
router.get('/:id', products.getOne)
router.put('/:id', products.updateOne)
router.delete('/:id', products.deleteOne)
router.delete('/', products.deleteAll)
module.exports = router;