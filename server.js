// server.js - Basic Express setup
const express = require("express");
const http = require("http");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
// Add to server.js
const session = require("express-session");
// Nodemailer
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

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
// Add to server.js


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Add to server.js
app.post("/signup", upload.single("profilePic"), async (req, res) => {
    const { username, email } = req.body;

    const existing = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existing) {
        return res.json({ success: false, message: "User exists" });
    }

    const code = generateCode();
    const hashed = await bcrypt.hash(code, 10);

    const user = new User({
        username,
        email,
        password: hashed,
        profilePic: req.file ? "/uploads/" + req.file.filename : "/user-avatar.png"
    });

    await user.save();

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "TicTacToe Login Code",
        text: `Your TicTacToe password is: ${code}`
    });

    res.json({ success: true });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));