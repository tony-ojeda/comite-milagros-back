require("dotenv").config()

const mongoose = require("mongoose")

const URI = process.env.MONGO_URI

async function connectDB() {
 try {
  await mongoose.connect(URI)
  console.log("MongoDB is connected")
 } catch (err) {
  console.error('MongoDB is not conected ',err)
  process.exit(1)
 }
}

module.exports = connectDB
