const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* ----------- DATABASE CONNECTION ----------- */
connectDB();

/* ----------- MIDDLEWARE ----------- */
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

/* ----------- ROUTES ----------- */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/workout", require("./routes/workout"));
app.use("/api/calories", require("./routes/calories"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/progress", require("./routes/progress"));

/* ----------- TEST ROUTE ----------- */
app.get("/", (req, res) => {
  res.send("Fitness Tracker Backend Running");
});

/* ----------- SERVER ----------- */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});