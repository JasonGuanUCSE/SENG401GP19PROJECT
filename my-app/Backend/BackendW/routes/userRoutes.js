const express = require('express')
const {
    getAllUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser
} = require('../controller/users');


const router = express.Router()

router.get('/', getAllUsers)
router.get('/:name', getOneUser)
router.post('/', addUser)
router.delete('/:email', deleteUser)
router.patch('/:email', updateUser)

module.exports = router