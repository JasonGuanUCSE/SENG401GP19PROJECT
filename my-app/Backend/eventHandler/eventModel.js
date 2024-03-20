const mongoose = require('../node_modules/mongoose');

const Schema = mongoose.Schema

const EventSchema = new Schema({
    from: {
      type: String,
      required: true
    },
    to: {
        type: String,
        required: true
    },
    method: {
      type: String,
      required: true
    },
    body: {
      type: Object,
      required: false
    },
    respond: {
        type: Object,
        required: true
    }
  }, { timestamps: true })

module.exports = mongoose.model('Event', EventSchema)