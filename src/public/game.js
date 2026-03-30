// const loginForm = document.getElementById("loginForm");

// if (loginForm) {

//     loginForm.addEventListener("submit", async e => {

//         e.preventDefault();

//         const username = document.getElementById("username").value.trim();
//         const password = document.getElementById("password").value.trim();

//         const res = await fetch("/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password })
//         });

//         const data = await res.json();

//         if (data.success) {

//             localStorage.setItem("username", data.username);
//             localStorage.setItem("profilePic", data.profilePic);

//             window.location.href = "/game.html";

//         } else {

//             alert(data.message);

//         }

//     });

// }

// // ---------------- GAME ----------------

// const socket = typeof io !== "undefined" ? io() : null;

// if (socket) {

//     let room = null;
//     let playerSymbol = "X";
//     let opponentSymbol = "O";
//     let isMyTurn = false;
//     let board = Array(9).fill("");
//     let gameActive = false;

//     let username = localStorage.getItem("username");
//     let profilePic = localStorage.getItem("profilePic");

//     socket.emit("playerInfo", { username, profilePic });

//     const cells = document.querySelectorAll(".cell");
//     const statusText = document.getElementById("statusText");
//     const p1Name = document.getElementById("player1Name");
//     const p2Name = document.getElementById("player2Name");
//     const p1Pic = document.getElementById("player1Pic");
//     const p2Pic = document.getElementById("player2Pic");
//     const p1ScoreEl = document.getElementById("player1Score");
//     const p2ScoreEl = document.getElementById("player2Score");
//     const restartBtn = document.getElementById("restartBtn");
//     const historyList = document.getElementById("historyList");

//     let playerMap = {};
//     let playerScore = { X: 0, O: 0 };

//     const winCombos = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8],
//         [0, 3, 6], [1, 4, 7], [2, 5, 8],
//         [0, 4, 8], [2, 4, 6]
//     ];

//     socket.on("waiting", () => {
//         statusText.textContent = "Waiting for opponent...";
//     });

//     socket.on("startGame", (data) => {

//         room = data.room;
//         board = Array(9).fill("");
//         gameActive = true;

//         p1Name.textContent = data.leftPlayer.username;
//         p1Pic.src = data.leftPlayer.profilePic;

//         p2Name.textContent = data.rightPlayer.username;
//         p2Pic.src = data.rightPlayer.profilePic;

//         playerMap = { X: data.leftPlayer.username, O: data.rightPlayer.username };

//         if (socket.id === data.leftPlayer.id) {
//             playerSymbol = "X";
//             opponentSymbol = "O";
//         } else {
//             playerSymbol = "O";
//             opponentSymbol = "X";
//         }

//         isMyTurn = playerSymbol === "X";

//         cells.forEach(c => c.classList.remove("x", "o", "winner"));

//         updateScores();
//         updateStatus();

//     });

//     socket.on("move", ({ index, player }) => {

//         board[index] = player;

//         cells[index].classList.add(player === "X" ? "x" : "o");

//         const winner = checkWinner();

//         if (winner) {
//             endGame(winner);
//             return;
//         }

//         isMyTurn = player !== playerSymbol;

//         updateStatus();

//     });

//     socket.on("restart", () => {

//         board = Array(9).fill("");

//         cells.forEach(c => c.classList.remove("x", "o", "winner"));

//         gameActive = true;

//         isMyTurn = playerSymbol === "X";

//         updateStatus();

//     });

//     cells.forEach((cell, index) => {

//         cell.addEventListener("click", () => {

//             if (!gameActive || !isMyTurn || board[index] !== "") return;

//             socket.emit("move", { room, index, player: playerSymbol });

//         });

//     });

//     restartBtn.addEventListener("click", () => {

//         socket.emit("restart", { room });

//     });

//     function checkWinner() {

//         for (const [a, b, c] of winCombos) {

//             if (board[a] && board[a] === board[b] && board[a] === board[c]) {

