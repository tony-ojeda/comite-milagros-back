const Transaction = require('./transaction.model')
const TransactionDetailModel = require('../transactionDetail/transactionDetail.model')
const VehicleExitModel = require('../vehicleExit/vehicleExit.model')

async function getAllTransactions(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const transaction = await Transaction.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const transaction = await Transaction.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      // .populate('userData.user', '_id firstName lastName email')
      .skip(skip)
      .limit(limit);
    res.status(200).json(transaction)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}


async function getTransactionById(req, res) {
  const { id } = req.params
  try {
    const transaction = await Transaction.findById(id) 
    res.status(200).json(transaction)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createTransaction(req, res) {
  const user = req.user
  const { transaction, transactionDetails } = req.body;
  
  try {
    const savedTransaction = await Transaction.create({ ...transaction})
    console.log('transaction', transaction);
    for (const item of transactionDetails) {
      const updatedVehicleExit = {
        paymentStatus: 1,
        payment: item.total,
        paymentDate: new Date()
      }
      await VehicleExitModel.findByIdAndUpdate(item.vehicleExitId, updatedVehicleExit);
      await TransactionDetailModel.create({ ...item, transactionId: savedTransaction._id})
    }
    res.status(200).json(transaction)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function updateTransaction(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(transaction)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteTransaction(req, res) {
  const { id } = req.params
  try {
    const transaction = await Transaction.findByIdAndDelete(id)
    res.status(200).json({ message: 'Transaction deleted succesfully', transaction })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}
