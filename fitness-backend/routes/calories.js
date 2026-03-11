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

const data = await Calories.find({
userId:req.params.userId
});

res.json(data);

}catch(err){
res.json({error:err.message});
}

});


module.exports = router;