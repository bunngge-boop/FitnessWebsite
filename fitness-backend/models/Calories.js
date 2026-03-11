const mongoose = require("mongoose");

const CalorieSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

food:{
type:String,
required:true,
trim:true
},

calories:{
type:Number,
required:true,
min:0
},

date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Calories", CalorieSchema);