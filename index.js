require('dotenv').config();


const express = require('express')
const connectDB = require('./config/database')

const expressConfig = require('./config/express')
const routes = require('./routes')

const app = express()

const PORT =  process.env.PORT || 3000

app.listen(PORT, async () => {

  await connectDB(); 
  await expressConfig(app);
  await routes(app);

  console.log('Server is running with express in port: ', PORT)
})
