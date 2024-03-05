const { MongoClient } = require('mongodb'); // import MongoClient from mongodb 

let dbConnect; // variable to store the connection to the database
let connectionURL="mongodb+srv://SENG401:SENG401@jstacart.ou5rinu.mongodb.net/?retryWrites=true&w=majority&appName=Jstacart"

module.exports = {
    // connect to db
    // Parameters: cb (callback function)
    // Returns: none
    // This function connects to the database and stores the connection in the dbConnect variable
    connectToDB:(cb) => {   // cb is a callback function, it is a function that is passed as an argument to another function
                            // and is expected to be called back at a later time. Here, it is called after the connection is established
        // connect to db
        MongoClient.connect(connectionURL)
            .then(client => {   // if connection is successful
                //store the connection
                dbConnect = client.db()
                // call the callback function
                return cb()
            })
            .catch(error => {
                console.log(error)
                return cb(error)
            })
    },
    getDb:() => dbConnect
    
}