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
    type: Number,
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
  batteryLife: {
    type: Number,
    required: true
  },
  ram: {
    type: Number,
    required: true
  },
  memory: {
    capacity:{
      type: Number,
      required: true
    },
    memoryType:{
      type: String,
      required: true
    }

  },
  os: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Product', productSchema);
