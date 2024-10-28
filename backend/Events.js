const express = require('express');
const Event = require('./models/Event');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, title, date, time, description, location } = req.body;
        console.log(userId);
       
        
        // Create new Event
        const newEvent = new Event({
            userId,
            title,
            date,
            time,
            description,
            location,
        });
        
        // Save the event to the database
        await newEvent.save();
        
        res.json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Failed to create event", error });
    }
});

module.exports = router;
