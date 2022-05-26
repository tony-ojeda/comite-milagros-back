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
    carrierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Vehicle', VehicleSchema)
