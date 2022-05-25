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
      type: Number,
      default: 0,
      required: true,
      // set: setAmount,
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

function setAmount(value) {
  return Math.round(value);
};


module.exports = mongoose.model('VehicleExit', VehicleExitSchema)
