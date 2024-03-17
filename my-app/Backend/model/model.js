const mongoose = require('../server/node_modules/mongoose');

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNum: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true })

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
    quanty: {
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

module.exports = {
    Users: mongoose.model('Users', UsersSchema),
    Products: mongoose.model('Products', ProductsSchema),
    Order: mongoose.model('Order', OrderSchema)
}; // export the models