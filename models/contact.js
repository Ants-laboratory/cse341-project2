// models/contact.js

const mongoose = require('mongoose');

// Define Contact schema
const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    characters: {
        type: Number,
        required: true
    },
    vip: {
        type: String,
        required: true
    }
});

// Create Contact model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
