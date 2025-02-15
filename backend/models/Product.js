const mongoose = require("mongoose");
const Category = require("../models/Category");
const Configuration = require("../models/Configuration");


const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  configuration: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Configuration
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Category
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    max: 2048
  },
  isCustom: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Product", productSchema);
