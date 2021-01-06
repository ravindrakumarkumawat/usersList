const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String, 
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("user", userSchema)