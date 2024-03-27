const mongoose = require('mongoose');
const Event = require('./eventModel');


/*
addEvent
Params: event object in request body
Returns: _id of adding event
*/
const addEvent = async (requests) => {
    console.log(requests.body)
    let source = requests.source
    let dest = requests.dest
    //get the method from the request - GET, POST, PUT, DELETE
    let method = requests.method
    let body = requests.body
    let collection = requests.collection

    console.log("Adding event")
    const event = new Event({
        from: source,
        to: dest,
        collection: collection,
        method: method,
        body: body
    })
    try {
        const newEvent = await event.save()
        //return the object id of the event
        return newEvent._id
    } catch (err) {
        return err
    }
}

/*
UpdateRespond
Params: event id, respond object in request body
Returns: _id of adding event
*/
const updateRespond = async (update) => {
    //get the event id from the request
    let _id = update.id
    //get the respond object from the request
    let respond = update.respond
    console.log("Updating event")
    try {
        //update the respond object in the event based on the object id
        const updatedEvent = await Event.findByIdAndUpdate(_id, { respond: respond }, { new: true })
        //return the object id of the event
        return updatedEvent._id
    } catch (err) {
        return err
    }
}

/*
HandleGet
Params: which collection are you looking, and search methods in header
collections: users, products, orders
search:
    users: [all, one by name(put name in body object)]
    products: [all, one by id, some by category, some by store, some by both (category and store)]
    orders: [all, some by email]
Returns: Get result of the search
*/
const handleGet = async (req, res) => {
    let collection = req.headers.collection
    let search = req.headers.search
    let source = "web"
    let dest = "read"
    console.log("collection: "+collection)
    console.log("search: "+search)
    //prepare request object and call the addEvent function
    let request = {
        source: source,
        dest: dest,
        collection: collection,
        method: "GET",
        body: req.headers
    }
    let id = await addEvent(request)
    let URL = "https://seng401jstacartread.onrender.com/api/Jstacart/";
    let respond = null
    if (collection === "users") {
        URL = URL + "users"
        if (search !=="all" && search !== "name") {
            res.status(400).json({ message: "Invalid search method" })
            respond = { message: "Invalid search method" }
        } else if (search === "name") {
            URL = URL + "/" + req.headers.name
        }
    } else if (collection === "products"){
        URL = URL + "products"
        if (search !=="all" && search !== "id" && search !== "category" && search !== "store" && search !== "both") {
            res.status(400).json({ message: "Invalid search method" })
            respond = { message: "Invalid search method" }
        } else if (search === "id") {
            URL = URL + "/" + req.headers.id
        } else if (search === "category") {
            URL = URL + "/category/" + req.headers.category
        } else if (search === "store") {
            URL = URL + "/store/" + req.headers.store
        } else if (search === "both") {
            //WILL ADD THIS FUNCTIONALITY LATER
            URL = URL + "/category/" + req.headers.category + "/store/" + req.headers.store
        }
    } else if (collection === "orders"){
        URL = URL + "orders"
        if (search !=="all" && search !== "_id" && search !== "email") {
            res.status(400).json({ message: "Invalid search method" })
            respond = { message: "Invalid search method" }
        } else if (search === "_id") {  
            URL = URL + "/id/" + req.headers._id
        } else if (search === "email") {
            URL = URL + "/email/" + req.headers.email
        }
    } else {
        res.status(400).json({ message: "Invalid collection" })
        respond = { message: "Invalid collection" }
    }
    //send the request to the read server and save the response to respond object and send back to frontend via res
    console.log("URL: "+URL)
    if (respond === null) {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const { status, message } = data
                respond = {status, message}
                res.status(200).json(data)
                let update = {
                    id: id,
                    respond: respond
                }
                return updateRespond(update)
            })
            .catch(err => {
                res.status(400).json({ message: "Error in fetching data" +err})
                respond = { message: "Error in fetching data: "+err }
            })
    }
    return respond
}

