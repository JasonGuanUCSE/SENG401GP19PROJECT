const express = require('express')
const { connectToDB, getDb } = require('./db')
const { ObjectId } = require('mongodb')

//init app & middleware
const database = express()
database.use(express.json()) // parse json data from request body

let db
//connect to db
connectToDB((err) => {  // cb function, err will be null if connection is successful
  if(!err) {
    database.listen(3000, () => {
        console.log('Server is running on port 3000')
      })
    db = getDb()
  }

})

//--------------------------------------------------------------Users--------------------------------------------------------------
/*
helper function to check if email exists
Params: emailtocheck
Returns: true if email exists, false otherwise
*/
function checkEmailExist(emailtocheck) {
    return db.collection('Users')
        .findOne({email: emailtocheck})
        .then(result => {
            if(!result) {
                return false;
            }
            return true;
        })
        .catch(err => {
            throw new Error('Error fetching data: ' + err);
        });
}
/*
Get all users
Params: none 
Returns: all users
URL: /StoreApp/Users
*/
database.get('/StoreApp/Users', (req, res) => {
    db.collection('Users')
        .find() // find all documents in the collection, is a cursor
        .sort({name:1}) // sort by name in ascending order
        .toArray() // convert cursor to array
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({mssg:'Error fetching data', err});
        });
});
/*
Get one user by name
Params: name
Returns: user with that name
URL: /StoreApp/Users/:name
*/
database.get('/StoreApp/Users/:name', (req, res) => {
    db.collection('Users')
        .findOne({email: {$regex:req.params.name}}) // find all documents in the collection, is a cursor
        // .sort({name:1}) // sort by name in ascending order
        // .toArray() // convert cursor to array
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({mssg:'Error fetching data', err});
        });
});

/*
Add a user
Params: user object in request body
Returns: result of adding user
URL: /StoreApp/Users
*/
database.post('/StoreApp/Users', async (req, res) => {
    const user = req.body;
    try {
        //check if email exists
        const check = await checkEmailExist(user.email);
        if (check){
            res.status(400).json({mssg:'Email exist'});
        } else {
            const result = await db.collection('Users')
                .insertOne(user);
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).json({mssg:'Error updating data', err});
    }
})
/*
Delete a user
Params: email
Returns: result of deleting user
URL: /StoreApp/Users/:email
*/
database.delete('/StoreApp/Users/:email', async (req, res) => {
    try {
        //check if email exists
        const check = await checkEmailExist(req.params.email);
        if (!check){
            res.status(400).json({mssg:'Email does not exist'});
        } else {
            const result = await db.collection('Users')
                .deleteOne({email: req.params.email});
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).json({mssg:'Error deleting data', err});
    }
});
/*
Update a user
Params: email, user object in request body
Returns: result of updating user
URL: /StoreApp/Users/:email
*/
database.patch('/StoreApp/Users/:email', async (req, res) => {
    const user = req.body;
    try {
        //check if email exists
        const check = await checkEmailExist(req.params.email);
        if (!check){
            res.status(400).json({mssg:'Email does not exist'});
        } else {
            const result = await db.collection('Users')
                .updateOne({email: req.params.email}, {$set: user});
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).json({mssg:'Error updating data', err});
    }
});

//--------------------------------------------------------------Products--------------------------------------------------------------
/*
helper function to check if product exists
Params: emailtocheck
Returns: true if email exists, false otherwise
*/
function checkProductExist(id) {
    const idInt = parseInt(id);
    return db.collection('Products')
        .findOne({ID: idInt})
        .then(result => {
            if(!result) {
                return false;
            }
            return true;
        })
        .catch(err => {
            throw new Error('Error fetching data: ' + err);
        });
}
/*
Get all products
Params: none
Returns: all products
URL: /StoreApp/Products
*/
database.get('/StoreApp/Products', (req, res) => {
    db.collection('Products')
        .find() // find all documents in the collection, is a cursor
        .sort({ID:1}) // sort by name in ascending order
        .toArray() // convert cursor to array
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({mssg:'Error fetching data', err});
        });
});

/*
Get all products by tags
Params: tags
Returns: all products with that tag
URL: /StoreApp/Products/:tags
*/
database.get('/StoreApp/Products/:tags', (req, res) => {
    db.collection('Products')
        .find({tags: {$regex:req.params.tags}}) // find all documents in the collection, is a cursor
        .sort({ID:1}) // sort by name in ascending order
        .toArray() // convert cursor to array
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({mssg:'Error fetching data', err});
        });
});
/*
Add a product
Params: product object in request body
Returns: result of adding product
URL: /StoreApp/Products
*/
database.post('/StoreApp/Products', async (req, res) => {
    const product = req.body;
    //add the product id, 1 lager than the current largest id
    try{
        const maxID = await db.collection('Products')
        .find()
        .sort({ID:-1})
        .limit(1)
        .toArray();
        product.ID = maxID[0].ID + 1;
    } catch(err) {
        product.ID = 0;
    }
    try {
        const result = await db.collection('Products')
            .insertOne(product);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({mssg:'Error updating data', err});
    }
})

