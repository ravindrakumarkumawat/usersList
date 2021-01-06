require("dotenv").config()
const mongoose = require("mongoose")

const URI = process.env.MONGODB_CONNECTION_STRING

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log("MongoDB is ready")
  } catch (err) {
    console.error(err)
  }
}

module.exports = { connectDB }
