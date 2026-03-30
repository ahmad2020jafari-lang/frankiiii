// require('dotenv').config({ path: './.env' });

// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const session = require("express-session");
// const http = require("http");
// const { Server } = require("socket.io");
// const path = require("path");
// const multer = require("multer");
// const nodemailer = require("nodemailer");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static(path.join(__dirname, "public")));
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CSP Header Fix
// app.use((req, res, next) => {
//     res.setHeader(
//         "Content-Security-Policy",
//         "default-src 'self'; " +
//         "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000; " +
//         "style-src 'self' 'unsafe-inline'; " +
//         "connect-src 'self' ws://localhost:3000 http://localhost:3000; " +
//         "img-src 'self' data: blob:; " +
//         "font-src 'self' data:;"
//     );
//     next();
// });

// // Session
// app.use(session({
//     secret: "tictactoe_secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }));

// // MongoDB Connection
// mongoose.connect("mongodb+srv://PlanwerkMaster:CsBeAhura@planwerkmaster.cncawku.mongodb.net/tictactoe?retryWrites=true&w=majority")
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log("MongoDB Error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//     username: { type: String, unique: true },
//     email: { type: String, unique: true },
//     password: String,
//     profilePic: String
// });
// const User = mongoose.model("User", userSchema);

// // Email Setup
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });
// transporter.verify((error, success) => {
//     if (error) console.log("Email server error:", error);
//     else console.log("Email server ready");
// });

// function generateCode() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // File Upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = path.join(__dirname, "public/uploads");
//         const fs = require('fs');
//         if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage });

// // ---------------- ROUTES ----------------
// app.get("/", (req, res) => res.redirect("/login.html"));
// app.get("/game.html", (req, res) => {
//     if (!req.session.username) return res.redirect("/login.html");
//     res.sendFile(path.join(__dirname, "public/game.html"));
// });
// app.get("/logout", (req, res) => req.session.destroy(() => res.redirect("/login.html")));

// // Signup
// app.post("/signup", upload.single("profilePic"), async (req, res) => {
//     try {
//         const { username, email } = req.body;
//         const existing = await User.findOne({ $or: [{ username }, { email }] });
//         if (existing) return res.json({ success: false, message: "Username or email exists" });

//         const code = generateCode();
//         const hashed = await bcrypt.hash(code, 10);

//         const user = new User({
//             username,
//             email,
//             password: hashed,
//             profilePic: req.file ? "/uploads/" + req.file.filename : "/user-avatar.png"
//         });
//         await user.save();

//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "TicTacToe Login Code",
//             text: `Your TicTacToe password is: ${code}\nUse this 6-digit code with your username to login.`
//         });

//         res.json({ success: true, message: "Account created! Check email for password." });
//     } catch (error) {
//         console.error("Signup error:", error);
//         res.json({ success: false, message: "Server error." });
//     }
// });

// // Login
// app.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username: new RegExp(`^${username}$`, "i") });
//         if (!user) return res.json({ success: false, message: "User not found" });

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) return res.json({ success: false, message: "Wrong password" });

//         req.session.username = user.username;
//         req.session.profilePic = user.profilePic;
//         res.json({ success: true, username: user.username, profilePic: user.profilePic });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.json({ success: false, message: "Server error" });
//     }
// });

// // ---------------- GAME LOGIC ----------------
// let waitingPlayer = null;
// let waitingTimeout = null;
// let rooms = {};

// // Winner check
// function checkWinner(board) {
//     const combos = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8],
//         [0, 3, 6], [1, 4, 7], [2, 5, 8],
//         [0, 4, 8], [2, 4, 6]
//     ];
//     for (const [a, b, c] of combos) {
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
//     }
//     return board.includes(null) ? null : "draw";
// }

// // ---------------- MINIMAX AI ----------------
// function minimax(board, isMaximizing) {
//     const winner = checkWinner(board);
//     if (winner === "O") return 1;
//     if (winner === "X") return -1;
//     if (winner === "draw") return 0;

