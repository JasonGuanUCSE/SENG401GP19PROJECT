const express = require('express');
const {
    addEvent,

} = require('./eventController');

const router = express.Router()

router.post('/', addEvent)

module.exports = router


