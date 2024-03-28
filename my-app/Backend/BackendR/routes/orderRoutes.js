const express = require('express')
const {
    getAllOrders,
    getOrderByEmail,
    getOrderByID,
    addOrder,
    deleteOrder,
    updateOrder
} = require('../controller/orders');

const router = express.Router()

router.get('/', getAllOrders)
router.get('/id/:_id', getOrderByID)
router.get('/email/:email', getOrderByEmail)
router.post('/', addOrder)
router.delete('/:ID/:email', deleteOrder)
router.patch('/:ID/:email', updateOrder)

module.exports = router