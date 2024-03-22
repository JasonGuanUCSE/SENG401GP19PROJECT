const express = require('express');
const {
    handleGet,
    handlePost,
    handleDelete,
    handlePatch
} = require('./eventController');

const router = express.Router()

router.get('/', handleGet)
router.post('/', handlePost)
router.delete('/', handleDelete)
router.patch('/', handlePatch)

module.exports = router


