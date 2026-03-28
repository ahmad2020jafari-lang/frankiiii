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
                    // Show code on screen
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
    let remoteStream = null;
    let peerConnection = null;
    let isVideoCall = false;
    let isMicMuted = false;
    let isCameraOff = false;
    let pendingCandidates = [];
    let callInProgress = false;
    let incomingCallTimer = null;
    let callTimeout = null;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 3;

    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Configuration for WebRTC
    const configuration = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
            { urls: "stun:stun2.l.google.com:19302" },
            { urls: "stun:stun3.l.google.com:19302" },
            { urls: "stun:stun4.l.google.com:19302" }
        ],
        iceCandidatePoolSize: 10
    };

    // Initialize peer connection
    function initPeerConnection() {
        if (peerConnection) {
            cleanupPeerConnection();
        }

        peerConnection = new RTCPeerConnection(configuration);

        if (localStream) {
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });
        }

        peerConnection.ontrack = (event) => {
            console.log("Received remote track");
            remoteStream = event.streams[0];
            if (remoteVideo) {
                remoteVideo.srcObject = remoteStream;
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

        peerConnection.oniceconnectionstatechange = () => {
            switch (peerConnection.iceConnectionState) {
                case "connected":
                case "completed":
                    if (callActive && callStatusText) {
                        callStatusText.textContent = "Call connected";
                        setTimeout(() => {
                            if (callActive && callStatus) callStatus.style.display = "none";
                        }, 2000);
                    }
                    break;
                case "failed":
                    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                        reconnectAttempts++;
                        addChatMessage(`Connection failed. Retrying...`, "system");
                        setTimeout(() => {
                            if (callInProgress && !callActive) restartCall();
                        }, 2000);
                    } else {
                        addChatMessage("Call connection failed", "system");
                        endCall();
                    }
                    break;
            }
        };

        if (pendingCandidates.length > 0 && peerConnection.remoteDescription) {
            pendingCandidates.forEach(candidate => {
                peerConnection.addIceCandidate(candidate).catch(e => console.error("Error adding pending candidate:", e));
            });
            pendingCandidates = [];
        }
    }

    function cleanupPeerConnection() {
        if (peerConnection) {
            peerConnection.close();
            peerConnection = null;
        }
    }

    function cleanupMedia() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream = null;
        }
        remoteStream = null;
        if (localVideo) localVideo.srcObject = null;
        if (remoteVideo) remoteVideo.srcObject = null;
    }

    function resetCallUI() {
        if (callStatus) callStatus.style.display = "none";
        if (videoContainer) videoContainer.style.display = "none";

        if (audioCallBtn) {
            audioCallBtn.innerHTML = '<i class="fas fa-phone"></i> Audio Call';
            audioCallBtn.style.display = "flex";
            audioCallBtn.disabled = false;
        }
        if (videoCallBtn) {
            videoCallBtn.innerHTML = '<i class="fas fa-video"></i> Video Call';
            videoCallBtn.disabled = false;
            videoCallBtn.style.display = "flex";
        }

        isMicMuted = false;
        isCameraOff = false;
        if (toggleMicBtn) toggleMicBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        if (toggleCameraBtn) toggleCameraBtn.innerHTML = '<i class="fas fa-video"></i>';
    }

    function clearIncomingCallTimer() {
        if (incomingCallTimer) {
            clearTimeout(incomingCallTimer);
            incomingCallTimer = null;
        }
    }

    // Minimize/Maximize chat
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

    // Send message
    function sendMessage() {
        const message = chatInput ? chatInput.value.trim() : "";
        if (message && room && !callInProgress) {
            const messageData = {
                room: room,
                message: message,
                username: username,
                profilePic: profilePic,
                timestamp: new Date().toLocaleTimeString()
            };
            socket.emit("chatMessage", messageData);
            addChatMessage(messageData.message, "own", username, profilePic, messageData.timestamp);
            if (chatInput) chatInput.value = "";
        }
    }

    if (sendMsgBtn) sendMsgBtn.addEventListener("click", sendMessage);
    if (chatInput) chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function addChatMessage(text, type, senderName = null, senderPic = null, timestamp = null) {
        if (!chatMessages) return;

        const messageDiv = document.createElement("div");

        if (type === "system") {
            messageDiv.className = "system-message";
            messageDiv.textContent = text;
        } else if (type === "own") {
            messageDiv.className = "chat-message own-message";
            const contentDiv = document.createElement("div");
            contentDiv.className = "message-content";

            const textSpan = document.createElement("div");
            textSpan.className = "message-text";
            textSpan.textContent = text;
            contentDiv.appendChild(textSpan);

            const timeSpan = document.createElement("div");
            timeSpan.className = "message-time";
            timeSpan.textContent = timestamp || new Date().toLocaleTimeString();
            contentDiv.appendChild(timeSpan);

            messageDiv.appendChild(contentDiv);
        } else {
            messageDiv.className = "chat-message other-message";

            const img = document.createElement("img");
            img.src = senderPic || "/user-avatar.png";
            img.alt = senderName;
            img.className = "message-avatar";
            messageDiv.appendChild(img);

            const contentDiv = document.createElement("div");
            contentDiv.className = "message-content";

            const nameSpan = document.createElement("div");
            nameSpan.className = "message-username";
            nameSpan.textContent = senderName;
            contentDiv.appendChild(nameSpan);

            const textSpan = document.createElement("div");
            textSpan.className = "message-text";
            textSpan.textContent = text;
            contentDiv.appendChild(textSpan);

            const timeSpan = document.createElement("div");
            timeSpan.className = "message-time";
            timeSpan.textContent = timestamp || new Date().toLocaleTimeString();
            contentDiv.appendChild(timeSpan);

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

    // Start call
    async function startCall(video = false) {
        if (callActive) {
            endCall();
            return;
        }

        if (callInProgress) {
            addChatMessage("A call is already in progress", "system");
            return;
        }

        if (!room || !opponentId || opponentId === "Charlie") {
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
                addChatMessage("Call timed out. Please try again.", "system");
                endCall();
            }
        }, 30000);

        try {
            const constraints = {
                audio: true,
                video: video ? { width: { ideal: 640 }, height: { ideal: 480 } } : false
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStream = stream;

            if (video && localVideo) {
                localVideo.srcObject = stream;
                if (videoContainer) videoContainer.style.display = "block";
            }

            initPeerConnection();

            if (callStatusText) callStatusText.textContent = "Connecting...";

            const offer = await peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: video
            });
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
                if (audioCallBtn) audioCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> End Call';
                if (videoCallBtn) videoCallBtn.disabled = true;
            }

            addChatMessage(`Calling...`, "system");
        } catch (error) {
            console.error("Error starting call:", error);
            addChatMessage("Could not start call. Please check permissions.", "system");
            endCall();
        }
    }

    function endCall() {
        if (callTimeout) {
            clearTimeout(callTimeout);
            callTimeout = null;
        }
        clearIncomingCallTimer();

        callActive = false;
        callInProgress = false;

        cleanupMedia();
        cleanupPeerConnection();

        pendingCandidates = [];
        resetCallUI();

        if (room && opponentId !== "Charlie") {
            socket.emit("callEnded", { room });
        }

        addChatMessage("Call ended", "system");
    }

    async function restartCall() {
        if (!callInProgress || callActive) return;

        addChatMessage("Restarting call...", "system");

        if (peerConnection) cleanupPeerConnection();

        try {
            initPeerConnection();

            const offer = await peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: isVideoCall
            });
            await peerConnection.setLocalDescription(offer);

            socket.emit("callSignal", {
                room: room,
                signal: peerConnection.localDescription,
                type: "offer",
                isVideo: isVideoCall
            });
        } catch (error) {
            console.error("Error restarting call:", error);
            endCall();
        }
    }

    async function acceptCall(offerData) {
        clearIncomingCallTimer();

        if (callTimeout) {
            clearTimeout(callTimeout);
            callTimeout = null;
        }

        try {
            const constraints = {
                audio: true,
                video: offerData.isVideo ? { width: { ideal: 640 }, height: { ideal: 480 } } : false
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStream = stream;

            if (offerData.isVideo && localVideo) {
                localVideo.srcObject = stream;
                if (videoContainer) videoContainer.style.display = "block";
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

            if (callStatusText) callStatusText.textContent = "Connecting...";

            if (offerData.isVideo) {
                if (audioCallBtn) audioCallBtn.style.display = "none";
                if (videoCallBtn) videoCallBtn.style.display = "none";
            } else {
                if (audioCallBtn) audioCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> End Call';
                if (videoCallBtn) videoCallBtn.disabled = true;
            }

            addChatMessage(`Answering ${offerData.isVideo ? 'video' : 'audio'} call...`, "system");
        } catch (error) {
            console.error("Error accepting call:", error);
            addChatMessage("Could not accept call. Please check permissions.", "system");
            endCall();
        }
    }

    function rejectCall() {
        clearIncomingCallTimer();
        addChatMessage("Call rejected", "system");
        if (callStatus) callStatus.style.display = "none";
        callInProgress = false;
        socket.emit("callRejected", { room });
    }

    function toggleMicrophone() {
        if (localStream && callActive) {
            const audioTracks = localStream.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = isMicMuted;
            });
            isMicMuted = !isMicMuted;
            if (toggleMicBtn) {
                toggleMicBtn.innerHTML = isMicMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
            }
            addChatMessage(isMicMuted ? "Microphone muted" : "Microphone unmuted", "system");
        }
    }

    function toggleCamera() {
        if (localStream && callActive && isVideoCall) {
            const videoTracks = localStream.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = isCameraOff;
            });
            isCameraOff = !isCameraOff;
            if (toggleCameraBtn) {
                toggleCameraBtn.innerHTML = isCameraOff ? '<i class="fas fa-video-slash"></i>' : '<i class="fas fa-video"></i>';
            }
            addChatMessage(isCameraOff ? "Camera turned off" : "Camera turned on", "system");
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

    // Play with Charlie
    if (playCharlieBtn) {
        playCharlieBtn.addEventListener("click", () => {
            if (room) {
                addChatMessage("Already in a game! Please logout and try again.", "system");
                return;
            }
            socket.emit("playWithCharlie");
            addChatMessage("Starting game with Charlie 🤖...", "system");
        });
    }

    // Socket event handlers
    socket.on("waiting", () => {
        if (statusText) statusText.textContent = "Waiting for opponent...";
        addChatMessage("Waiting for opponent...", "system");
    });

    socket.on("startGame", (data) => {
        room = data.room;
        board = Array(9).fill("");
        gameActive = true;
        gameEnded = false;

        opponentId = socket.id === data.leftPlayer.id ? data.rightPlayer.id : data.leftPlayer.id;
        opponentName = socket.id === data.leftPlayer.id ? data.rightPlayer.username : data.leftPlayer.username;

        if (p1Name) p1Name.textContent = data.leftPlayer.username;
        if (p1Pic) p1Pic.src = data.leftPlayer.profilePic;
        if (p2Name) p2Name.textContent = data.rightPlayer.username;
        if (p2Pic) p2Pic.src = data.rightPlayer.profilePic;

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
            addChatMessage("🤖 Charlie is ready to play! You go first.", "system");
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

        cells.forEach(cell => {
            cell.classList.remove("x", "o", "winner");
        });

        updateStatus();
        addChatMessage("Game restarted!", "system");
    });

    socket.on("gameOver", ({ winner }) => {
        if (!gameEnded) {
            endGame(winner);
        }
    });

    socket.on("chatMessage", (data) => {
        if (!callInProgress) {
            addChatMessage(data.message, "other", data.username, data.profilePic, data.timestamp);
        }
    });

    socket.on("callSignal", async (data) => {
        try {
            if (data.type === "offer" && !callActive && !callInProgress) {
                callInProgress = true;
                isVideoCall = data.isVideo || false;

                if (callStatus) {
                    callStatus.style.display = "flex";
                    callStatusText.textContent = `Incoming ${isVideoCall ? 'video' : 'audio'} call...`;
                }

                addChatMessage(`${opponentName} is calling you...`, "system");

                const callNotification = document.createElement("div");
                callNotification.className = "call-notification";
                callNotification.innerHTML = `
                    <div class="call-notification-content">
                        <i class="fas fa-${isVideoCall ? 'video' : 'phone'}"></i>
                        <span>${opponentName} is calling</span>
                        <div class="call-actions">
                            <button class="accept-call-btn"><i class="fas fa-check"></i> Accept</button>
                            <button class="reject-call-btn"><i class="fas fa-times"></i> Reject</button>
                        </div>
                    </div>
                `;

                incomingCallTimer = setTimeout(() => {
                    if (callNotification.parentNode) {
                        callNotification.remove();
                        rejectCall();
                    }
                }, 30000);

                callNotification.querySelector(".accept-call-btn").onclick = () => {
                    clearTimeout(incomingCallTimer);
                    callNotification.remove();
                    acceptCall(data);
                };

                callNotification.querySelector(".reject-call-btn").onclick = () => {
                    clearTimeout(incomingCallTimer);
                    callNotification.remove();
                    rejectCall();
                };

                chatMessages.appendChild(callNotification);
                chatMessages.scrollTop = chatMessages.scrollHeight;

            } else if (data.type === "answer" && !callActive && callInProgress && peerConnection) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
                callActive = true;

                if (callTimeout) {
                    clearTimeout(callTimeout);
                    callTimeout = null;
                }

                if (callStatusText) callStatusText.textContent = "Call connected";
                if (callStatus) {
                    setTimeout(() => {
                        if (callActive && callStatus) callStatus.style.display = "none";
                    }, 2000);
                }

                addChatMessage(`${isVideoCall ? 'Video' : 'Audio'} call connected`, "system");

            } else if (data.type === "candidate" && peerConnection) {
                if (peerConnection.remoteDescription !== null) {
                    try {
                        await peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
                    } catch (error) {
                        console.error("Error adding ICE candidate:", error);
                    }
                } else {
                    pendingCandidates.push(new RTCIceCandidate(data.signal));
                }
            }
        } catch (error) {
            console.error("Error handling call signal:", error);
        }
    });

    socket.on("callEnded", () => {
        if (callActive || callInProgress) {
            addChatMessage("Opponent ended the call", "system");
            endCall();
        }
        callInProgress = false;
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
            if (room) {
                socket.emit("restart", { room });
            }
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
            if (statusText) statusText.textContent = "Draw!";
            addHistory("Draw");
            addChatMessage("Game ended in a draw!", "system");
        } else {
            playerScore[winner]++;
            const winnerName = playerMap[winner];
            if (statusText) statusText.textContent = winnerName + " wins!";
            updateScores();
            addHistory(winnerName + " won");
            addChatMessage(`${winnerName} wins the game!`, "system");
        }

        isMyTurn = false;
    }

    function updateStatus() {
        if (!gameActive || gameEnded || !statusText) return;
        statusText.textContent = isMyTurn ? "Your turn" : "Opponent's turn";
    }

    function updateScores() {
        if (p1ScoreEl) p1ScoreEl.textContent = playerScore["X"];
        if (p2ScoreEl) p2ScoreEl.textContent = playerScore["O"];
    }

    function addHistory(text) {
        const li = document.createElement("li");
        li.textContent = text;
        if (historyList) historyList.prepend(li);
    }
}