//                 cells[a].classList.add("winner");
//                 cells[b].classList.add("winner");
//                 cells[c].classList.add("winner");

//                 return board[a];

//             }

//         }

//         return board.includes("") ? null : "draw";

//     }

//     function endGame(winner) {

//         gameActive = false;

//         if (winner === "draw") {

//             statusText.textContent = "Draw";

//             addHistory("Draw");

//             return;

//         }

//         playerScore[winner]++;

//         const winnerName = playerMap[winner];

//         statusText.textContent = winnerName + " wins";

//         updateScores();

//         addHistory(winnerName + " won");

//     }

//     function updateStatus() {

//         if (!gameActive) return;

//         statusText.textContent = isMyTurn ? "Your turn" : "Opponent turn";

//     }

//     function updateScores() {

//         p1ScoreEl.textContent = playerScore["X"];
//         p2ScoreEl.textContent = playerScore["O"];

//     }

//     function addHistory(text) {

//         const li = document.createElement("li");

//         li.textContent = text;

//         historyList.prepend(li);

//     }

// }

////////////////////
////////////////////
////////////////////
// <!-- I want to test the Voice and Chat -->
// <!-- I want to test the Voice and Chat -->
// <!-- I want to test the Voice and Chat -->
// ========================
// LOGIN PAGE HANDLER
// ========================
// ========================
// LOGIN PAGE HANDLER
// ========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async e => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("profilePic", data.profilePic);
            window.location.href = "/game.html";
        } else {
            alert(data.message);
        }
    });
}

// ========================
// SIGNUP PAGE HANDLER
// ========================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    // File upload button handler
    const chooseFileBtn = document.getElementById("chooseFileBtn");
    const profilePicInput = document.getElementById("profilePic");
    const fileNameSpan = document.getElementById("fileName");

    if (chooseFileBtn) {
        chooseFileBtn.addEventListener("click", () => {
            profilePicInput.click();
        });
    }

    if (profilePicInput) {
        profilePicInput.addEventListener("change", function (e) {
            const file = e.target.files[0];
            if (file) {
                fileNameSpan.textContent = file.name;
            } else {
                fileNameSpan.textContent = "No file selected";
            }
        });
    }

    // Copy code button
    const copyCodeBtn = document.getElementById("copyCodeBtn");
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener("click", () => {
            const code = document.getElementById("tempCode").textContent;
            navigator.clipboard.writeText(code);
            alert("Code copied to clipboard!");
        });
    }

    // Signup form submit
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        try {
            const res = await fetch("/signup", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                if (data.code) {
                    document.getElementById("tempCode").textContent = data.code;
                    document.getElementById("codeDisplay").style.display = "block";
                    alert("Account created! Please save your login code.");
                } else {
                    alert(data.message);
                    window.location.href = "/login.html";
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Server error. Please try again.");
        }
    });
}

// ========================
// GAME PAGE HANDLER
// ========================
const socket = typeof io !== "undefined" ? io() : null;

