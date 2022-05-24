const user = require('./api/user')
const pkg = require('./package.json')
const vehicle = require('./api/vehicle')
const service = require('./api/service')
const vehicleExit = require('./api/vehicleExit')
const upload = require('./api/upload')
const auth = require('./auth/local')

function routes(app) {
  app.set('pkg', pkg)
  app.get('/', (req, res) => {
    res.json({
      name: app.get('pkg').name,
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version
    })
  })

  app.use('/api/v1/users', user)
  app.use('/api/v1/vehicles', vehicle)
  app.use('/api/v1/vehicleExits', vehicleExit)
  app.use('/api/v1/services', service)
  app.use('/api/v1/uploads', upload),
  app.use('/api/v1/auth', auth)
}

module.exports = routes




