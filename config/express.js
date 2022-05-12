const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

function config(app) {
  app.use(express.json({ limit: '50mb', extended: true })) 
  app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
  app.use(cors())
  app.use(morgan('dev'))
}

module.exports = config
