const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./eventRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4500;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define your routes and event handlers here
app.use('/api/Jstacart/', eventRoutes);

const uri = process.env.MONGO_URI;
// connect to db
mongoose.connect(uri,{dbName: 'events'})
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(port, () => {
      console.log('listening for requests on port', 4500)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 