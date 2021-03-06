const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    total: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dateAt: {
      type: Date,
      default: Date.now,
    },
    carrierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

TransactionSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})

TransactionSchema.virtual('carrier', {
  ref: 'User',
  localField: 'carrierId',
  foreignField: '_id',
  justOne: true
})


module.exports = mongoose.model('Transaction', TransactionSchema)
