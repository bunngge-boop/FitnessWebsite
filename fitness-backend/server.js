const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* ----------- DATABASE CONNECTION ----------- */
connectDB();

/* ----------- MIDDLEWARE ----------- */
app.use(express.json());

/* ----------- CORS CONFIG (SECURE) ----------- */

const allowedOrigins = [
  "http://127.0.0.1:5500",   // Live Server
  "http://localhost:5500",
  "http://127.0.0.1:5501",
  "http://localhost:5501",
  "https://fitwebsitetrack.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {

    // Allow requests from Postman / Thunder Client
    if (!origin) return callback(null, true);

    // Allow only frontend URLs
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Block others
    return callback(new Error("CORS not allowed"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/* ----------- ROUTES ----------- */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/workout", require("./routes/workout"));
app.use("/api/calories", require("./routes/calories"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/daily-progress", require("./routes/dailyprogress"));
app.use("/api/weight-history", require("./routes/weightHistory"));

/* ----------- TEST ROUTE ----------- */
app.get("/", (req, res) => {
  res.send("Fitness Tracker Backend Running");
});

/* ----------- SERVER ----------- */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});