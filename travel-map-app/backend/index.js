const express = require('express')
const mongoose = require('mongoose')
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

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on ${process.env.PORT}`)
})
