const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const corsOptions = {
origin:"http://127.0.0.1:5500",
methods:["GET","POST","DELETE","PUT"],
credentials:true
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fitnessDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/workout", require("./routes/workout"));
app.use("/api/calories", require("./routes/calories"));
app.use("/api/contact", require("./routes/contact"));

app.listen(5000,()=>{
console.log("Server running on port 5000");
});