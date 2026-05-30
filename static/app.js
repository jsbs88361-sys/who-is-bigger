import { getRandomAvatarConfig } from './components/avatar.js';
import { playSound } from './components/sound.js';
import {
    renderRegistrationScreen,
    renderLobbyScreen,
    renderThemeVotingScreen,
    renderBiddingScreen,
    renderChallengeScreen,
    renderReviewScreen,
    renderScoreboardScreen,
    updateTimerUI
} from './components/screens.js';
class ConfettiEffect {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.colors = ['#ffd166', '#ef476f', '#06d6a0', '#118ab2', '#ab47bc', '#ff85a2'];
        this.active = false;
    }

    start() {
        this.canvas = document.getElementById('confetti-canvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'confetti-canvas';
            document.body.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];
        this.active = true;

        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                r: Math.random() * 6 + 4,
                d: Math.random() * this.canvas.height,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                tilt: Math.random() * 10 - 5,
                tiltAngleIncremental: Math.random() * 0.07 + 0.02,
                tiltAngle: 0,
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 2 - 1
            });
        }

        this.animate();
        
        setTimeout(() => {
            this.stop();
        }, 4000);
    }

    stop() {
        this.active = false;
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    animate() {
        if (!this.active) return;

        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let remaining = false;
        this.particles.forEach((p) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(p.tiltAngle) * 0.5;
            p.tilt = Math.sin(p.tiltAngle - p.r/2) * 5;

            if (p.y <= this.canvas.height) {
                remaining = true;
            }

            this.ctx.beginPath();
            this.ctx.lineWidth = p.r;
            this.ctx.strokeStyle = p.color;
            this.ctx.moveTo(p.x + p.tilt + p.r/2, p.y);
            this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/2);
            this.ctx.stroke();
        });

        if (!remaining) {
            this.active = false;
        }
    }
}

const confetti = new ConfettiEffect();

// Client State
let socket = null;
let player_id = null;
let nickname = "";
let lobby_code = null;
let lobby_state = null;
let round_result = null;
let avatarConfig = getRandomAvatarConfig();

// UI Elements
const appContainer = document.getElementById('app-container');
const toastContainer = document.getElementById('toast-container');

// Timer State
let timerInterval = null;
let localTimeRemaining = 0;
let localTimeTotal = 0;

// Show temporary alert/error toast
function showToast(message, isSuccess = false) {
    toastContainer.textContent = message;
    toastContainer.className = "toast-msg";
    if (isSuccess) {
        toastContainer.style.backgroundColor = "var(--success-color)";
    } else {
        toastContainer.style.backgroundColor = "var(--danger-color)";
    }
    
    // Play sound on toast
    if (!isSuccess) {
        playSound.fail();
    }
    
    setTimeout(() => {
        toastContainer.className = "toast-msg hidden";
    }, 3000);
}

// Copy lobby invite link
function copyLobbyLink() {
    if (!lobby_code) return;
    const inviteUrl = `${window.location.origin}/${window.location.search}#${lobby_code}`;
    
    navigator.clipboard.writeText(inviteUrl)
        .then(() => {
            showToast("Ссылка скопирована в буфер обмена!", true);
        })
        .catch(err => {
            showToast("Не удалось скопировать. Скопируйте код: " + lobby_code);
        });
}

// Initialize WebSocket connection
function connectWebSocket(onConnectedCallback) {
    const wsProto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProto}//${window.location.host}/ws`;
    
    socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
        console.log("WebSocket connected");
        if (onConnectedCallback) onConnectedCallback();
    };
    
    socket.onmessage = (event) => {
        let msg;
        try {
            msg = JSON.parse(event.data);
        } catch (e) {
            console.error("Failed to parse message", event.data);
            return;
        }
        
        handleServerMessage(msg);
    };
    
    socket.onclose = () => {
        console.log("WebSocket closed");
        showToast("Соединение с сервером разорвано! Перезапустите страницу.");
    };
    
    socket.onerror = (err) => {
        console.error("WebSocket error", err);
    };
}

function sendMsg(type, payload = {}) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(jsonStr({ type, payload }));
    }
}

// Tiny helper to avoid double serialization issues
function jsonStr(obj) {
    return JSON.stringify(obj);
}

// Setup and tick local screen timer
function startClientTimer(remainingSeconds, phase) {
    clearInterval(timerInterval);
    localTimeRemaining = remainingSeconds;
    localTimeTotal = remainingSeconds;
    
    updateTimerUI(localTimeRemaining, localTimeTotal);
    
    timerInterval = setInterval(() => {
        if (localTimeRemaining > 0) {
            localTimeRemaining--;
            updateTimerUI(localTimeRemaining, localTimeTotal);
            
            // Beep sound on last 3 ticks
            if (localTimeRemaining <= 3 && localTimeRemaining > 0) {
                playSound.tick();
            }
        } else {
            clearInterval(timerInterval);
            handleTimerExpiration(phase);
        }
    }, 1000);
}

// Action when client timer expires (acts as safety net)
function handleTimerExpiration(phase) {
    if (phase === "CHALLENGE") {
        const isChallenged = lobby_state && lobby_state.challenged_id === player_id;
        if (isChallenged) {
            sendMsg("submit_items");
        }
    }
}