/*
HandlePost
Params: which collection are you looking, and sender in header, object in request body
collections: users, products, orders
Returns: Get result of the search
*/
const handlePost = async (req, res) => {
    let collection = req.headers.collection
    let source = req.headers.sender
    if (source == "dev") {
        return res.status(200)
    }
    let dest = source == "database"? "read":"write"
    //prepare request object and call the addEvent function
    let request = {
        source: source,
        dest: dest,
        collection: collection,
        method: "POST",
        body: req.body
    }
    let id = await addEvent(request)
    let URL = "";
    if (source == "database") {
        URL = "https://seng401jstacartread.onrender.com/api/Jstacart/";
    } else {
        URL = "https://seng401gp19project.onrender.com/api/JstacartW/";
    }
    let respond = null
    console.log("collection: "+collection)
    if (collection == "users") {
        //health check of the body object
        if (!req.body.email || !req.body.email.includes('@')){
            return res.status(400).json({ error: 'Please enter an valid email' })
        }
        if (!req.body.name) {
            return res.status(400).json({ error: 'Please enter a name' })
        }
        URL = URL + "users"
    } else if (collection == "products"){
        //health check of the body object
        if (!req.body.id) {
            return res.status(400).json({ error: 'Please enter a id' })
        }
        if (!req.body.name) {
            return res.status(400).json({ error: 'Please enter a name' })
        }
        if (!req.body.price) {
            return res.status(400).json({ error: 'Please enter a price' })
        }
        URL = URL + "products"
    } else if (collection == "orders"){
        //health check of the body object
        if (!req.body.customerEmail || !req.body.customerEmail.includes('@')){
            return res.status(400).json({ error: 'Please enter an valid customerEmail' })
        }
        if (!req.body.customerName) {
            return res.status(400).json({ error: 'Please enter a customerName' })
        }
        if (!req.body.productID || req.body.productID.length === 0) {
            return res.status(400).json({ error: 'Please enter productID' })
        }
        if (!req.body.quantity || req.body.quantity.length !== req.body.productID.length) {
            return res.status(400).json({ error: 'Please enter correct number of quantity' })
        }
        if (!req.body.paymentMethod) {
            return res.status(400).json({ error: 'Please enter a paymentMethod' })
        }
        if (!req.body.status) {
            return res.status(400).json({ error: 'Please enter a status' })
        }
        if (!req.body.orderID){
            // set id to be first 5 characters of customer email + current time in milliseconds
            req.body.orderID = req.body.customerEmail.substring(0, 5) + Date.now()
        }
        URL = URL + "orders"
    } else {
        res.status(400).json({ message: "Invalid collection" })
        respond = { message: "Invalid collection" }
    }
    //send the request to the write server and save the response to respond object and send back to frontend via res
    console.log("URL: "+URL)
    console.log("body: "+JSON.stringify(req.body))
    if (respond == null) {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        })
            .then(response => response.json())
            .then(data => {
                const { status, message } = data
                respond = {status, message}
                res.status(200).json(data)
                let update = {
                    id: id,
                    respond: respond
                }
                return updateRespond(update)
            })
            .catch(err => {
                res.status(400).json({ message: "Error in fetching data"+ err})
                respond = { message: "Error in fetching data: "+err }
                let update = {
                    id: id,
                    respond: respond
                }
                return updateRespond(update)
            })
    }
    return respond
}

