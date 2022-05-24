const mongoose = require('mongoose')

const VehicleExitSchema = new mongoose.Schema(
  {
    carrier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Carrier',
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
      required: true,
    },
    dateExit: {
      type: Date,
      default: Date.now,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('VehicleExit', VehicleExitSchema)
