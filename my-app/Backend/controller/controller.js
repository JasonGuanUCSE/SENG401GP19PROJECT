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
