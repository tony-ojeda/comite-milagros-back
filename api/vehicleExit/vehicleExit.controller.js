const VehicleExit = require('./vehicleExit.model')
const slugify = require('slugify')

async function getAllVehicleExits(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const vehicleExit = await VehicleExit.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const vehicleExit = await VehicleExit.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      .populate('carrier', 'firstName lastName')
      .populate('vehicle', 'mark aliasName')
      .skip(skip)
      .limit(limit);
    res.status(200).json(vehicleExit)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}


async function getVehicleExitById(req, res) {
  const { id } = req.params
  try {
    const vehicleExit = await VehicleExit.findById(id) 
    res.status(200).json(vehicleExit)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createVehicleExit(req, res) {
  const info = req.body;
  
  try {
    const vehicleExit = await VehicleExit.create({ ...info})
    res.status(200).json(vehicleExit)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function updateVehicleExit(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const vehicleExit = await VehicleExit.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(vehicleExit)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteVehicleExit(req, res) {
  const { id } = req.params
  try {
    const vehicleExit = await VehicleExit.findByIdAndDelete(id)
    res.status(200).json({ message: 'VehicleExit deleted succesfully', vehicleExit })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllVehicleExits,
  getVehicleExitById,
  createVehicleExit,
  updateVehicleExit,
  deleteVehicleExit,
}
