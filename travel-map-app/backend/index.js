const express = require('express')
const mongoose = require('mongoose')
const pinsRoute = require('./routes/pins')
const usersRoute = require('./routes/users')
require('dotenv').config()

const app = express()

mongoose
  .connect(process.env.DATABASE)
  .then((con) => {
    console.log('successful')
    console.log(con.connections)
  })
  .catch((err) => {
    console.log('error')
    console.log(err)
  })

app.use(express.json())
app.use('/users', usersRoute)
app.use('/pins', pinsRoute)

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on ${process.env.PORT}`)
})
