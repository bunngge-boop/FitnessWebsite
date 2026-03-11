const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout");

router.post("/add", async(req,res)=>{

try{

const workout = new Workout(req.body);

await workout.save();

res.json({message:"Workout saved"});

}catch(err){

res.json({error:err.message});

}

});


router.get("/:userId", async(req,res)=>{

try{

const workouts = await Workout.find({userId:req.params.userId});

res.json(workouts);

}catch(err){

res.json({error:err.message});

}

});

router.delete("/:id", async(req,res)=>{

try{

await Workout.findByIdAndDelete(req.params.id);

res.json({message:"Workout deleted"});

}catch(err){

res.json({error:err.message});

}

});

module.exports = router;