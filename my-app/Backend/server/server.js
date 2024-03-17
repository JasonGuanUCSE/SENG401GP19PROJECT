require('dotenv').config({path: '../.env'})

const express = require('express')
const mongoose = require('./node_modules/mongoose')
// const Routes = require('../routes/routes')
const UserRoutes = require('../routes/userRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
// app.use('/api/Jstacart', Routes)
app.use('/api/Jstacart/Users', UserRoutes)

console.log(process.env.MONGO_URI)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 