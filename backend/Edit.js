const express = require('express');
const router = express.Router();
const Events = require('./models/Event');

router.put('/:id', async (req, res) => {
    try {
        const { userId, title, date, time, description, location } = req.body;
       console.log("userId",userId);
        const event = await Events.findByIdAndUpdate(req.params.id, {
            userId,
            title,
            date,
            time,
            description,
            location,
        }, { new: true });
        console.log(event);
        if (!event) {
            return res.status(404).send({ message: 'Memory not found' });
        }

        res.send({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).send({ message: 'Error updating memory', error });
    }
});

module.exports = router;