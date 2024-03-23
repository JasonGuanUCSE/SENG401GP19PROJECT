const mongoose = require('../node_modules/mongoose');

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    customerEmail: {
      type: String,
      required: true
    },
    customerName: {
        type: String,
        required: true
    },
    productID: [{
        type: Number,
        required: true
    }],
    quantity: [{
      type: Number,
      required: true
    }],
    totalPrice: {
      type: Number,
      required: true
    },
    date: {
        type: Date,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
  }, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)