/*
HandleDelete
Params: which collection are you looking, and sender in header, parameter in request body
collections: 
    users: [email], 
    products: [id], 
    orders: [objectID, email]
Returns: Delete result of the search
*/
const handleDelete = async (req, res) => {
    let collection = req.headers.collection
    let source = req.headers.sender
    let dest = source === "database"? "read":"write"
    //prepare request object and call the addEvent function
    let request = {
        source: source,
        dest: dest,
        collection: collection,
        method: "DELETE",
        body: req.body
    }
    let id = await addEvent(request)
    let URL = "";
    if (source === "database") {
        URL = "https://seng401jstacartread.onrender.com/api/Jstacart/";
    } else {
        URL = "https://seng401gp19project.onrender.com/api/JstacartW/";
    }
    let respond = null
    if (collection === "users") {
        //health check of the body object
        if (!req.body.email || !req.body.email.includes('@')){
            return res.status(400).json({ error: 'Please enter an valid email' })
        }
        URL = URL + "users/" + req.body.email
    } else if (collection === "products"){
        //health check of the body object
        if (!req.body.id) {
            return res.status(400).json({ error: 'Please enter a id' })
        }
        URL = URL + "products/" + req.body.id
    } else if (collection === "orders"){
        //health check of the body object
        if (!req.body.orderID) {
            return res.status(400).json({ error: 'Please enter an orderID' })
        }
        if (!req.body.email || !req.body.email.includes('@')){
            return res.status(400).json({ error: 'Please enter an valid email' })
        }
        URL = URL + "orders/" + req.body.objectID + "/" + req.body.email
    } else {
        res.status(400).json({ message: "Invalid collection" })
        respond = { message: "Invalid collection" }
    }
    //send the request to the write server and save the response to respond object and send back to frontend via res
    console.log("URL: "+URL)
    if (respond === null) {
        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                const { status, message } = data
                respond = {status, message}
                res.status(200).json(data)
                let update = {
                    id: id,
                    respond: respond
                }
                return updateRespond(update)
            }
            )
            .catch(err => {
                res.status(400).json({ message: "Error in fetching data"+ err})
                respond = { message: "Error in fetching data: "+err }
                let update = {
                    id: id,
                    respond: respond
                }
                return updateRespond(update)
            })
    }
    return respond
}

/*
HandlePatch
Params: which collection are you looking, and sender in header, parameter in request body
collections: 
    users: [email], 
    products: [id], 
    orders: [objectID, email]
Returns: Patch result of the search
*/
const handlePatch = async (req, res) => {
    let collection = req.headers.collection
    let source = req.headers.sender
    let dest = source === "database"? "read":"write"
    //prepare request object and call the addEvent function
    let request = {
        source: source,
        dest: dest,
        collection: collection,
        method: "PATCH",
        body: req.body
    }
    let id = await addEvent(request)
    let URL = "";
    if (source === "database") {
        URL = "https://seng401jstacartread.onrender.com/api/Jstacart/";
    } else {
        URL = "https://seng401gp19project.onrender.com/api/JstacartW/";
    }
    let respond = null
    if (collection === "users") {
        //health check of the body object
        if (!req.body.email || !req.body.email.includes('@')){
            return res.status(400).json({ error: 'Please enter an valid email' })
        }
        URL = URL + "users/" + req.body.email
    } else if (collection === "products"){
        //health check of the body object
        if (!req.body.id) {
            return res.status(400).json({ error: 'Please enter a id' })
        }
        URL = URL + "products/" + req.body.id
    } else if (collection === "orders"){
        //health check of the body object
        if (!req.body.objectID) {
            return res.status(400).json({ error: 'Please enter an objectID' })
        }
        if (!req.body.email || !req.body.email.includes('@')){
            return res.status(400).json({ error: 'Please enter an valid email' })
        }
        URL = URL + "orders/" + req.body.objectID + "/" + req.body.email
    } else {
        res.status(400).json({ message: "Invalid collection" })
        respond = { message: "Invalid collection" }
    }
    //send the request to the write server and save the response to respond object and send back to frontend via res
    console.log("URL: "+URL)
    if (respond === null) {
        fetch(URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body.body)
        })
            .then(response => response.json())
            .then(data => {
                const { status, message } = data
                respond = {status, message}
                res.status(200).json(data)
                let update = {
                    id: id,
                    respond: respond
                }
                return updateRespond(update)
            }).catch(err => {
                res.status(400).json({ message: "Error in fetching data"+ err})
                respond = { message: "Error in fetching data: "+err }
                let update = {
                    id: id,
                    respond: respond
                }
                return updateRespond(update)
            })
    }
    return respond
}


module.exports = { 
    handleGet,
    handlePost,
    handleDelete,
    handlePatch
}
