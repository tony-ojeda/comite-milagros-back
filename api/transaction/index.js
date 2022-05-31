const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('./transaction.controller')

const router = Router()

//CRUD
// router.post('/products', hasRole(['admin']), createTransaction)
// router.get('/', isAuthenticated(), getAllTransactions)
router.get('/', getAllTransactions)
// router.get('/:id', isAuthenticated(), getTransactionById)
router.get('/:id', getTransactionById)
// router.post('/', hasRole(['Developer', 'Admin']), createTransaction)
// router.post('/',isAuthenticated(), createTransaction)
router.post('/', createTransaction)
router.put('/:id', updateTransaction)
// router.delete('/:id', hasRole('Developer'), deleteTransaction)
router.delete('/:id', deleteTransaction)

//Products
// router.get('/products/', getAllTransactions)

module.exports = router
