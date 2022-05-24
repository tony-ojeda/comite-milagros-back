const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema(
  {
    mark: {
      type: String,
    },
    model: {
      type: String,
    },
    aliasName: {
      type: String,
    },
    category: {
      type: String
    },
    colour: {
      type: String
    },
    licensePlate: {
      type: String,
    },
    urlImage: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Vehicle', VehicleSchema)