// Router for server socket events
function handleServerMessage(msg) {
    const { type, payload } = msg;
    console.log("Server Message:", type, payload);
    
    switch (type) {
        case "registered":
            player_id = payload.id;
            nickname = payload.nickname;
            
            // Check if we should join or create a lobby
            const codeToJoin = appContainer.dataset.joinCode;
            if (codeToJoin) {
                sendMsg("join_lobby", { code: codeToJoin });
            } else {
                sendMsg("create_lobby");
            }
            break;
            
        case "lobby_created":
            lobby_code = payload.code;
            lobby_state = payload;
            window.location.hash = lobby_code;
            transitionToScreen("LOBBY");
            break;
            
        case "state_update":
            const previousPhase = lobby_state ? lobby_state.phase : null;
            lobby_state = payload;
            lobby_code = payload.code;
            window.location.hash = lobby_code;
            
            // If phase transitioned, handle sound trigger
            if (previousPhase !== lobby_state.phase) {
                if (lobby_state.phase === "THEME_VOTING") {
                    playSound.click();
                    round_result = null; // reset old round results
                } else if (lobby_state.phase === "CHALLENGE") {
                    playSound.liar();
                } else if (lobby_state.phase === "REVIEW") {
                    playSound.click();
                }
            }
            
            transitionToScreen(lobby_state.phase);
            
            // Update timers if applicable
            if (lobby_state.time_remaining > 0) {
                startClientTimer(lobby_state.time_remaining, lobby_state.phase);
            } else {
                clearInterval(timerInterval);
            }
            break;
            
        case "round_result":
            round_result = payload;
            if (round_result.success) {
                playSound.success();
                confetti.start();
            } else {
                playSound.fail();
            }
            break;
            
        case "item_validation_result":
            if (payload.valid) {
                playSound.click();
                if (appContainer.activeInput) {
                    appContainer.activeInput.value = "";
                    appContainer.activeInput.focus();
                }
            } else {
                playSound.fail();
                if (appContainer.activeInput) {
                    appContainer.activeInput.classList.add('input-error');
                    setTimeout(() => {
                        if (appContainer.activeInput) {
                            appContainer.activeInput.classList.remove('input-error');
                        }
                    }, 350);
                }
                showToast(payload.reason || "Неправильно!");
            }
            break;
            
        case "error":
            showToast(payload);
            break;
            
        case "kicked":
            sessionStorage.setItem("kick_message", payload);
            window.location.href = window.location.origin + window.location.pathname;
            break;
            
        case "timer_update":
            // Direct timer sync
            startClientTimer(payload.remaining, lobby_state ? lobby_state.phase : "");
            break;
    }
}

// Injects appropriate screen and binds interactions
function transitionToScreen(phase) {
    if (phase === "LOBBY") {
        renderLobbyScreen(
            appContainer,
            lobby_state,
            player_id,
            // onStartGame
            () => sendMsg("start_game"),
            // onSettingsChange
            (timeVal, bonusVal) => sendMsg("update_settings", { challenge_time: timeVal, correct_answer_bonus: bonusVal }),
            // onCopyLink
            copyLobbyLink,
            // onKick
            (targetId) => sendMsg("kick_player", { player_id: targetId })
        );
    } else if (phase === "THEME_VOTING") {
        renderThemeVotingScreen(
            appContainer,
            lobby_state,
            player_id,
            // onVote
            (idx) => sendMsg("vote_theme", { theme_index: idx })
        );
    } else if (phase === "BIDDING") {
        renderBiddingScreen(
            appContainer,
            lobby_state,
            player_id,
            // onBid
            (bidVal) => sendMsg("bid", { bid: bidVal }),
            // onLiar
            () => sendMsg("call_liar")
        );
    } else if (phase === "CHALLENGE") {
        renderChallengeScreen(
            appContainer,
            lobby_state,
            player_id,
            // onAddItem
            (val) => sendMsg("add_challenge_item", { item: val }),
            // onRemoveItem
            (idx) => sendMsg("remove_challenge_item", { index: idx }),
            // onSubmitChallenge
            () => {
                clearInterval(timerInterval);
                sendMsg("submit_items");
            }
        );
    } else if (phase === "REVIEW") {
        renderReviewScreen(
            appContainer,
            lobby_state,
            player_id,
            // onContinue
            () => sendMsg("skip_reveal")
        );
    } else if (phase === "SCOREBOARD") {
        clearInterval(timerInterval);
        renderScoreboardScreen(
            appContainer,
            lobby_state,
            player_id,
            round_result,
            // onNextRound
            () => sendMsg("next_round"),
            // onPlayAgain
            () => sendMsg("play_again")
        );
    }
}

// Initial Entrypoint Setup
function init() {
    const kickMsg = sessionStorage.getItem("kick_message");
    if (kickMsg) {
        showToast(kickMsg);
        sessionStorage.removeItem("kick_message");
    }

    // Render initial registration form
    renderRegistrationScreen(
        appContainer,
        avatarConfig,
        // onRegister
        (nickname, codeToJoin) => {
            // Save code if we want to join after WebSocket connects
            if (codeToJoin) {
                appContainer.dataset.joinCode = codeToJoin;
            }
            
            // Connect and register player
            connectWebSocket(() => {
                sendMsg("register", { nickname, avatar: avatarConfig });
            });
        }
    );
}

// Launch application
init();
