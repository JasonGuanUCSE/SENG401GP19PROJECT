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

    console.log("Adding event")
    const event = new Event({
        from: source,
        to: dest,
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
Params: which collection are you looking, and search methods in header event object in request body
collections: users, products, orders
search:
    users: [all, one by email(put email in body object)]
    products: [all, one by id, some by category, some by store]
    orders: [all, one by id, some by email]
Returns: Get result of the search
*/
const handleGet = async (req, res) => {
    let collection = req.headers.collection
    let search = req.headers.search
    let source = "web"
    let dest = "read"
    //prepare request object and call the addEvent function
    let request = {
        source: source,
        dest: dest,
        method: "GET",
        body: req.body
    }
    let id = await addEvent(request)
    const baseURL = "https://seng401jstacartread.onrender.com/api/Jstacart/";
    const respond = {};
    if (collection === "users") {
        let uri = baseURL + "users"
        if (search !=="all" && search !== "email") {
            res.status(400).json({ message: "Invalid search method" })
            respond = { message: "Invalid search method" }
        } else if (search === "email") {
            uri = uri + "/" + req.body.email
        }
    }//else if (collection === )

    //update the respond object in the event
    let update = {
        id: id,
        respond: users
    }
    let result = await updateRespond(update)
    return

}

module.exports = { 
    addEvent 
}