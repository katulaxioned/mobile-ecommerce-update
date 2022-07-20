const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Brand name is compulsory"]
  },
  device: {
    type: String,
    required: [true, "Device name is compulsory"]
  },
  price: {
    type: Number,
    required: [true, "Price is compulsory"]
  },
  quantity: {
    type: Number,
    required: [true, "Price is compulsory"]
  }
})

module.exports = mongoose.model('mobile', mobileSchema);