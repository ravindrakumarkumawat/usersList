const express = require('express')
const cors = require('cors')
const { connectDB } = require('./db/connectDb')
const userRouter = require('./routes/userRoute')
const app = express()
const port = process.env.PORT || 5000

// Database connecting
connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))


// Route
app.use('/users', userRouter)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})