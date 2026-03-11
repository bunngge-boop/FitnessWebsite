const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/signup", async (req, res) => {

try{

const {name,email,password} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){
return res.json({error:"User already exists"});
}

const user = new User({
name,
email,
password
});

await user.save();

res.json({message:"User created successfully"});

}catch(err){
res.json({error:err.message});
}

});

router.post("/login", async (req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email,password});

if(user){
res.json({
message:"Login successful",
userId:user._id,
name:user.name
});
}else{
res.json({error:"Invalid email or password"});
}

}catch(err){
res.json({error:err.message});
}

});

module.exports = router;