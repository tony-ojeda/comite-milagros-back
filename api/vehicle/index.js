const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('./vehicle.controller')

const router = Router()

//CRUD
router.post('/products', hasRole(['admin']), createVehicle)
// router.get('/', isAuthenticated(), getAllVehicles)
router.get('/', getAllVehicles)
// router.get('/:id', isAuthenticated(), getVehicleById)
router.get('/:id', getVehicleById)
// router.post('/', hasRole(['Developer', 'Admin']), createVehicle)
// router.post('/',isAuthenticated(), createVehicle)
router.post('/', createVehicle)
router.put('/:id', updateVehicle)
// router.delete('/:id', hasRole('Developer'), deleteVehicle)
router.delete('/:id', deleteVehicle)

//Products
// router.get('/products/', getAllVehicles)

module.exports = router