if (socket && document.getElementById("statusText")) {
    // Game state
    let room = null;
    let playerSymbol = "X";
    let opponentSymbol = "O";
    let isMyTurn = false;
    let board = Array(9).fill("");
    let gameActive = false;
    let gameEnded = false;
    let opponentName = "";
    let opponentId = "";

    let username = localStorage.getItem("username");
    let profilePic = localStorage.getItem("profilePic");

    socket.emit("playerInfo", { username, profilePic });

    // DOM elements
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("statusText");
    const p1Name = document.getElementById("player1Name");
    const p2Name = document.getElementById("player2Name");
    const p1Pic = document.getElementById("player1Pic");
    const p2Pic = document.getElementById("player2Pic");
    const p1ScoreEl = document.getElementById("player1Score");
    const p2ScoreEl = document.getElementById("player2Score");
    const restartBtn = document.getElementById("restartBtn");
    const historyList = document.getElementById("historyList");
    const playCharlieBtn = document.getElementById("playCharlieBtn");

    // Chat elements
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendMsgBtn = document.getElementById("sendMsgBtn");
    const audioCallBtn = document.getElementById("audioCallBtn");
    const videoCallBtn = document.getElementById("videoCallBtn");
    const callStatus = document.getElementById("callStatus");
    const callStatusText = document.getElementById("callStatusText");
    const endCallBtn = document.getElementById("endCallBtn");
    const minimizeChatBtn = document.getElementById("minimizeChatBtn");
    const chatBody = document.getElementById("chatBody");

    // Video elements
    const videoContainer = document.getElementById("videoContainer");
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");
    const closeVideoBtn = document.getElementById("closeVideoBtn");
    const toggleMicBtn = document.getElementById("toggleMicBtn");
    const toggleCameraBtn = document.getElementById("toggleCameraBtn");
    const endVideoCallBtn = document.getElementById("endVideoCallBtn");

    // Game state
    let playerMap = {};
    let playerScore = { X: 0, O: 0 };

    // Call state
    let callActive = false;
    let localStream = null;
    let peerConnection = null;
    let isVideoCall = false;
    let isMicMuted = false;
    let isCameraOff = false;
    let pendingCandidates = [];
    let callInProgress = false;
    let incomingCallTimer = null;
    let callTimeout = null;

    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const configuration = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" }
        ],
        iceCandidatePoolSize: 10
    };

    function initPeerConnection() {
        if (peerConnection) {
            peerConnection.close();
        }

        peerConnection = new RTCPeerConnection(configuration);

        if (localStream) {
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });
        }

        peerConnection.ontrack = (event) => {
            if (remoteVideo) {
                remoteVideo.srcObject = event.streams[0];
            }
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate && room && callInProgress) {
                socket.emit("callSignal", {
                    room: room,
                    signal: event.candidate,
                    type: "candidate",
                    isVideo: isVideoCall
                });
            }
        };

        if (pendingCandidates.length > 0 && peerConnection.remoteDescription) {
            pendingCandidates.forEach(candidate => {
                peerConnection.addIceCandidate(candidate).catch(e => console.error(e));
            });
            pendingCandidates = [];
        }
    }

    function cleanupMedia() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream = null;
        }
        if (localVideo) localVideo.srcObject = null;
        if (remoteVideo) remoteVideo.srcObject = null;
    }

    function resetCallUI() {
        if (callStatus) callStatus.style.display = "none";
        if (videoContainer) videoContainer.style.display = "none";
        if (audioCallBtn) audioCallBtn.innerHTML = '<i class="fas fa-phone"></i> Audio Call';
        if (videoCallBtn) videoCallBtn.innerHTML = '<i class="fas fa-video"></i> Video Call';
        isMicMuted = false;
        isCameraOff = false;
        if (toggleMicBtn) toggleMicBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        if (toggleCameraBtn) toggleCameraBtn.innerHTML = '<i class="fas fa-video"></i>';
    }

    // Minimize chat
    if (minimizeChatBtn) {
        minimizeChatBtn.addEventListener("click", () => {
            if (chatBody) {
                chatBody.classList.toggle("minimized");
                const icon = minimizeChatBtn.querySelector("i");
                if (chatBody.classList.contains("minimized")) {
                    icon.classList.remove("fa-minus");
                    icon.classList.add("fa-plus");
                } else {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }
            }
        });
    }

    function sendMessage() {
        const message = chatInput ? chatInput.value.trim() : "";
        if (message && room && !callInProgress) {
            socket.emit("chatMessage", {
                room: room,
                message: message,
                username: username,
                profilePic: profilePic,
                timestamp: new Date().toLocaleTimeString()
            });
            addChatMessage(message, "own", username, profilePic);
            if (chatInput) chatInput.value = "";
        }
    }

    if (sendMsgBtn) sendMsgBtn.addEventListener("click", sendMessage);
    if (chatInput) chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function addChatMessage(text, type, senderName = null, senderPic = null) {
        if (!chatMessages) return;

        const messageDiv = document.createElement("div");

        if (type === "system") {
            messageDiv.className = "system-message";
            messageDiv.textContent = text;
        } else if (type === "own") {
            messageDiv.className = "chat-message own-message";
            const contentDiv = document.createElement("div");
            contentDiv.className = "message-content";
            contentDiv.innerHTML = `<div class="message-text">${text}</div><div class="message-time">${new Date().toLocaleTimeString()}</div>`;
            messageDiv.appendChild(contentDiv);
        } else {
            messageDiv.className = "chat-message other-message";
            const img = document.createElement("img");
            img.src = senderPic || "/user-avatar.png";
            img.className = "message-avatar";
            const contentDiv = document.createElement("div");
            contentDiv.className = "message-content";
            contentDiv.innerHTML = `<div class="message-username">${senderName}</div><div class="message-text">${text}</div><div class="message-time">${new Date().toLocaleTimeString()}</div>`;
            messageDiv.appendChild(img);
            messageDiv.appendChild(contentDiv);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (type === "system") {
            setTimeout(() => {
                if (messageDiv.parentNode) messageDiv.remove();
            }, 5000);
        }
    }

    async function startCall(video = false) {
        if (callActive || callInProgress) {
            endCall();
            return;
        }

        if (!room || opponentId === "Charlie") {
            addChatMessage("Cannot start call with Charlie! 🤖", "system");
            return;
        }

        callInProgress = true;
        isVideoCall = video;

        if (callStatus) {
            callStatus.style.display = "flex";
            callStatusText.textContent = "Requesting permissions...";
        }

        callTimeout = setTimeout(() => {
            if (callInProgress && !callActive) {
                addChatMessage("Call timed out", "system");
                endCall();
            }
        }, 30000);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: video ? { width: 640, height: 480 } : false
            });
            localStream = stream;

            if (video && localVideo) {
                localVideo.srcObject = stream;
                videoContainer.style.display = "block";
            }

            initPeerConnection();

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            socket.emit("callSignal", {
                room: room,
                signal: peerConnection.localDescription,
                type: "offer",
                isVideo: isVideoCall
            });

            if (video) {
                if (audioCallBtn) audioCallBtn.style.display = "none";
                if (videoCallBtn) videoCallBtn.style.display = "none";
            } else {
                audioCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> End Call';
                videoCallBtn.disabled = true;
            }

            addChatMessage(`Starting ${video ? 'video' : 'audio'} call...`, "system");
        } catch (error) {
            addChatMessage("Could not access microphone/camera", "system");
            endCall();
        }
    }

    function endCall() {
        if (callTimeout) clearTimeout(callTimeout);
        if (incomingCallTimer) clearTimeout(incomingCallTimer);

        callActive = false;
        callInProgress = false;

        cleanupMedia();
        if (peerConnection) peerConnection.close();
        peerConnection = null;
        pendingCandidates = [];
        resetCallUI();

        if (room && opponentId !== "Charlie") {
            socket.emit("callEnded", { room });
        }

        addChatMessage("Call ended", "system");
    }

    async function acceptCall(offerData) {
        if (callTimeout) clearTimeout(callTimeout);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: offerData.isVideo ? { width: 640, height: 480 } : false
            });
            localStream = stream;

            if (offerData.isVideo && localVideo) {
                localVideo.srcObject = stream;
                videoContainer.style.display = "block";
            }

            initPeerConnection();
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offerData.signal));

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            socket.emit("callSignal", {
                room: room,
                signal: peerConnection.localDescription,
                type: "answer",
                isVideo: offerData.isVideo
            });

            callActive = true;
            callInProgress = true;
            isVideoCall = offerData.isVideo;

            if (offerData.isVideo) {
                audioCallBtn.style.display = "none";
                videoCallBtn.style.display = "none";
            } else {
                audioCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> End Call';
                videoCallBtn.disabled = true;
            }

            addChatMessage(`Call connected`, "system");
        } catch (error) {
            addChatMessage("Could not accept call", "system");
            endCall();
        }
    }

    function rejectCall() {
        clearTimeout(incomingCallTimer);
        addChatMessage("Call rejected", "system");
        if (callStatus) callStatus.style.display = "none";
        callInProgress = false;
        socket.emit("callRejected", { room });
    }

    function toggleMicrophone() {
        if (localStream && callActive) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = isMicMuted;
            });
            isMicMuted = !isMicMuted;
            toggleMicBtn.innerHTML = isMicMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
        }
    }

    function toggleCamera() {
        if (localStream && callActive && isVideoCall) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = isCameraOff;
            });
            isCameraOff = !isCameraOff;
            toggleCameraBtn.innerHTML = isCameraOff ? '<i class="fas fa-video-slash"></i>' : '<i class="fas fa-video"></i>';
        }
    }

    // Event listeners
    if (audioCallBtn) audioCallBtn.addEventListener("click", () => startCall(false));
    if (videoCallBtn) videoCallBtn.addEventListener("click", () => startCall(true));
    if (endCallBtn) endCallBtn.addEventListener("click", endCall);
    if (endVideoCallBtn) endVideoCallBtn.addEventListener("click", endCall);
    if (closeVideoBtn) closeVideoBtn.addEventListener("click", endCall);
    if (toggleMicBtn) toggleMicBtn.addEventListener("click", toggleMicrophone);
    if (toggleCameraBtn) toggleCameraBtn.addEventListener("click", toggleCamera);

    if (playCharlieBtn) {
        playCharlieBtn.addEventListener("click", () => {
            if (room) {
                addChatMessage("Already in a game!", "system");
                return;
            }
            socket.emit("playWithCharlie");
            addChatMessage("Starting game with Charlie 🤖...", "system");
        });
    }

    // Socket events
    socket.on("waiting", () => {
        statusText.textContent = "Waiting for opponent...";
        addChatMessage("Waiting for opponent...", "system");
    });

    socket.on("startGame", (data) => {
        room = data.room;
        board = Array(9).fill("");
        gameActive = true;
        gameEnded = false;

        opponentId = socket.id === data.leftPlayer.id ? data.rightPlayer.id : data.leftPlayer.id;
        opponentName = socket.id === data.leftPlayer.id ? data.rightPlayer.username : data.leftPlayer.username;

        p1Name.textContent = data.leftPlayer.username;
        p1Pic.src = data.leftPlayer.profilePic;
        p2Name.textContent = data.rightPlayer.username;
        p2Pic.src = data.rightPlayer.profilePic;

        playerMap = { X: data.leftPlayer.username, O: data.rightPlayer.username };

        if (socket.id === data.leftPlayer.id) {
            playerSymbol = "X";
            opponentSymbol = "O";
        } else {
            playerSymbol = "O";
            opponentSymbol = "X";
        }

        isMyTurn = playerSymbol === "X";

        cells.forEach(cell => {
            cell.classList.remove("x", "o", "winner");
        });

        updateScores();
        updateStatus();
        addChatMessage(`Game started! You are ${playerSymbol}`, "system");

        if (opponentId === "Charlie") {
            addChatMessage("🤖 Charlie is ready! You go first.", "system");
        }
    });

    socket.on("move", ({ index, player }) => {
        if (gameEnded) return;

        board[index] = player;
        cells[index].classList.add(player === "X" ? "x" : "o");

        const winner = checkWinner();
        if (winner) {
            endGame(winner);
        } else {
            isMyTurn = player !== playerSymbol;
            updateStatus();
        }
    });

    socket.on("restart", () => {
        board = Array(9).fill("");
        gameActive = true;
        gameEnded = false;
        isMyTurn = playerSymbol === "X";
        cells.forEach(cell => cell.classList.remove("x", "o", "winner"));
        updateStatus();
        addChatMessage("Game restarted!", "system");
    });

    socket.on("gameOver", ({ winner }) => {
        if (!gameEnded) endGame(winner);
    });

    socket.on("chatMessage", (data) => {
        if (!callInProgress) {
            addChatMessage(data.message, "other", data.username, data.profilePic);
        }
    });

    socket.on("callSignal", async (data) => {
        try {
            if (data.type === "offer" && !callActive && !callInProgress) {
                callInProgress = true;
                isVideoCall = data.isVideo || false;

                callStatus.style.display = "flex";
                callStatusText.textContent = `Incoming ${isVideoCall ? 'video' : 'audio'} call...`;
                addChatMessage(`${opponentName} is calling...`, "system");

                const notification = document.createElement("div");
                notification.className = "call-notification";
                notification.innerHTML = `
                    <div class="call-notification-content">
                        <i class="fas fa-${isVideoCall ? 'video' : 'phone'}"></i>
                        <span>${opponentName} is calling</span>
                        <div class="call-actions">
                            <button class="accept-call-btn">Accept</button>
                            <button class="reject-call-btn">Reject</button>
                        </div>
                    </div>
                `;

                incomingCallTimer = setTimeout(() => {
                    if (notification.parentNode) notification.remove();
                    rejectCall();
                }, 30000);

                notification.querySelector(".accept-call-btn").onclick = () => {
                    clearTimeout(incomingCallTimer);
                    notification.remove();
                    acceptCall(data);
                };
                notification.querySelector(".reject-call-btn").onclick = () => {
                    clearTimeout(incomingCallTimer);
                    notification.remove();
                    rejectCall();
                };

                chatMessages.appendChild(notification);
                chatMessages.scrollTop = chatMessages.scrollHeight;

            } else if (data.type === "answer" && !callActive && callInProgress && peerConnection) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
                callActive = true;
                if (callTimeout) clearTimeout(callTimeout);
                addChatMessage(`Call connected`, "system");
            } else if (data.type === "candidate" && peerConnection) {
                if (peerConnection.remoteDescription) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
                } else {
                    pendingCandidates.push(new RTCIceCandidate(data.signal));
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("callEnded", () => {
        if (callActive || callInProgress) {
            addChatMessage("Opponent ended the call", "system");
            endCall();
        }
    });

    socket.on("callRejected", () => {
        if (callInProgress && !callActive) {
            addChatMessage("Call was rejected", "system");
            endCall();
        }
    });

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!gameActive || gameEnded || !isMyTurn || board[index] !== "") return;
            socket.emit("move", { room, index, player: playerSymbol });
        });
    });

    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            if (room) socket.emit("restart", { room });
        });
    }

    function checkWinner() {
        for (const [a, b, c] of winCombos) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                return board[a];
            }
        }
        return board.includes("") ? null : "draw";
    }

    function endGame(winner) {
        if (gameEnded) return;
        gameActive = false;
        gameEnded = true;

        if (winner === "draw") {
            statusText.textContent = "Draw!";
            addHistory("Draw");
            addChatMessage("Game ended in a draw!", "system");
        } else {
            playerScore[winner]++;
            const winnerName = playerMap[winner];
            statusText.textContent = winnerName + " wins!";
            updateScores();
            addHistory(winnerName + " won");
            addChatMessage(`${winnerName} wins the game!`, "system");
        }
        isMyTurn = false;
    }

    function updateStatus() {
        if (!gameActive || gameEnded) return;
        statusText.textContent = isMyTurn ? "Your turn" : "Opponent's turn";
    }

    function updateScores() {
        p1ScoreEl.textContent = playerScore["X"];
        p2ScoreEl.textContent = playerScore["O"];
    }

    function addHistory(text) {
        const li = document.createElement("li");
        li.textContent = text;
        historyList.prepend(li);
    }
}