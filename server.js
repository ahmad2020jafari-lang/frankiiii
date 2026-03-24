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
// Replace the http server setup with socket.io
const { Server } = require("socket.io");
const io = new Server(server);

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
// Add to server.js
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        username: new RegExp(`^${username}$`, "i")
    });

    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.json({ success: false, message: "Wrong password" });
    }

    req.session.username = user.username;
    req.session.profilePic = user.profilePic;

    res.json({
        success: true,
        username: user.username,
        profilePic: user.profilePic
    });
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/login.html"));
});
// Add socket.io connection handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
// Add to server.js
let waitingPlayer = null;
let waitingTimeout = null;
let rooms = {};

function checkWinner(board) {
    const combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of combos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : "draw";
}

function smartAI(board) {
    const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null);

    // Try to win
    for (const i of empty) {
        board[i] = "O";
        if (checkWinner(board) === "O") { board[i] = null; return i; }
        board[i] = null;
    }

    // Block player win
    for (const i of empty) {
        board[i] = "X";
        if (checkWinner(board) === "X") { board[i] = null; return i; }
        board[i] = null;
    }

    return empty[Math.floor(Math.random() * empty.length)];
}
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));