const mongoose = require('mongoose');

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
    collection: {
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
        required: false
    }
  }, { timestamps: true })

module.exports = mongoose.model('Event', EventSchema)