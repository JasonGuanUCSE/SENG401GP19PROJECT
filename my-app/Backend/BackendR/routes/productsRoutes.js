const express = require('express')
const {
    getAllProducts,
    getOneProduct,
    getProductsByCategory,
    getProductsByStore,
    getProductsByBoth,
    addProduct,
    deleteProduct,
    updateProduct
} = require('../controller/products');

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getOneProduct)
router.get('/category/:category', getProductsByCategory)
router.get('/store/:store', getProductsByStore)
router.get('/category/:category/store/:store', getProductsByBoth)
router.post('/', addProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', updateProduct)

module.exports = router