const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4500;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define your routes and event handlers here

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const uri = "mongodb+srv://SENG401:seng401@jstacart.ou5rinu.mongodb.net/?retryWrites=true&w=majority&appName=Jstacart"
// connect to db
mongoose.connect(uri)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(5000, () => {
      console.log('listening for requests on port', 4500)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 