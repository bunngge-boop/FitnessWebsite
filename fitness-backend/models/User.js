const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  fname:{
    type:String,
    trim:true
  },

  lname:{
    type:String,
    trim:true
  },

  sex:{
    type:String,
    enum:["Male","Female","Other"]
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("User", UserSchema);