//     if (isMaximizing) {
//         let bestScore = -Infinity;
//         for (let i = 0; i < 9; i++) {
//             if (board[i] === null) {
//                 board[i] = "O";
//                 let score = minimax(board, false);
//                 board[i] = null;
//                 bestScore = Math.max(score, bestScore);
//             }
//         }
//         return bestScore;
//     } else {
//         let bestScore = Infinity;
//         for (let i = 0; i < 9; i++) {
//             if (board[i] === null) {
//                 board[i] = "X";
//                 let score = minimax(board, true);
//                 board[i] = null;
//                 bestScore = Math.min(score, bestScore);
//             }
//         }
//         return bestScore;
//     }
// }

// // ---------------- EXPERIENCE SYSTEM ----------------
// const aiExperience = {}; // board state -> move -> score

// function rememberExperience(board, move, result) {
//     const key = board.join('');
//     if (!aiExperience[key]) aiExperience[key] = {};
//     aiExperience[key][move] = (aiExperience[key][move] || 0) + result;
// }

// function experienceScore(board, move) {
//     const key = board.join('');
//     if (aiExperience[key] && aiExperience[key][move] !== undefined) {
//         return aiExperience[key][move];
//     }
//     return 0;
// }

// // ---------------- COMBINED AI DECISION ----------------
// function getBestMoveWithExperience(board) {
//     let bestScore = -Infinity;
//     let bestMove = null;
//     for (let i = 0; i < 9; i++) {
//         if (board[i] === null) {
//             board[i] = "O";
//             let score = minimax(board, false);
//             board[i] = null;

//             const expScore = experienceScore(board, i);
//             const combinedScore = score + expScore;

//             if (combinedScore > bestScore) {
//                 bestScore = combinedScore;
//                 bestMove = i;
//             }
//         }
//     }
//     return bestMove;
// }

// // ---------------- SOCKET.IO ----------------
// io.on("connection", (socket) => {
//     console.log("🔌 User connected:", socket.id);

//     socket.on("playerInfo", (data) => {
//         socket.username = data.username;
//         socket.profilePic = data.profilePic;

//         if (waitingPlayer && waitingPlayer.id !== socket.id) {
//             if (waitingTimeout) clearTimeout(waitingTimeout);

//             const room = waitingPlayer.id + "#" + socket.id;
//             socket.join(room);
//             waitingPlayer.join(room);

//             rooms[room] = { leftPlayer: waitingPlayer, rightPlayer: socket, board: Array(9).fill(null), turn: "X" };
//             io.to(room).emit("startGame", {
//                 room,
//                 leftPlayer: { id: waitingPlayer.id, username: waitingPlayer.username, profilePic: waitingPlayer.profilePic },
//                 rightPlayer: { id: socket.id, username: socket.username, profilePic: socket.profilePic }
//             });

//             waitingPlayer = null;
//         } else {
//             waitingPlayer = socket;
//             socket.emit("waiting");

//             waitingTimeout = setTimeout(() => {
//                 if (waitingPlayer === socket) {
//                     const room = socket.id;
//                     socket.join(room);
//                     rooms[room] = { leftPlayer: socket, rightPlayer: "AI", board: Array(9).fill(null), turn: "X" };
//                     socket.emit("startGame", {
//                         room,
//                         leftPlayer: { id: socket.id, username: socket.username, profilePic: socket.profilePic },
//                         rightPlayer: { id: "AI", username: "AI", profilePic: "/uploads/ai-avatar.png" }
//                     });
//                     waitingPlayer = null;
//                 }
//             }, 5000);
//         }
//     });

//     socket.on("move", ({ room, index, player }) => {
//         const roomData = rooms[room];
//         if (!roomData || roomData.board[index] !== null || roomData.turn !== player) return;

