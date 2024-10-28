const Events = require('./models/Event');
const express = require('express');
const router = express.Router();
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const Event = await Events.findByIdAndDelete(id);

        if (!Event)
            return res.json({ message: "Memory not found" });
        return res.json({ message: "Memory deleted" })
    } catch (error) {
        return res.json({ message: "Delete Error", error })
    }
})
module.exports = router