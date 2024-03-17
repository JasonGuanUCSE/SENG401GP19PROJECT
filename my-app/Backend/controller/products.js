
const mongoose = require('../server/node_modules/mongoose');
const Products = require('../model/model')

/*
helper function to check if product exists
Params: emailtocheck
Returns: true if email exists, false otherwise
*/
const productExists = async (productToCheck) => {
    const product = await Products.findOne({ _id: productToCheck })
    if (product) {
        return true
    }
    return false;
}

/*
Get all products
Params: none
Returns: all products
URL: /api/Jstacart/Products
*/
const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find().toArray()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Get one product by id
Params: ID
Returns: product with that name
URL: /api/Jstacart/Products/:ID
*/
const getOneProduct = async (req, res) => {
    try {
        const product = await Products.findOne({ ID: req.params.ID })
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Add a product
Params: product object in request body
Returns: result of adding product
URL: /api/Jstacart/Products
*/
const addProduct = async (req, res) => {
    if (await productExists(req.body.ID)) {
        res.status(400).json({ message: 'Product already exists' })
    }
    let emptyFields = []
    if (!req.body.ID) {
        emptyFields.push('ID')
    }
    if (!req.body.name) {
        emptyFields.push('name')
    }
    if (!req.body.price) {
        emptyFields.push('price')
    }
    if (!req.body.quanty) {
        emptyFields.push('quanty')
    }
    if (!req.body.store) {
        emptyFields.push('store')
    }
    if (!req.body.status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        res.status(400).json({ message: `The following fields are empty: ${emptyFields}` })
    }

    try{
        const newProduct = await Products.create(req.body)
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/*
Delete a product
Params: ID
Returns: result of deleting product
URL: /api/Jstacart/Products/:ID
*/
const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findOne({ ID: req.params.ID })
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' })
        }
        await product.remove()
        res.json({ message: 'Product deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Update a product
Params: ID, product object in request body
Returns: result of updating product
URL: /api/Jstacart/Products/:ID
*/
const updateProduct = async (req, res) => {
    try {
        const product = await Products.findOne({ ID: req.params.ID })
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' })
        }
        const products = await Products.updateOne({ ID: req.params.ID }, req.body)
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    addProduct,
    deleteProduct,
    updateProduct
}