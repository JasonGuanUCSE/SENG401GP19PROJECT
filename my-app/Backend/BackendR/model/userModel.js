const mongoose = require('../node_modules/mongoose');

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
      required: false
    },
    address: {
      type: String,
      required: false
    }
  }, { timestamps: true })

module.exports = mongoose.model('Users', UsersSchema)