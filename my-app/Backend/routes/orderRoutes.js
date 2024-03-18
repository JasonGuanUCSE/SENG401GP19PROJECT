const express = require('../server/node_modules/express')
const {
    getAllOrders,
    getOrderByEmail,
    addOrder,
    deleteOrder,
    updateOrder
} = require('../controller/orders');

const router = express.Router()

router.get('/', getAllOrders)
router.get('/:email', getOrderByEmail)
router.post('/', addOrder)
router.delete('/:ID/:email', deleteOrder)
router.patch('/:ID/:email', updateOrder)

module.exports = router