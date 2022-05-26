const mongoose = require('mongoose')

const VehicleExitSchema = new mongoose.Schema(
  {
    carrierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
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
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

function setAmount(value) {
  return Math.round(value);
};


VehicleExitSchema.virtual('carrier', {
  ref: 'User',
  localField: 'carrierId',
  foreignField: '_id',
  justOne: true
})

VehicleExitSchema.virtual('vehicle', {
  ref: 'Vehicle',
  localField: 'vehicleId',
  foreignField: '_id',
  justOne: true
})

module.exports = mongoose.model('VehicleExit', VehicleExitSchema)
