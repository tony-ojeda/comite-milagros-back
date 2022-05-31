const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllTransactionDetails,
  getTransactionDetailById,
  createTransactionDetail,
  updateTransactionDetail,
  deleteTransactionDetail
} = require('./transactionDetail.controller')

const router = Router()

//CRUD
// router.post('/products', hasRole(['admin']), createTransactionDetail)
// router.get('/', isAuthenticated(), getAllTransactionDetails)
router.get('/', getAllTransactionDetails)
// router.get('/:id', isAuthenticated(), getTransactionDetailById)
router.get('/:id', getTransactionDetailById)
// router.post('/', hasRole(['Developer', 'Admin']), createTransactionDetail)
// router.post('/',isAuthenticated(), createTransactionDetail)
router.post('/', createTransactionDetail)
router.put('/:id', updateTransactionDetail)
// router.delete('/:id', hasRole('Developer'), deleteTransactionDetail)
router.delete('/:id', deleteTransactionDetail)

//Products
// router.get('/products/', getAllTransactionDetails)

module.exports = router
