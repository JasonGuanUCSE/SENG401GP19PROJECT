const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./eventRoutes');

const app = express();
const port = 4500;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define your routes and event handlers here
app.use('/api/Jstacart/Events', eventRoutes);

const uri = "mongodb+srv://SENG401:seng401@jstacart.ou5rinu.mongodb.net/?retryWrites=true&w=majority&appName=Jstacart"
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