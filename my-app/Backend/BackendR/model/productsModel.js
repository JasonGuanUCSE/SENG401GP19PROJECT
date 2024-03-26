const { Double, Decimal128 } = require('mongodb');
const mongoose = require('../node_modules/mongoose');

const Schema = mongoose.Schema

const ProductsSchema = new Schema({
    id: {
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
      type: Decimal128,
      required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    store: {
        type: Array,
        required: false
    },
    category: {
        type: Array,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    Instock: {
        type: Boolean,
        default: true
    }
  }, { timestamps: true })

    module.exports = mongoose.model('Products', ProductsSchema)