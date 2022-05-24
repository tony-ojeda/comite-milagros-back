const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('./service.controller')

const router = Router()

//CRUD
router.post('/products', hasRole(['admin']), createService)
// router.get('/', isAuthenticated(), getAllServices)
router.get('/', getAllServices)
// router.get('/:id', isAuthenticated(), getServiceById)
router.get('/:id', getServiceById)
// router.post('/', hasRole(['Developer', 'Admin']), createService)
// router.post('/',isAuthenticated(), createService)
router.post('/', createService)
router.put('/:id', updateService)
// router.delete('/:id', hasRole('Developer'), deleteService)
router.delete('/:id', deleteService)

//Products
// router.get('/products/', getAllServices)

module.exports = router
