const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  vendor: {
    type: 'String',
    required: true
  },
  description: {
    type: String
  },
  poster: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
