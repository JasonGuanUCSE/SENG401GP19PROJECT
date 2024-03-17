const express = require('express')
const {
    getAllUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser
} = require('../controller/users');
const {
    getAllOrders,
    getOrderByEmail,
    addOrder,
    deleteOrder,
    updateOrder
} = require('../controller/orders');
const {
    getAllProducts,
    getOneProduct,
    addProduct,
    deleteProduct,
    updateProduct
} = require('../controller/products');


const router = express.Router()

router.get('/Users', getAllUsers)
router.get('/Users/:email', getOneUser)
router.post('/Users', addUser)
router.delete('/Users/:email', deleteUser)
router.patch('/Users/:email', updateUser)

router.get('/Orders', getAllOrders)
router.get('/Orders/:email', getOrderByEmail)
router.post('/Orders', addOrder)
router.delete('/Orders/:email', deleteOrder)
router.patch('/Orders/:email', updateOrder)

router.get('/Products', getAllProducts)
router.get('/Products/:ID', getOneProduct)
router.post('/Products', addProduct)
router.delete('/Products/:ID', deleteProduct)
router.patch('/Products/:ID', updateProduct)

module.exports = router