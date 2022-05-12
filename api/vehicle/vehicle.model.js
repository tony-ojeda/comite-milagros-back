const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema(
  {
    mark: {
      type: String,
    },
    model: {
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
    url_image: {
      type: String
    },
    userParentData: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      role: {
        type: String,
        required: true
      }
    },
    userData: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      role: {
        type: String,
        required: true
      }
    },
    
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Vehicle', VehicleSchema)
