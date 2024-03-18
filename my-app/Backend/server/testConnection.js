require('dotenv').config({path: '../.env'})
const mongoose = require('./node_modules/mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch(err => console.log(err))
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

//fetch user from database 
const { Users, Products, Order } = require('../model/model'); // Adjust the path to match your project structure

Users.find({}).then(users => console.log(users));


