const mongoose = require('../node_modules/mongoose');
const Users = require('../model/userModel');
// const axios = require('axios');

// const fetch = require('node-fetch');

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
Get all users
Params: none 
Returns: all users
URL: /api/Jstacart/Users
*/
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({})
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
/*
Get one user by name
Params: name
Returns: user with that name
URL: /api/Jstacart/Users/:name
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
URL: /api/Jstacart/Users
*/
const addUser = async (req, res) => {
    if (await emailExists(req.body.email)) {
        res.status(400).json({ message: 'Email already exists' })
        return
    }
    let emptyFields = []
    //check if the email is valid
    if (!req.body.email.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email' })
    }
    if (!req.body.email) {
        emptyFields.push('email')
    }
    if (!req.body.name) {
        emptyFields.push('name')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const newUser = await Users.create(req.body)
        res.status(201).json(newUser)

        // //Update the Read database
        // await updateReadDB(newUser);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/*
Delete a user
Params: email
Returns: result of deleting user
URL: /api/Jstacart/Users/:email
*/
const deleteUser = async (req, res) => {
    try {
        //check if user exists
        const check = await emailExists(req.params.email);
        if (!check) {
            return res.status(400).json({ message: 'User does not exist' })
        }else{
            const user = await Users.deleteOne({ email: req.params.email })
            res.status(200).json(result);
        }
        // //Update the Read database
        // await updateReadDB({ action: 'delete', email: req.params.email });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/*
Update a user
Params: email
Returns: result of updating user
URL: /api/Jstacart/Users/:email
*/
const updateUser = async (req, res) => {
    try {
        //check if user exists
        const check = await emailExists(req.params.email);
        if (!check) {
            return res.status(400).json({ message: 'User does not exist' })
        }else{
            const user = await Users.updateOne({ email: req.params.email }, req.body)
            res.status(200).json(result);
        }
        // //update the Read database
        await updateReadDB(req.body, 'user',  'POST');
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//helper function to update the other database
const updateReadDB= async (data, collection, method) => {
    console.log(data);
    console.log(collection);
    console.log(method);
    try {
        const response = await fetch('https://seng401gp19project.onrender.com/api/Jstacart/', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "collection": collection,
                "sender": 'database'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update other database');
        }
    } catch (error) {
        console.error('Error updating other database:', error);
    }
};
module.exports = {
    getAllUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser
}