const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

workout:{
type:String,
required:true,
trim:true
},

minutes:{
type:Number,
required:true,
min:1
},

intensity:{
type:Number,
required:true,
min:0.5
},

calories:{
type:Number,
required:true,
min:0
},

time:{
type:String,
required:true
},

date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Workout", WorkoutSchema);