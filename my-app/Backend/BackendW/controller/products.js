const mongoose = require('../node_modules/mongoose');
const Products = require('../model/productsModel');

/*
helper function to check if product exists
Params: emailtocheck
Returns: true if email exists, false otherwise
*/
const productExists = async (productToCheck) => {
    const product = await Products.findOne({id: productToCheck })
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
        const products = await Products.find()
        res.status(200).json(products)
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
        const product = await Products.findOne({ id: req.params.id })
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Get all products by category
Params: category
Returns: all products with that category
URL: /api/Jstacart/Products/category/:category
*/
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Products.find({ category: req.params.category })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Get all products by store
Params: store
Returns: all products with that store
URL: /api/Jstacart/Products/store/:store
*/
const getProductsByStore = async (req, res) => {
    try {
        const products = await Products.find({ store: req.params.store })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Get all products by store and category
Params: store, category
Returns: all products with that store
URL: /api/Jstacart/Products/category/:category/store/:store
*/
const getProductsByBoth = async (req, res) => {
    try {
        const products = await Products.find({ store: req.params.store, category: req.params.category })
        res.status(200).json(products)
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
    if (await productExists(req.body.id)) {
        //get the largest ID and add 1
        let newID = await Products.find().sort({ID: -1}).limit(1)
        let message = `Product id already exists. Please use ${newID[0].ID + 1} as the ID`
        res.status(400).json({ message: message})
        return
    }
    let emptyFields = []
    if (!req.body.id) {
        let newID = await Products.find().sort({id: -1}).limit(1)
        req.body.id = newID[0].id + 1
    }
    if (!req.body.name) {
        emptyFields.push('name')
    }
    if (!req.body.price) {
        emptyFields.push('price')
    }
    if (emptyFields.length > 0) {
        res.status(400).json({ message: `The following fields are empty: ${emptyFields}` })
        return
    }else{
        console.log("VAR check finished")
        try{
            const newProduct = await Products.create(req.body)
            res.status(201).json(newProduct)

            //update the Read database
            await updateReadDB(req.body, 'products',  'POST');

        } catch (err) {
            res.status(400).json({ message: err.message })
        }
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
        const product = await Products.findOne({ id: req.params.id })
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' })
        }
        await Products.deleteOne({ id: req.params.id })
        res.status(200).json({ message: 'Product deleted' })

        //update the Read database
        await updateReadDB(req.body, 'products',  'DELETE');

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
        const product = await Products.findOne({ id: req.params.id })
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' })
        }
        if (req.body.quantity && req.body.quantity < 1) {
            req.body.Instock = false
        }
        const result = await Products.updateOne({ id: req.params.id }, req.body)
        res.status(200).json(result);

        //update the Read database
        await updateReadDB(req.body, 'products',  'PATCH');

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
    getAllProducts,
    getOneProduct,
    getProductsByCategory,
    getProductsByStore,
    getProductsByBoth,
    addProduct,
    deleteProduct,
    updateProduct
}