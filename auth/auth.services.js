const jsonwebtoken = require('jsonwebtoken')
const { getUserByEmail } = require('../api/user/user.service')
const compose = require('composable-middleware')
const Role = require('../api/role/role.model');

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY_JWT, {
    expiresIn: '5h'
  })

  return token
}

function isAuthenticated() {

  return compose().use(async (req, res, next) => {
    const authHeader = req.headers?.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const [, token] = authHeader.split(' ')
    const payload = await validateToken(token)
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  
    const user = await getUserByEmail(payload.email)
  
    if (!user){
      return res.status(401).json({ message: 'User not found' })
    }
  
    req.user = user
    next()
  })
}

async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, process.env.SECRET_KEY_JWT)
    return payload
  } catch(err) {
    return null
  }
}

function hasRole(roles) {
  return compose()
    .use(isAuthenticated())
    .use(async (req, res, next)=> {
      const { user } = req
      const rolesUser = await Role.find({ _id: { $in: user.roles } });
      const rolesName = rolesUser.map(item => item.name)
      if(!roles.some(item=> rolesName.includes(item))) return res.status(403).json({ message: 'forbidden' });
      next()   
    })
}

module.exports = {
  signToken,
  isAuthenticated,
  hasRole
}