//         roomData.board[index] = player;
//         roomData.turn = player === "X" ? "O" : "X";
//         io.to(room).emit("move", { index, player });

//         const winner = checkWinner(roomData.board);
//         if (winner) {
//             io.to(room).emit("gameOver", { winner });
//             return;
//         }

//         // AI MOVE
//         if (roomData.rightPlayer === "AI" && player === "X") {
//             const aiIndex = getBestMoveWithExperience(roomData.board);
//             if (aiIndex !== null) {
//                 roomData.board[aiIndex] = "O";
//                 roomData.turn = "X";

//                 setTimeout(() => {
//                     io.to(room).emit("move", { index: aiIndex, player: "O" });
//                     const w2 = checkWinner(roomData.board);

//                     // KI lernt aus dem Spiel
//                     if (w2 === "O") rememberExperience(roomData.board, aiIndex, 1);
//                     else if (w2 === "X") rememberExperience(roomData.board, aiIndex, -1);
//                     else if (w2 === "draw") rememberExperience(roomData.board, aiIndex, 0.5);

//                     if (w2) io.to(room).emit("gameOver", { winner: w2 });
//                 }, 700);
//             }
//         }
//     });

//     socket.on("restart", ({ room }) => {
//         const roomData = rooms[room];
//         if (!roomData) return;
//         roomData.board = Array(9).fill(null);
//         roomData.turn = "X";
//         io.to(room).emit("restart");
//     });

//     socket.on("disconnect", () => {
//         if (waitingPlayer === socket) {
//             waitingPlayer = null;
//             if (waitingTimeout) clearTimeout(waitingTimeout);
//         }
//     });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
//////////////////////
//////////////////////
//////////////////////
// <!-- I want to test the Voice and Chat -->
// <!-- I want to test the Voice and Chat -->
// <!-- I want to test the Voice and Chat -->
// Replace the configuration section at the top of game.js with this:

// Configuration for WebRTC - Using multiple STUN servers
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    transports: ['websocket', 'polling']
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSP Header Fix
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000 https://*.onrender.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "connect-src 'self' ws://localhost:3000 http://localhost:3000 https://*.onrender.com wss://*.onrender.com; " +
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
    cookie: { secure: false } // Set to true if using HTTPS
}));

// MongoDB Connection
mongoose.connect("mongodb+srv://PlanwerkMaster:CsBeAhura@planwerkmaster.cncawku.mongodb.net/tictactoe?retryWrites=true&w=majority")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    profilePic: String
});
const User = mongoose.model("User", userSchema);

// ========================
// EMAIL SETUP - FIXED VERSION
// ========================
let transporter = null;
let emailConfigured = false;

console.log("📧 Setting up email service...");
console.log("Checking environment variables:");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Found: " + process.env.EMAIL_USER : "❌ Missing");
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASS ? "✅ Found" : "❌ Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Found" : "❌ Missing");

// Try to get password from either variable name
const emailPassword = process.env.EMAIL_PASS || process.env.EMAIL_PASS;

if (process.env.EMAIL_USER && emailPassword) {
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: emailPassword
        },
        // Add these options for better reliability
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000
    });

    // Verify connection
    transporter.verify((error, success) => {
        if (error) {
            console.log("❌ Gmail connection failed:", error.message);
            console.log("   Please check:");
            console.log("   1. Email and password are correct");
            console.log("   2. If using Gmail, you need an App Password (not regular password)");
            console.log("   3. 2-Factor Authentication must be enabled for App Password");
            emailConfigured = false;
        } else {
            console.log("✅ Gmail configured successfully! Will send from:", process.env.EMAIL_USER);
            emailConfigured = true;
        }
    });
} else {
    console.log("⚠️ Email credentials missing. Please add to Render dashboard:");
    console.log("   - EMAIL_USER: your-email@gmail.com");
    console.log("   - EMAIL_PASSWORD: your-app-specific-password (16 chars)");
    console.log("   Or EMAIL_PASS as alternative variable name");
}

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "public/uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Avatar endpoints
app.get('/user-avatar.png', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#00c6ff"/><circle cx="50" cy="35" r="15" fill="white"/><circle cx="38" cy="32" r="2" fill="black"/><circle cx="62" cy="32" r="2" fill="black"/><path d="M35 55 Q50 70 65 55" stroke="white" stroke-width="3" fill="none"/></svg>`);
});

