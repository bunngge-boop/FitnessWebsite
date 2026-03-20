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
    default:""
  },

  lname:{
    type:String,
    default:""
  },

  sex:{
    type:String,
    default:""
  },

  handle:{
    type:String,
    default:""
  },

  age:{
    type:Number,
    default:null
  },

  location:{
    type:String,
    default:""
  },

  goal:{
    type:String,
    default:""
  },

  activity:{
    type:String,
    default:""
  },

  height:{
    type:Number,
    default:null
  },

  bmiWeight:{
    type:Number,
    default:null
  },

  bmi:{
    type:Number,
    default:null
  },

  bodyFat:{
    type:Number,
    default:null
  },

  startWeight:{
    type:Number,
    default:null
  },

  currentWeight:{
    type:Number,
    default:null
  },

  goalWeight:{
    type:Number,
    default:null
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("User", UserSchema);