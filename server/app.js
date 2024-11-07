const express = require("express");
const cookieParser = require("cookie-parser");
const user = require("./routes/user");
require("dotenv").config();
const connectDB = require("./db/connection");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Connect to Database
connectDB(process.env.MONGO_URL);

// Manual CORS handling middleware
app.use((req, res, next) => {
    // Allow specific origin
    res.header("Access-Control-Allow-Origin", "https://read-sync2-frontend.vercel.app");

    // Allowed HTTP methods
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // Allowed headers
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, X-Requested-With");

    // Allow credentials such as cookies
    res.header("Access-Control-Allow-Credentials", "true");

    // If the request method is OPTIONS (preflight), end the request with 200 status
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    // Otherwise, proceed to the next middleware or route handler
    next();
});

// Use user routes
app.use(user);

// Export the app as a serverless function
module.exports = app;
