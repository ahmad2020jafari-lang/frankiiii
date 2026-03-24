require('dotenv').config({ path: './.env' });

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// IMPORTANT: Set the correct path for static files
// HTML/CSS/JS files are in public
app.use(express.static(path.join(__dirname, "public")));

// Also serve uploaded files from public/uploads
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSP Header Fix
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000; " +
        "style-src 'self' 'unsafe-inline'; " +
        "connect-src 'self' ws://localhost:3000 http://localhost:3000; " +
        "img-src 'self' data: blob:; " +
        "font-src 'self' data:;"
    );
    next();
});

// Session
app.use(session({
    secret: "tictactoe_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// MongoDB Connection
mongoose.connect("mongodb+srv://PlanwerkMaster:CsBeAhura@planwerkmaster.cncawku.mongodb.net/tictactoe?retryWrites=true&w=majority")
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => console.log(" MongoDB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    profilePic: String
});

const User = mongoose.model("User", userSchema);

// Email Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log("Email server error:", error);
    } else {
        console.log("Email server is ready");
    }
});

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// File Upload - Save to public/uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "public/uploads");
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
    res.redirect("/login.html");
});

app.get("/game.html", (req, res) => {
    if (!req.session.username) return res.redirect("/login.html");
    res.sendFile(path.join(__dirname, "public/game.html"));
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/login.html"));
});

// Signup
app.post("/signup", upload.single("profilePic"), async (req, res) => {
    try {
        const { username, email } = req.body;

        const existing = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existing) {
            return res.json({ success: false, message: "Username or email already exists" });
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
            text: `Your TicTacToe password is: ${code}\n\nUse this 6-digit code with your username to login.`
        });

        res.json({ success: true, message: "Account created! Check your email for password." });
    } catch (error) {
        console.error("Signup error:", error);
        res.json({ success: false, message: "Server error. Please try again." });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Login error:", error);
        res.json({ success: false, message: "Server error" });
    }
});

// Game Variables
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
    if (empty.length === 0) return null;

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

// Socket.io
io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("playerInfo", (data) => {
        socket.username = data.username;
        socket.profilePic = data.profilePic;
        console.log(`👤 Player info: ${socket.username}`);

        if (waitingPlayer && waitingPlayer.id !== socket.id) {
            if (waitingTimeout) clearTimeout(waitingTimeout);

            const room = waitingPlayer.id + "#" + socket.id;
            socket.join(room);
            waitingPlayer.join(room);

            rooms[room] = {
                leftPlayer: waitingPlayer,
                rightPlayer: socket,
                board: Array(9).fill(null),
                turn: "X"
            };

            io.to(room).emit("startGame", {
                room,
                leftPlayer: {
                    id: waitingPlayer.id,
                    username: waitingPlayer.username,
                    profilePic: waitingPlayer.profilePic
                },
                rightPlayer: {
                    id: socket.id,
                    username: socket.username,
                    profilePic: socket.profilePic
                }
            });

            waitingPlayer = null;
            console.log("🎮 Game started with two players");
        } else {
            waitingPlayer = socket;
            socket.emit("waiting");
            console.log("⏳ Player waiting for opponent");

            waitingTimeout = setTimeout(() => {
                if (waitingPlayer === socket) {
                    const room = socket.id;
                    socket.join(room);
                    rooms[room] = {
                        leftPlayer: socket,
                        rightPlayer: "AI",
                        board: Array(9).fill(null),
                        turn: "X"
                    };

                    socket.emit("startGame", {
                        room,
                        leftPlayer: {
                            id: socket.id,
                            username: socket.username,
                            profilePic: socket.profilePic
                        },
                        rightPlayer: {
                            id: "AI",
                            username: "AI",
                            profilePic: "/uploads/ai-avatar.png"
                        }
                    });

                    waitingPlayer = null;
                    console.log("🤖 Started game with AI");
                }
            }, 5000);
        }
    });

    socket.on("move", ({ room, index, player }) => {
        const roomData = rooms[room];
        if (!roomData) return;
        if (roomData.board[index] !== null) return;
        if (roomData.turn !== player) return;

        roomData.board[index] = player;
        roomData.turn = player === "X" ? "O" : "X";

        io.to(room).emit("move", { index, player });

        const winner = checkWinner(roomData.board);
        if (winner) {
            io.to(room).emit("gameOver", { winner });
            return;
        }

        if (roomData.rightPlayer === "AI" && player === "X") {
            const aiIndex = smartAI(roomData.board);
            if (aiIndex !== null) {
                roomData.board[aiIndex] = "O";
                roomData.turn = "X";

                setTimeout(() => {
                    io.to(room).emit("move", { index: aiIndex, player: "O" });
                    const w2 = checkWinner(roomData.board);
                    if (w2) io.to(room).emit("gameOver", { winner: w2 });
                }, 700);
            }
        }
    });

    socket.on("restart", ({ room }) => {
        const roomData = rooms[room];
        if (!roomData) return;

        roomData.board = Array(9).fill(null);
        roomData.turn = "X";
        io.to(room).emit("restart");
    });

    socket.on("disconnect", () => {
        console.log("🔌 User disconnected:", socket.id);
        if (waitingPlayer === socket) {
            waitingPlayer = null;
            if (waitingTimeout) clearTimeout(waitingTimeout);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Static files served from: ${path.join(__dirname, "public")}`);
    console.log(`📝 Login page: http://localhost:${PORT}/login.html`);
});