app.get('/charlie-avatar.png', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#ee5a24"/><rect x="35" y="30" width="30" height="25" rx="5" fill="white"/><circle cx="40" cy="40" r="3" fill="black"/><circle cx="60" cy="40" r="3" fill="black"/><path d="M30 70 L50 80 L70 70" stroke="white" stroke-width="3" fill="none"/></svg>`);
});

// Health check with more details
app.get("/ping", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        emailConfigured: emailConfigured,
        fromEmail: process.env.EMAIL_USER,
        environment: process.env.RENDER ? "Render" : "Local",
        nodeEnv: process.env.NODE_ENV
    });
});

// Test email route
app.get("/test-email", async (req, res) => {
    if (!transporter || !emailConfigured) {
        return res.json({
            success: false,
            message: "Email not configured. Add EMAIL_USER and EMAIL_PASSWORD to environment variables.",
            emailUser: process.env.EMAIL_USER ? "✅ Set: " + process.env.EMAIL_USER : "❌ Missing",
            emailPassword: (process.env.EMAIL_PASS || process.env.EMAIL_PASS) ? "✅ Set" : "❌ Missing",
            instructions: "To set up Gmail: 1. Enable 2FA on Google account 2. Generate App Password 3. Add to Render"
        });
    }

    try {
        const testEmail = "tictactoeplanwerk@gmail.com";
        await transporter.sendMail({
            from: `"TicTacToe Game" <${process.env.EMAIL_USER}>`,
            to: testEmail,
            subject: "✅ Test Email from TicTacToe",
            html: `
                <div style="font-family: Arial; text-align: center; padding: 40px; background: linear-gradient(135deg, #0f2027, #203a43); border-radius: 15px;">
                    <h1 style="color: #00eaff;">🎮 TicTacToe</h1>
                    <p style="color: white;">Email is working! You can now create accounts and receive login codes.</p>
                    <p style="color: white;">Time: ${new Date().toLocaleString()}</p>
                    <p style="color: #00eaff;">Server: ${process.env.RENDER ? "Render.com" : "Local"}</p>
                </div>
            `
        });

        console.log("✅ Test email sent to:", testEmail);
        res.json({ success: true, message: "Test email sent! Check inbox/spam folder." });
    } catch (error) {
        console.error("❌ Test email failed:", error.message);
        res.json({
            success: false,
            error: error.message,
            suggestion: "Check if the email credentials are correct and App Password is used for Gmail"
        });
    }
});

// Routes
app.get("/", (req, res) => res.redirect("/login.html"));
app.get("/game.html", (req, res) => {
    if (!req.session.username) return res.redirect("/login.html");
    res.sendFile(path.join(__dirname, "public/game.html"));
});
app.get("/logout", (req, res) => req.session.destroy(() => res.redirect("/login.html")));

