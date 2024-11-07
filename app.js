const express = require("express");
const cookieParser = require("cookie-parser");
const user = require("./routes/user");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connection");

const app = express();
app.use(cookieParser());
app.use(
    cors({
        origin: "https:read-sync2.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

connectDB(process.env.MONGO_URL);
app.listen(process.env.PORT || 8000);

//Middleware

app.use(express.json());

app.use(user);

console.log("Listening on port 8000");
