import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './api/routes/auth.js'
import hotelsRoute from './api/routes/hotels.js'
import roomsRoute from './api/routes/rooms.js'
import usersRoute from './api/routes/users.js'

dotenv.config()
const app = express()

mongoose.set("strictQuery", true)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to mongoDB.")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!")
})

//middlewares
app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.listen(8800, () => {
  connect()
  console.log("Connected to backend")
})
