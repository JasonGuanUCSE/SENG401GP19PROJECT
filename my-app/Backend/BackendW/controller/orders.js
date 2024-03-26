const mongoose = require('../node_modules/mongoose');
const Order = require('../model/orderModel');
const Product = require('../model/productsModel');
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


const getOrderByID = async (req, res) => {
    try {
        const order = await Order.findOne({ orderID: req.params._id })
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        res.status(200).json(order)
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
    if (!req.body.orderID) {
        emptyFields.push('orderID')
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
    if (!req.body.date) {
        req.body.date = new Date()
    }
    if (!req.body.paymentMethod) {
        emptyFields.push('paymentMethod')
    }
    if (!req.body.status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        res.status(400).json({ message: 'The following fields are required: ' + emptyFields.join(', ') })
        return
    }
    //check if the orderID exists, if yes, retry with a new orderID, use the first 5 char and add date.now(), try until not exists
    let orderID = req.body.orderID
    while (await Order.findOne({ orderID: orderID })) {
        orderID = orderID.substring(0, 5) + Date.now()
    }
    req.body.orderID = orderID
    //loop through the products and check if they exist, and update the quantity
    let totalPrice = 0
    try{
        if (req.body.productID && req.body.quantity && req.body.productID.length === req.body.quantity.length 
            && req.body.status === 'paid'){
            const promises = req.body.productID.map(async (productId, index) => {
                const product = await Product.findOne({ id: productId });
                const newQuantity = product.quantity - req.body.quantity[index];
                console.log(newQuantity);
                if (newQuantity < 0) {
                    throw new Error('Not enough stock');
                } else if (newQuantity === 0) {
                    await Product.updateOne({ id: productId }, { quantity: newQuantity, Instock: false });
                } else {
                    await Product.updateOne({ id: productId }, { quantity: newQuantity });
                }
                totalPrice += product.price * req.body.quantity[index];
            });
            await Promise.all(promises);}
        
        req.body.totalPrice = totalPrice
        const newOrder = await Order.create(req.body)
        res.status(201).json(newOrder)

        //update the Read database
        await updateReadDB(req.body, 'orders',  'POST');

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
    //verify if the id valid, 5 letters and a result from date.now(), use regular expression
    if (!/^[a-zA-Z0-9]{5}\d+$/.test(req.params.ID)) {
        return res.status(400).json({ error: 'Invalid ID' })
    }

    console.log("email: "+ req.param.email)
    console.log("ID: "+ req.params.ID)
    try {
        const order = await Order.findOne({ orderID: req.params.ID, customerEmail: req.params.email })
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        const deletedOrder = await order.deleteOne({ orderID: req.params.ID });
        res.status(200).json(deletedOrder)

        let body = {
            orderID: req.params.ID,
            customerEmail: req.params.email
        }
        //update the Read database
        await updateReadDB(body, 'orders',  'DELETE');

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
    //verify if the id valid, 5 letters and a result from date.now(), use regular expression
    if (!/^[a-zA-Z0-9]{5}\d+$/.test(req.params.ID)) {
        return res.status(400).json({ error: 'Invalid ID' })
    }
    try {
        const order = await Order.findOne({ orderID: req.params.ID, customerEmail: req.params.email })
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        //loop through the products and check if they exist, and update the quantity
        if (req.body.status && req.body.status === 'paid' && req.body.productID!==order.productID && req.body.quantity!==order.quantity) {
            for (let i = 0; i < req.body.productID.length; i++) {
                //if req.body.productID[i] is in order.productID, and req.body.quantity[i] === order.quantity[order.productID.indexOf(req.body.productID[i])]
                if (order.productID.includes(req.body.productID[i]) && req.body.quantity[i] === order.quantity[order.productID.indexOf(req.body.productID[i])]) {
                    continue
                }
                if (order.productID.includes(req.body.productID[i]) && req.body.quantity[i] !== order.quantity[order.productID.indexOf(req.body.productID[i])]) {
                    req.body.quantity[i] = req.body.quantity[i]-order.quantity[order.productID.indexOf(req.body.productID[i])]
                }
                let product = {};
                let quantity = 0;
                let inStock = true;
                await Product.findOne({ id:req.body.productID[i] })
                    .then((result) => {
                        product = result
                        quantity = product.quantity-req.body.quantity[i]
                        if (quantity < 0) {
                            return res.status(400).json({ error: 'Not enough stock' })
                        } else if (quantity === 0) {
                            inStock = false
                        }
                        Product.update({ id: req.body.productID[i] }, { quantity: quantity, Instock: inStock })
                    })
            }
        }
        const updatedOrder = await Order.updateOne({ orderID: req.params.ID }, req.body)
        res.status(200).json(updatedOrder)

        //update the Read database
        await updateReadDB(req.body, 'orders',  'PATCH');

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//helper function to update the other database
const updateReadDB= async (data, collection, method) => {
    console.log(data);
    console.log(collection);
    console.log(method);
    try {
        const response = await fetch('https://seng401gp19project-gbhb.onrender.com/api/Jstacart', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "collection": collection,
                "sender": 'database'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to update other database'+ response.status);
        }
    } catch (error) {
        console.error('Error updating other database:', error);
    }
};

module.exports = {
    getAllOrders,
    getOrderByEmail,
    addOrder,
    deleteOrder,
    updateOrder
}
