const mongoose = require('../server/node_modules/mongoose');

const Schema = mongoose.Schema

const ProductsSchema = new Schema({
    ID: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
  }, { timestamps: true })

    module.exports = mongoose.model('Products', ProductsSchema)