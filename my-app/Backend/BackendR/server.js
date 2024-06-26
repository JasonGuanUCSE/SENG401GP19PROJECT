require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserRoutes = require('./routes/userRoutes')
const ProductsRoutes = require('./routes/productsRoutes')
const OrderRoutes = require('./routes/orderRoutes')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/Jstacart/Users', UserRoutes)
app.use('/api/Jstacart/Products', ProductsRoutes)
app.use('/api/Jstacart/Orders', OrderRoutes)

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