/*
Delete a product
Params: product id
Returns: result of deleting product
URL: /StoreApp/Products/:id
*/
database.delete('/StoreApp/Products/:id', async (req, res) => {
    const idInt = parseInt(req.params.id);
    try {
        //check if product exists
        const check = await checkProductExist(idInt);
        if (!check){
            res.status(400).json({mssg:'Product does not exist'});
        } else {
            console.log("Start delete");
            const result = await db.collection('Products')
                .deleteOne({ID: idInt});
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).json({mssg:'Error deleting data', err});
    }
});

/*
Update a product
Params: product id, product object in request body
Returns: result of updating product
URL: /StoreApp/Products/:id
*/
database.patch('/StoreApp/Products/:id', async (req, res) => {
    const product = req.body;
    //change id to int32
    const idInt = parseInt(req.params.id);
    try {
        //check if email exists
        const check = await checkProductExist(idInt);
        console.log("check");
        if (!check){
            res.status(400).json({mssg:'Product does not exist'});
        } else {
            console.log(product);
            const result = await db.collection('Products')
                .findOneAndUpdate({ID: idInt}, {$set: product});
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).json({mssg:'Error updating data', err});
    }
});

//--------------------------------------------------------------Order--------------------------------------------------------------

/*
Get all orders
Params: none
Returns: all orders
URL: /StoreApp/Order
*/
database.get('/StoreApp/Order', (req, res) => {
    db.collection('Order')
        .find() // find all documents in the collection, is a cursor
        .sort({ID:1}) // sort by name in ascending order
        .toArray() // convert cursor to array
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({mssg:'Error fetching data', err});
        });
});

/*
Get all orders by customer email
Params: email
Returns: all orders with that email
URL: /StoreApp/Order/:email
*/
database.get('/StoreApp/Order/:email', (req, res) => {
    db.collection('Order')
        .find({customerEmail: {$regex:req.params.email}}) // find all documents in the collection, is a cursor
        .sort({ID:1}) // sort by name in ascending order
        .toArray() // convert cursor to array
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({mssg:'Error fetching data', err});
        });
});

/*
Add a order
Params: order object in request body
Returns: result of adding order
URL: /StoreApp/Order
*/
database.post('/StoreApp/Order', async (req, res) => {
    const order = req.body;
    try {
        const result = await db.collection('Order')
            .insertOne(order);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({mssg:'Error updating data', err});
    }
})

/*
Delete a order
Params: order id, email from body
Returns: result of deleting order
URL: /StoreApp/Order/:id
*/ 
database.delete('/StoreApp/Order/:id', async (req, res) => {
    const email = req.body.customerEmail;
    if (ObjectId.isValid(req.params.id)){
        const orderID = new ObjectId(req.params.id);
        try {
            //check if the order match the email
            const check = await db.collection('Order').findOne({
                _id: orderID,
                customerEmail: email
              });            if (!check){
                res.status(400).json({mssg:'Order does not exist'});
            } else {
                const result = await db.collection('Order')
                    .deleteOne({_id: orderID});
                res.status(200).json(result);
            }
        } catch(err) {
            res.status(500).json({mssg:'Error deleting data', err});
        }
    }else {
        res.status(400).json({mssg:'Invalid order id'});
    }
});

/*
Update a order
Params: order id, email in request body
Returns: result of updating order
URL: /StoreApp/Order/:id
*/
database.patch('/StoreApp/Order/:id', async (req, res) => {
    const order = req.body;
    const email = req.body.customerEmail;
    if (ObjectId.isValid(req.params.id)){
        const orderID = new ObjectId(req.params.id);
        try {
            //check if the order match the email
            const check = await db.collection('Order').findOne({
                _id: orderID,
                customerEmail: email
              });
            if (!check){
                res.status(400).json({mssg:'Order does not exist'});
            } else {
                const result = await db.collection('Order')
                    .findOneAndUpdate({_id: orderID}, 
                        {$set: order}, {returnOriginal: false});
                res.status(200).json(result);
            }
        } catch(err) {
            res.status(500).json({mssg:'Error updating data', err});
        }
    } else {
        res.status(400).json({mssg:'Invalid order id'});
    }
});