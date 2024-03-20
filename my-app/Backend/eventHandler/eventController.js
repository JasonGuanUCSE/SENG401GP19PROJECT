const mongoose = require('../node_modules/mongoose');
const Events = require('../eventModel');

/*
addEvent
Params: event object in request body
Returns: result of adding event
URL: /api/Jstacart/Events
*/
const addEvent = async (req, res) => {
    let emptyFields = []
    if (!req.body.from) {
        emptyFields.push('from')
    }
    if (!req.body.to) {
        emptyFields.push('to')
    }
    if (!req.body.method) {
        emptyFields.push('method')
    }
    if (!req.body.respond) {
        emptyFields.push('respond')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in the following fields: ' + emptyFields.join(', ') })
    }
    const event = new Events({
        from: req.body.from,
        to: req.body.to,
        method: req.body.method,
        body: req.body.body,
        respond: req.body.respond
    })
    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}