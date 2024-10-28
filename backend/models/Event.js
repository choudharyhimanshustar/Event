const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,  // Title is a required field
        trim: true       // Trims whitespace
    },
    date: {
        type: Date,
        required: true   // Date is a required field
    },
    time: {
        type: String,
        required: true,  // Time is a required field
        trim: true       // Trims whitespace
    },
    description: {
        type: String,
        required: true,  // Description is a required field
        trim: true       // Trims whitespace
    },
    location: {
        type: String,
        required: true,  // Location is a required field
        trim: true       // Trims whitespace
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

// Export the model
module.exports = Event;
