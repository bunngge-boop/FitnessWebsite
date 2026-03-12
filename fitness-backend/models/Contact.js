const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({

name:{
type:String,
required:[true,"Name is required"],
trim:true,
minlength:[2,"Name must be at least 2 characters"]
},

email:{
type:String,
required:[true,"Email is required"],
trim:true,
lowercase:true,
match:[/^\S+@\S+\.\S+$/,"Please enter a valid email"]
},

message:{
type:String,
required:[true,"Message is required"],
minlength:[10,"Message must be at least 10 characters"]
},

date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Contact", ContactSchema);