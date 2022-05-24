const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllVehicleExits,
  getVehicleExitById,
  createVehicleExit,
  updateVehicleExit,
  deleteVehicleExit
} = require('./vehicleExit.controller')

const router = Router()

//CRUD
router.post('/products', hasRole(['admin']), createVehicleExit)
// router.get('/', isAuthenticated(), getAllVehicleExits)
router.get('/', getAllVehicleExits)
// router.get('/:id', isAuthenticated(), getVehicleExitById)
router.get('/:id', getVehicleExitById)
// router.post('/', hasRole(['Developer', 'Admin']), createVehicleExit)
// router.post('/',isAuthenticated(), createVehicleExit)
router.post('/', createVehicleExit)
router.put('/:id', updateVehicleExit)
// router.delete('/:id', hasRole('Developer'), deleteVehicleExit)
router.delete('/:id', deleteVehicleExit)

//Products
// router.get('/products/', getAllVehicleExits)

module.exports = router
