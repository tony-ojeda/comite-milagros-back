const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
      // set: setAmount,
    },
  },
  {
    timestamps: true
  }
)

function setAmount(value) {
  return Math.round(value);
};

module.exports = mongoose.model('Service', ServiceSchema)
