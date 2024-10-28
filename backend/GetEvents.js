const express=require('express');
const Events=require('./models/Event');
const router=express.Router();
router.get('/',async(req,res)=>{
    try {
        const userId=req.query.id;
        
        const response=await Events.find({userId});
       
        res.json({response});
    } catch (error) {
        res.json(error);
    }
})
module.exports=router;