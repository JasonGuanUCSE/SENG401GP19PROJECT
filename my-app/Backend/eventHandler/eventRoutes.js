const express = require('express');
const {
    handleGet,
} = require('./eventController');

const router = express.Router()

router.get('/', handleGet)

module.exports = router


