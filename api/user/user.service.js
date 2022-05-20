const User = require('./user.model')

async function getUserByEmail(email) {
  const user = await User.findOne({ email }, 'id name firstName lastName email roles phone avatar') || {}
  return user
}

async function findUser(query) {
  const user = await User.findOne( query ) || {}
  return user
}

module.exports = {
  getUserByEmail,
  findUser,
}


