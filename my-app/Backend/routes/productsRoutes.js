const express = require('../server/node_modules/express')
const {
    getAllProducts,
    getOneProduct,
    addProduct,
    deleteProduct,
    updateProduct
} = require('../controller/products');

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:ID', getOneProduct)
router.post('/', addProduct)
router.delete('/:ID', deleteProduct)
router.patch('/:ID', updateProduct)

module.exports = router