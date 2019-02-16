const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  availableUnits: {
    type: Number,
    required: true
  },
  screenSize: {
    type: String,
    required: true
  },
  cpu: {
    type: String,
    required: true
  },
  gpu: {
    type: String,
    required: true
  },
  bateryLife: {
    type: Number,
    required: true
  },
  ram: {
    type: String,
    required: true
  },
  hardDrive: {
    type: String,
    required: true
  },
  os: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Product', productSchema);
