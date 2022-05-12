const User = require('./user.model')

async function getUserByEmail(email) {
  const user = await User.findOne({ email }) || {}
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


