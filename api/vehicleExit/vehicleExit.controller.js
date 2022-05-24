const VehicleExit = require('./vehicleExit.model')
const slugify = require('slugify')

async function getAllVehicleExits(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const vehicleExit = await VehicleExit.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const vehicleExit = await VehicleExit.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      // .populate('userData.user', '_id firstName lastName email')
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
  const user = req.user
  info.slug = await setSlug(info.name);
  
  try {
    const vehicleExit = await VehicleExit.create({ ...info})
    res.status(200).json(vehicleExit)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function setSlug(name) {
  if (name) {
    try {
      let slug = await slugify(name);
      const find = await VehicleExit.findOne({ slug })
      if (find) {
        let index = 1;
        let newSlug = `${slug}-${index}`;
        const findNewSlug = await VehicleExit.findOne({ slug: newSlug })
        while( findNewSlug ) {
          index++;
          newSlug = `${slug}-${index}`;
        }
        slug = newSlug;
      }

      return slug;

    } catch(error) {
      console.error(error);
    }
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