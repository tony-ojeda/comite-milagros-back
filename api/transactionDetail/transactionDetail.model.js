const mongoose = require('mongoose')

const TransactionDetailSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
    detail: {
      type: String,
    },
    total: {
      type: Number,
      default: 0,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    VehicleExitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VehicleExit',
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('TransactionDetail', TransactionDetailSchema)
