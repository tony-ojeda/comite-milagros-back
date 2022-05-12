const Vehicle = require('./vehicle.model')
const slugify = require('slugify')

async function getAllVehicles(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const vehicle = await Vehicle.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const vehicle = await Vehicle.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      // .populate('userData.user', '_id firstName lastName email')
      .skip(skip)
      .limit(limit);
    res.status(200).json(vehicle)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}


async function getVehicleById(req, res) {
  const { id } = req.params
  try {
    const vehicle = await Vehicle.findById(id) 
    res.status(200).json(vehicle)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createVehicle(req, res) {
  const info = req.body;
  const user = req.user
  info.slug = await setSlug(info.name);
  
  try {
    const vehicle = await Vehicle.create({ ...info})
    res.status(200).json(vehicle)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function setSlug(name) {
  if (name) {
    try {
      let slug = await slugify(name);
      const find = await Vehicle.findOne({ slug })
      if (find) {
        let index = 1;
        let newSlug = `${slug}-${index}`;
        const findNewSlug = await Vehicle.findOne({ slug: newSlug })
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

async function updateVehicle(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(vehicle)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteVehicle(req, res) {
  const { id } = req.params
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id)
    res.status(200).json({ message: 'Vehicle deleted succesfully', vehicle })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
}
