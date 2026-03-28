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

// ---------------- GAME ----------------

const socket = typeof io !== "undefined" ? io() : null;

if (socket) {
    // Game state
    let room = null;
    let playerSymbol = "X";
    let opponentSymbol = "O";
    let isMyTurn = false;
    let board = Array(9).fill("");
    let gameActive = false;
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

    // Chat elements
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendMsgBtn = document.getElementById("sendMsgBtn");
    const audioCallBtn = document.getElementById("audioCallBtn");
    const videoCallBtn = document.getElementById("videoCallBtn");
    const callStatus = document.getElementById("callStatus");
    const callStatusText = document.getElementById("callStatusText");
    const endCallBtn = document.getElementById("endCallBtn");
    const chatWidget = document.getElementById("chatWidget");
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
            { urls: "stun:stun2.l.google.com:19302" }
        ],
        iceCandidatePoolSize: 10
    };

    // Initialize peer connection
    function initPeerConnection() {
        if (peerConnection) {
            cleanupPeerConnection();
        }

        peerConnection = new RTCPeerConnection(configuration);

        // Add local tracks if available
        if (localStream) {
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });
        }

        // Handle remote stream
        peerConnection.ontrack = (event) => {
            console.log("Received remote track");
            remoteStream = event.streams[0];
            if (remoteVideo) {
                remoteVideo.srcObject = remoteStream;
            }
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
            if (event.candidate && room && callActive) {
                console.log("Sending ICE candidate");
                socket.emit("callSignal", {
                    room: room,
                    signal: event.candidate,
                    type: "candidate",
                    isVideo: isVideoCall
                });
            }
        };

        // Monitor connection state
        peerConnection.oniceconnectionstatechange = () => {
            console.log("ICE connection state:", peerConnection.iceConnectionState);
            if (peerConnection.iceConnectionState === "disconnected" ||
                peerConnection.iceConnectionState === "failed" ||
                peerConnection.iceConnectionState === "closed") {
                if (callActive) {
                    addSystemMessage("Call connection lost");
                    endCall();
                }
            }
        };

        peerConnection.onconnectionstatechange = () => {
            console.log("Connection state:", peerConnection.connectionState);
            if (peerConnection.connectionState === "connected" && callActive) {
                callStatusText.textContent = "Call connected";
                setTimeout(() => {
                    if (callActive && callStatus) {
                        callStatus.style.display = "none";
                    }
                }, 2000);
            }
        };

        // Process any pending candidates
        if (pendingCandidates.length > 0 && peerConnection.remoteDescription) {
            pendingCandidates.forEach(candidate => {
                peerConnection.addIceCandidate(candidate).catch(e => console.error("Error adding pending candidate:", e));
            });
            pendingCandidates = [];
        }
    }

    function cleanupPeerConnection() {
        if (peerConnection) {
            peerConnection.onicecandidate = null;
            peerConnection.ontrack = null;
            peerConnection.oniceconnectionstatechange = null;
            peerConnection.onconnectionstatechange = null;
            peerConnection.close();
            peerConnection = null;
        }
    }

    function cleanupMedia() {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
            });
            localStream = null;
        }
        if (remoteStream) {
            remoteStream.getTracks().forEach(track => {
                track.stop();
            });
            remoteStream = null;
        }
        if (localVideo && localVideo.srcObject) {
            localVideo.srcObject = null;
        }
        if (remoteVideo && remoteVideo.srcObject) {
            remoteVideo.srcObject = null;
        }
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
            addMessageToChat(messageData, true);
            if (chatInput) chatInput.value = "";
        } else if (callInProgress) {
            addSystemMessage("Cannot send messages during an active call");
        }
    }

    if (sendMsgBtn) {
        sendMsgBtn.addEventListener("click", sendMessage);
    }
    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }

    // Add message to chat UI
    function addMessageToChat(data, isOwn) {
        if (!chatMessages) return;

        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${isOwn ? 'own-message' : 'other-message'}`;

        if (!isOwn) {
            const img = document.createElement("img");
            img.src = data.profilePic || "/user-avatar.png";
            img.alt = data.username;
            img.className = "message-avatar";
            messageDiv.appendChild(img);
        }

        const contentDiv = document.createElement("div");
        contentDiv.className = "message-content";

        if (!isOwn) {
            const nameSpan = document.createElement("div");
            nameSpan.className = "message-username";
            nameSpan.textContent = data.username;
            contentDiv.appendChild(nameSpan);
        }

        const textSpan = document.createElement("div");
        textSpan.className = "message-text";
        textSpan.textContent = data.message;
        contentDiv.appendChild(textSpan);

        const timeSpan = document.createElement("div");
        timeSpan.className = "message-time";
        timeSpan.textContent = data.timestamp;
        contentDiv.appendChild(timeSpan);

        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add system message
    function addSystemMessage(text) {
        if (!chatMessages) return;

        const systemDiv = document.createElement("div");
        systemDiv.className = "system-message";
        systemDiv.textContent = text;
        chatMessages.appendChild(systemDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (systemDiv.parentNode) {
                systemDiv.remove();
            }
        }, 5000);
    }

    // Start call (audio or video)
    async function startCall(video = false) {
        if (callActive) {
            endCall();
            return;
        }

        if (callInProgress) {
            addSystemMessage("A call is already in progress");
            return;
        }

        if (!room || !opponentId) {
            addSystemMessage("Cannot start call: No opponent connected");
            return;
        }

        callInProgress = true;
        isVideoCall = video;

        if (callStatus) {
            callStatus.style.display = "flex";
            callStatusText.textContent = "Requesting permissions...";
        }

        try {
            const constraints = {
                audio: true,
                video: video ? {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: "user"
                } : false
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStream = stream;

            if (video && localVideo) {
                localVideo.srcObject = stream;
                if (videoContainer) videoContainer.style.display = "block";
            }

            // Initialize peer connection
            initPeerConnection();

            if (callStatusText) callStatusText.textContent = "Calling...";

            // Create and send offer
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            socket.emit("callSignal", {
                room: room,
                signal: peerConnection.localDescription,
                type: "offer",
                isVideo: isVideoCall
            });

            callActive = true;

            // Update UI
            if (video) {
                if (audioCallBtn) audioCallBtn.style.display = "none";
                if (videoCallBtn) videoCallBtn.style.display = "none";
            } else {
                if (audioCallBtn) audioCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> End Call';
                if (videoCallBtn) videoCallBtn.disabled = true;
            }

            addSystemMessage(`Starting ${video ? 'video' : 'audio'} call...`);
        } catch (error) {
            console.error("Error starting call:", error);
            addSystemMessage("Could not start call. Please check camera/microphone permissions.");
            endCall();
            callInProgress = false;
        }
    }

    function endCall() {
        callActive = false;
        callInProgress = false;

        // Clean up media and peer connection
        cleanupMedia();
        cleanupPeerConnection();

        pendingCandidates = [];

        // Reset UI
        resetCallUI();

        // Notify opponent
        if (room) {
            socket.emit("callEnded", { room });
        }

        addSystemMessage("Call ended");
    }

    // Toggle microphone
    function toggleMicrophone() {
        if (localStream && callActive) {
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length > 0) {
                audioTracks.forEach(track => {
                    track.enabled = isMicMuted;
                });
                isMicMuted = !isMicMuted;
                if (toggleMicBtn) {
                    toggleMicBtn.innerHTML = isMicMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
                }
                addSystemMessage(isMicMuted ? "Microphone muted" : "Microphone unmuted");
            }
        }
    }

    // Toggle camera
    function toggleCamera() {
        if (localStream && callActive && isVideoCall) {
            const videoTracks = localStream.getVideoTracks();
            if (videoTracks.length > 0) {
                videoTracks.forEach(track => {
                    track.enabled = isCameraOff;
                });
                isCameraOff = !isCameraOff;
                if (toggleCameraBtn) {
                    toggleCameraBtn.innerHTML = isCameraOff ? '<i class="fas fa-video-slash"></i>' : '<i class="fas fa-video"></i>';
                }
                addSystemMessage(isCameraOff ? "Camera turned off" : "Camera turned on");
            }
        }
    }

    // Event listeners
    if (audioCallBtn) {
        audioCallBtn.addEventListener("click", () => startCall(false));
    }
    if (videoCallBtn) {
        videoCallBtn.addEventListener("click", () => startCall(true));
    }
    if (endCallBtn) {
        endCallBtn.addEventListener("click", endCall);
    }
    if (endVideoCallBtn) {
        endVideoCallBtn.addEventListener("click", endCall);
    }
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener("click", endCall);
    }
    if (toggleMicBtn) {
        toggleMicBtn.addEventListener("click", toggleMicrophone);
    }
    if (toggleCameraBtn) {
        toggleCameraBtn.addEventListener("click", toggleCamera);
    }

    // Socket event handlers
    socket.on("waiting", () => {
        if (statusText) statusText.textContent = "Waiting for opponent...";
        addSystemMessage("Waiting for opponent...");
    });

    socket.on("startGame", (data) => {
        room = data.room;
        board = Array(9).fill("");
        gameActive = true;

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
        cells.forEach(c => c.classList.remove("x", "o", "winner"));
        updateScores();
        updateStatus();
        addSystemMessage(`Game started! You are ${playerSymbol}. ${isMyTurn ? "Your turn" : "Opponent's turn"}`);
    });

    socket.on("move", ({ index, player }) => {
        board[index] = player;
        cells[index].classList.add(player === "X" ? "x" : "o");
        const winner = checkWinner();
        if (winner) {
            endGame(winner);
            return;
        }
        isMyTurn = player !== playerSymbol;
        updateStatus();
    });

    socket.on("restart", () => {
        board = Array(9).fill("");
        cells.forEach(c => c.classList.remove("x", "o", "winner"));
        gameActive = true;
        isMyTurn = playerSymbol === "X";
        updateStatus();
        addSystemMessage("Game restarted!");
    });

    socket.on("gameOver", ({ winner }) => {
        endGame(winner);
    });

    // Chat messages
    socket.on("chatMessage", (data) => {
        if (!callInProgress) {
            addMessageToChat(data, false);
        }
    });

    // Call signals
    socket.on("callSignal", async (data) => {
        try {
            if (data.type === "offer" && !callActive && !callInProgress) {
                // Received call offer
                callInProgress = true;
                isVideoCall = data.isVideo || false;

                if (callStatus) {
                    callStatus.style.display = "flex";
                    callStatusText.textContent = `Incoming ${isVideoCall ? 'video' : 'audio'} call...`;
                }

                addSystemMessage(`Incoming ${isVideoCall ? 'video' : 'audio'} call...`);

                // Auto-answer after a short delay
                setTimeout(async () => {
                    try {
                        const constraints = {
                            audio: true,
                            video: isVideoCall ? { width: { ideal: 640 }, height: { ideal: 480 } } : false
                        };

                        const stream = await navigator.mediaDevices.getUserMedia(constraints);
                        localStream = stream;

                        if (isVideoCall && localVideo) {
                            localVideo.srcObject = stream;
                            if (videoContainer) videoContainer.style.display = "block";
                        }

                        initPeerConnection();

                        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));

                        const answer = await peerConnection.createAnswer();
                        await peerConnection.setLocalDescription(answer);

                        socket.emit("callSignal", {
                            room: room,
                            signal: peerConnection.localDescription,
                            type: "answer",
                            isVideo: isVideoCall
                        });

                        callActive = true;

                        if (callStatusText) callStatusText.textContent = "Call connected";

                        if (isVideoCall) {
                            if (audioCallBtn) audioCallBtn.style.display = "none";
                            if (videoCallBtn) videoCallBtn.style.display = "none";
                        } else {
                            if (audioCallBtn) audioCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> End Call';
                            if (videoCallBtn) videoCallBtn.disabled = true;
                        }

                        setTimeout(() => {
                            if (callActive && callStatus) callStatus.style.display = "none";
                        }, 2000);

                        addSystemMessage(`${isVideoCall ? 'Video' : 'Audio'} call connected`);
                    } catch (error) {
                        console.error("Error answering call:", error);
                        addSystemMessage("Could not answer call. Please check permissions.");
                        endCall();
                        callInProgress = false;
                    }
                }, 1000);
            } else if (data.type === "answer" && callActive && peerConnection) {
                // Received answer to our offer
                if (peerConnection.remoteDescription === null) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
                    if (callStatusText) callStatusText.textContent = "Call connected";
                    setTimeout(() => {
                        if (callActive && callStatus) callStatus.style.display = "none";
                    }, 2000);
                    addSystemMessage(`${isVideoCall ? 'Video' : 'Audio'} call connected`);
                }
            } else if (data.type === "candidate" && peerConnection) {
                // Received ICE candidate
                if (peerConnection.remoteDescription !== null) {
                    try {
                        await peerConnection.addIceCandidate(new RTCIceCandidate(data.signal));
                    } catch (error) {
                        console.error("Error adding ICE candidate:", error);
                    }
                } else if (peerConnection) {
                    // Store candidate for later
                    pendingCandidates.push(new RTCIceCandidate(data.signal));
                }
            }
        } catch (error) {
            console.error("Error handling call signal:", error);
        }
    });

    socket.on("callEnded", () => {
        if (callActive) {
            addSystemMessage("Opponent ended the call");
            endCall();
        }
        callInProgress = false;
    });

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!gameActive || !isMyTurn || board[index] !== "") return;
            socket.emit("move", { room, index, player: playerSymbol });
        });
    });

    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            socket.emit("restart", { room });
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
        gameActive = false;
        if (winner === "draw") {
            if (statusText) statusText.textContent = "Draw";
            addHistory("Draw");
            addSystemMessage("Game ended in a draw!");
            return;
        }
        playerScore[winner]++;
        const winnerName = playerMap[winner];
        if (statusText) statusText.textContent = winnerName + " wins";
        updateScores();
        addHistory(winnerName + " won");
        addSystemMessage(`${winnerName} wins the game!`);
    }

    function updateStatus() {
        if (!gameActive || !statusText) return;
        statusText.textContent = isMyTurn ? "Your turn" : "Opponent turn";
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