// SIGNUP - FIXED EMAIL SENDING
app.post("/signup", upload.single("profilePic"), async (req, res) => {
    try {
        const { username, email } = req.body;

        console.log("📝 Signup attempt:", username, email);

        const existing = await User.findOne({ $or: [{ username }, { email }] });
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
        console.log("✅ User saved:", username);
        console.log("🔑 Generated code for", email, ":", code);

        // Send email with better error handling
        let emailSent = false;
        let emailError = null;

        if (transporter && emailConfigured) {
            try {
                const mailOptions = {
                    from: `"TicTacToe Game" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: "🔐 Your TicTacToe Login Code",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: linear-gradient(135deg, #0f2027, #203a43); border-radius: 15px; text-align: center;">
                            <h2 style="color: #00eaff;">🎮 TicTacToe</h2>
                            <p style="color: white;">Hello <strong>${username}</strong>,</p>
                            <p style="color: white;">Your account has been created successfully!</p>
                            <div style="background: rgba(0,234,255,0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <p style="color: white; margin-bottom: 10px;">Your login code is:</p>
                                <h1 style="color: #00eaff; font-size: 48px; letter-spacing: 5px; margin: 10px 0;">${code}</h1>
                            </div>
                            <p style="color: white;">Use this code to login to your account.</p>
                            <p style="color: #ffd966; font-size: 14px;">💡 Tip: You can change your password after login!</p>
                            <p style="color: #888; font-size: 12px; margin-top: 20px;">This is an automated message. Please do not reply.</p>
                        </div>
                    `,
                    text: `Welcome to TicTacToe!\n\nHello ${username},\n\nYour login code is: ${code}\n\nUse this code to login to your account.\n\nThis is an automated message.`
                };

                const info = await transporter.sendMail(mailOptions);
                emailSent = true;
                console.log("✅ Email sent successfully to:", email, "Message ID:", info.messageId);
            } catch (error) {
                emailError = error.message;
                console.error("❌ Email sending failed:", error.message);
                console.error("   Full error:", error);
            }
        } else {
            emailError = "Email transporter not configured";
            console.error("❌ Cannot send email: Transporter not ready");
            console.log("   Transporter exists:", !!transporter);
            console.log("   Email configured:", emailConfigured);
        }

        // Response based on email success
        if (emailSent) {
            res.json({
                success: true,
                message: "Account created! Check your email for the login code. (Please check spam folder if not in inbox)"
            });
        } else {
            // Still return success but show code for development
            res.json({
                success: true,
                message: `Account created! However, we couldn't send the email. Please contact support.`,
                code: process.env.NODE_ENV === 'development' ? code : null,
                emailError: emailError
            });
        }

    } catch (error) {
        console.error("❌ Signup error:", error);
        res.json({ success: false, message: "Server error: " + error.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: new RegExp(`^${username}$`, "i") });
        if (!user) return res.json({ success: false, message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json({ success: false, message: "Wrong password" });

        req.session.username = user.username;
        req.session.profilePic = user.profilePic;
        res.json({ success: true, username: user.username, profilePic: user.profilePic });
    } catch (error) {
        console.error("Login error:", error);
        res.json({ success: false, message: "Server error" });
    }
});

// ========================
// GAME LOGIC (same as before)
// ========================
let waitingPlayer = null;
let waitingTimeout = null;
let rooms = {};

function checkWinner(board) {
    const combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const [a, b, c] of combos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.includes(null) ? null : "draw";
}

function minimax(board, isMaximizing) {
    const winner = checkWinner(board);
    if (winner === "O") return 1;
    if (winner === "X") return -1;
    if (winner === "draw") return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "O";
                let score = minimax(board, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "X";
                let score = minimax(board, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = "O";
            let score = minimax(board, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

io.on("connection", (socket) => {
    socket.on("playerInfo", (data) => {
        socket.username = data.username;
        socket.profilePic = data.profilePic;

        if (waitingPlayer && waitingPlayer.id !== socket.id) {
            if (waitingTimeout) clearTimeout(waitingTimeout);
            const room = waitingPlayer.id + "#" + socket.id;
            socket.join(room);
            waitingPlayer.join(room);
            rooms[room] = { leftPlayer: waitingPlayer, rightPlayer: socket, board: Array(9).fill(null), turn: "X", gameEnded: false };
            io.to(room).emit("startGame", {
                room,
                leftPlayer: { id: waitingPlayer.id, username: waitingPlayer.username, profilePic: waitingPlayer.profilePic },
                rightPlayer: { id: socket.id, username: socket.username, profilePic: socket.profilePic }
            });
            waitingPlayer = null;
        } else {
            waitingPlayer = socket;
            socket.emit("waiting");
            waitingTimeout = setTimeout(() => {
                if (waitingPlayer === socket) {
                    const room = socket.id;
                    socket.join(room);
                    rooms[room] = { leftPlayer: socket, rightPlayer: "Charlie", board: Array(9).fill(null), turn: "X", gameEnded: false };
                    socket.emit("startGame", {
                        room,
                        leftPlayer: { id: socket.id, username: socket.username, profilePic: socket.profilePic },
                        rightPlayer: { id: "Charlie", username: "Charlie 🤖", profilePic: "/charlie-avatar.png" }
                    });
                    waitingPlayer = null;
                }
            }, 5000);
        }
    });

    socket.on("playWithCharlie", () => {
        const room = socket.id + "_charlie";
        socket.join(room);
        rooms[room] = { leftPlayer: socket, rightPlayer: "Charlie", board: Array(9).fill(null), turn: "X", gameEnded: false };
        socket.emit("startGame", {
            room,
            leftPlayer: { id: socket.id, username: socket.username, profilePic: socket.profilePic },
            rightPlayer: { id: "Charlie", username: "Charlie 🤖", profilePic: "/charlie-avatar.png" }
        });
    });

    socket.on("move", ({ room, index, player }) => {
        const roomData = rooms[room];
        if (!roomData || roomData.gameEnded || roomData.board[index] !== null || roomData.turn !== player) return;

        roomData.board[index] = player;
        roomData.turn = player === "X" ? "O" : "X";
        io.to(room).emit("move", { index, player });

        const winner = checkWinner(roomData.board);
        if (winner) {
            roomData.gameEnded = true;
            io.to(room).emit("gameOver", { winner });
            return;
        }

        if (roomData.rightPlayer === "Charlie" && player === "X" && !roomData.gameEnded) {
            const charlieMove = getBestMove(roomData.board);
            if (charlieMove !== null) {
                setTimeout(() => {
                    if (!roomData.gameEnded) {
                        roomData.board[charlieMove] = "O";
                        roomData.turn = "X";
                        io.to(room).emit("move", { index: charlieMove, player: "O" });
                        const w2 = checkWinner(roomData.board);
                        if (w2) {
                            roomData.gameEnded = true;
                            io.to(room).emit("gameOver", { winner: w2 });
                        }
                    }
                }, 700);
            }
        }
    });

    socket.on("restart", ({ room }) => {
        const roomData = rooms[room];
        if (roomData) {
            roomData.board = Array(9).fill(null);
            roomData.turn = "X";
            roomData.gameEnded = false;
            io.to(room).emit("restart");
        }
    });

    socket.on("chatMessage", (data) => {
        const { room, message, username, profilePic, timestamp } = data;
        if (rooms[room]) {
            socket.to(room).emit("chatMessage", { username, profilePic, message, timestamp });
        }
    });

    socket.on("callSignal", (data) => {
        const { room, signal, type, isVideo } = data;
        if (rooms[room] && rooms[room].rightPlayer !== "Charlie") {
            socket.to(room).emit("callSignal", { signal, type, isVideo });
        }
    });

    socket.on("callEnded", ({ room }) => {
        if (rooms[room] && rooms[room].rightPlayer !== "Charlie") {
            socket.to(room).emit("callEnded");
        }
    });

    socket.on("disconnect", () => {
        if (waitingPlayer === socket) {
            waitingPlayer = null;
            if (waitingTimeout) clearTimeout(waitingTimeout);
        }
        for (const [roomId, roomData] of Object.entries(rooms)) {
            if (roomData.leftPlayer?.id === socket.id || roomData.rightPlayer?.id === socket.id) {
                delete rooms[roomId];
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));