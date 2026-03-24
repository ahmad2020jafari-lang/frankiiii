// server.js - Basic Express setup
const express = require("express");
const http = require("http");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
// Add to server.js
const session = require("express-session");

// Add to server.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

app.use(session({
    secret: "tictactoe_secret",
    resave: false,
    saveUninitialized: false
}));

// Add to server.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://PlanwerkMaster:CsBeAhura@planwerkmaster.cncawku.mongodb.net/tictactoe?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("TicTacToe Server Running");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));