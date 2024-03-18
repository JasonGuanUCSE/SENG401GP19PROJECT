const mongoose = require('../server/node_modules/mongoose');
const Order = require('../model/orderModel');

/*
Get all orders
Params: none
Returns: all orders
URL: /api/Jstacart/Orders
*/
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 })
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Get all order by customer email
Params: email
Returns: order with that email
URL: /api/Jstacart/Orders/:email
*/
const getOrderByEmail = async (req, res) => {
    try {
        const order = await Order.find({ customerEmail: req.params.email })
        .sort({ date: -1 }).toArray()
        res.status(200).json(order)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Add an order
Params: order object in request body
Returns: result of adding order
URL: /api/Jstacart/Orders
*/
const addOrder = async (req, res) => {
    let emptyFields = []
    //check if the email is valid
    if (!req.body.customerEmail.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email' })
    }
    if (!req.body.customerEmail) {
        emptyFields.push('customerEmail')
    }
    if (!req.body.customerName) {
        emptyFields.push('customerName')
    }
    if (!req.body.productID) {
        emptyFields.push('productID')
    }
    if (!req.body.quantity) {
        emptyFields.push('quantity')
    }
    if (!req.body.totalPrice) {
        emptyFields.push('totalPrice')
    }
    if (!req.body.date) {
        req.body.date = new Date()
    }
    if (!req.body.paymentMethod) {
        emptyFields.push('paymentMethod')
    }
    if (!req.body.store) {
        emptyFields.push('store')
    }
    if (!req.body.status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        res.status(400).json({ message: 'The following fields are required: ' + emptyFields.join(', ') })
        return
    }
    try{
        const newOrder = await Order.create(req.body)
        res.status(201).json(newOrder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/*
Delete an order
Params: ID, email
Returns: result of deleting order
URL: /api/Jstacart/Orders/:ID/:email
*/
const deleteOrder = async (req, res) => {
    //verify if the id valid
    if (!mongoose.Types.ObjectId.isValid(req.params.ID)) {
        return res.status(400).json({ error: 'Invalid ID' })
    }
    try {
        const order = await Order.findOne({ _id: req.params.ID, customerEmail: req.params.email })
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        const deletedOrder = await order.deleteOne({ _id: req.params.ID });
        res.status(200).json(deletedOrder)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Update an order
Params: ID, email, order object in request body
Returns: result of updating order
URL: /api/Jstacart/Orders/:ID/:email
*/
const updateOrder = async (req, res) => {
    //verify if the id valid
    if (!mongoose.Types.ObjectId.isValid(req.params.ID)) {
        return res.status(400).json({ error: 'Invalid ID' })
    }
    try {
        const order = await Order.findOne({ _id: req.params.ID, customerEmail: req.params.email })
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        const updatedOrder = await Order.updateOne({ _id: req.params.ID }, req.body)
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllOrders,
    getOrderByEmail,
    addOrder,
    deleteOrder,
    updateOrder
}