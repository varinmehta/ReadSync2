const express = require("express");
const cookieParser = require("cookie-parser");
const user = require("./routes/user");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connection");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Connect to Database
connectDB(process.env.MONGO_URL);

// Enable CORS for frontend deployment
app.use(
    cors({
        origin: "https://read-sync2-frontend.vercel.app", // Ensure frontend URL is correct
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Use user routes
app.use(user);

// Export the app as a serverless function
module.exports = app;
