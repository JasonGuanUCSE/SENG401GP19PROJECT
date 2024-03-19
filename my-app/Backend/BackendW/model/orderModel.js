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
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    }],
    quantity: {
      type: Array,
      required: true
    },
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
        required: true
    },
    status: {
        type: String,
        required: true
    }
  }, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)