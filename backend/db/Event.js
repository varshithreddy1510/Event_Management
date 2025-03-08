const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    location: String,
    guest: String,
    userId: String
})

module.exports = mongoose.model('events', eventSchema);