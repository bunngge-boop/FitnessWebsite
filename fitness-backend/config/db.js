const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://fitnessUser:StrongPass123@ac-om5xdyj-shard-00-00.wkhutqo.mongodb.net:27017,ac-om5xdyj-shard-00-01.wkhutqo.mongodb.net:27017,ac-om5xdyj-shard-00-02.wkhutqo.mongodb.net:27017/fitnessDB?ssl=true&replicaSet=atlas-cx0wq0-shard-0&authSource=admin&appName=Fitnesstracker"
    );

    console.log("MongoDB Atlas Connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;