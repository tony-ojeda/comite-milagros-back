const Service = require('./service.model')
const slugify = require('slugify')

async function getAllServices(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const service = await Service.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    let services = await Service.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      // .populate('userData.user', '_id firstName lastName email')
      .skip(skip)
      .limit(limit)
      .exec(function(err, services) {
        if (err) return next(err)
        res.json(services)
      })
      // .then(services => {
      //    res.json(services);
      //     // res.status(200).json(services)
      // })
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}


async function getServiceById(req, res) {
  const { id } = req.params
  try {
    const service = await Service.findById(id) 
    res.status(200).json(service)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createService(req, res) {
  const info = req.body;
  try {
    const service = await Service.create({ ...info})
    res.status(200).json(service)
  } catch(err) {
    console.log('Error', err)
    res.status(400).json({ error: err})
  } 
}

async function updateService(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const service = await Service.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(service)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteService(req, res) {
  const { id } = req.params
  try {
    const service = await Service.findByIdAndDelete(id)
    res.status(200).json({ message: 'Service deleted succesfully', service })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
}
