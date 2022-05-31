const TransactionDetail = require('./transactionDetail.model')
const slugify = require('slugify')

async function getAllTransactionDetails(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const transactionDetail = await TransactionDetail.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const transactionDetail = await TransactionDetail.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      // .populate('userData.user', '_id firstName lastName email')
      .skip(skip)
      .limit(limit);
    res.status(200).json(transactionDetail)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}


async function getTransactionDetailById(req, res) {
  const { id } = req.params
  try {
    const transactionDetail = await TransactionDetail.findById(id) 
    res.status(200).json(transactionDetail)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createTransactionDetail(req, res) {
  const info = req.body;
  const user = req.user
  info.slug = await setSlug(info.name);
  
  try {
    const transactionDetail = await TransactionDetail.create({ ...info})
    res.status(200).json(transactionDetail)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function setSlug(name) {
  if (name) {
    try {
      let slug = await slugify(name);
      const find = await TransactionDetail.findOne({ slug })
      if (find) {
        let index = 1;
        let newSlug = `${slug}-${index}`;
        const findNewSlug = await TransactionDetail.findOne({ slug: newSlug })
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

async function updateTransactionDetail(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const transactionDetail = await TransactionDetail.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(transactionDetail)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteTransactionDetail(req, res) {
  const { id } = req.params
  try {
    const transactionDetail = await TransactionDetail.findByIdAndDelete(id)
    res.status(200).json({ message: 'TransactionDetail deleted succesfully', transactionDetail })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllTransactionDetails,
  getTransactionDetailById,
  createTransactionDetail,
  updateTransactionDetail,
  deleteTransactionDetail,
}
