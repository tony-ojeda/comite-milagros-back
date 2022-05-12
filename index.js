require('dotenv').config();


const express = require('express')
const connectDB = require('./config/database')

const expressConfig = require('./config/express')
const routes = require('./routes')

const createRoles = require('./utils/initialSetup')
const app = express()

const PORT =  process.env.PORT || 3000

app.listen(PORT, async () => {

  await connectDB(); 
  await expressConfig(app);
  await createRoles();
  await routes(app);

  console.log('Server is running with express in port: ', PORT)
})
