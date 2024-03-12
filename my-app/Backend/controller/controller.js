const Users = require('../models/model')
const Orders = require('../models/model')
const Products = require('../models/model')
const mongoose = require('mongoose')

/*
helper function to check if email exists
Params: emailtocheck
Returns: true if email exists, false otherwise
*/
const emailExists = async (emailToCheck) => {
    const email = await Users.findOne({ email: emailToCheck })
    if (email) {
        return true
    }
    return false;
}

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

//--------------------------------------------------------------Users--------------------------------------------------------------
/*
Get all users
Params: none 
Returns: all users
URL: /StoreApp/Users
*/
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
/*
Get one user by name
Params: name
Returns: user with that name
URL: /StoreApp/Users/:name
*/
const getOneUser = async (req, res) => {
    try {
        const user = await Users.findOne({ name: req.params.name })
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
/*
Add a user
Params: user object in request body
Returns: result of adding user
URL: /StoreApp/Users
*/
const addUser = async (req, res) => {
    if (await emailExists(req.body.email)) {
        res.status(400).json({ message: 'Email already exists' })
    }
    let emptyFields = []
    if (!req.body.email) {
        emptyFields.push('email')
    }
    if (!req.body.name) {
        emptyFields.push('name')
    }
    if (!req.body.phoneNum) {
        emptyFields.push('phoneNum')
    }
    if (!req.body.address) {
        emptyFields.push('address')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const newUser = await Users.create(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}