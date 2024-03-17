require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const UsersRoutes = require('./routes/Jstacart/Users');
const OrderRoutes = require('./routes/Jstacart/Order');
const ProductsRoutes = require('./routes/Jstacart/Products');

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/Jstacart/User', UsersRoutes);
app.use('/api/Jstacart/Order', OrderRoutes);
app.use('/api/Jstacart/Product', ProductsRoutes);

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