const express = require("express");
const router = express.Router();

const Calories = require("../models/Calories");

router.post("/add", async(req,res)=>{

try{

const entry = new Calories(req.body);

await entry.save();

res.json({message:"Calories saved"});

}catch(err){

res.json({error:err.message});

}

});


router.get("/:userId", async(req,res)=>{

try{

const entries = await Calories.find({userId:req.params.userId});

res.json(entries);

}catch(err){

res.json({error:err.message});

}

});


router.delete("/:id", async(req,res)=>{

try{

await Calories.findByIdAndDelete(req.params.id);

res.json({message:"Calories entry deleted"});

}catch(err){

res.json({error:err.message});

}

});

module.exports = router;