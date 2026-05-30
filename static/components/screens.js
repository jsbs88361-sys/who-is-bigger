import { renderAvatarSvg, BG_COLORS, BODY_COLORS, EYE_OPTIONS, MOUTH_OPTIONS, SHIRT_OPTIONS, ACCESSORY_OPTIONS, EFFECT_OPTIONS } from './avatar.js';
import { playSound } from './sound.js';

// Helper to escape HTML to prevent XSS in chat/names
function escapeHtml(str) {
    if (!str) return "";
    return str.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function updateTimerUI(secondsRemaining, totalSeconds) {
    const clock = document.querySelector('.timer-clock');
    const bar = document.querySelector('.timer-bar-inner');
    
    if (clock) {
        clock.textContent = secondsRemaining;
        if (secondsRemaining <= 5) {
            clock.classList.add('warning-timer');
        } else {
            clock.classList.remove('warning-timer');
        }
    }
    
    if (bar && totalSeconds > 0) {
        const percentage = (secondsRemaining / totalSeconds) * 100;
        bar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        
        if (secondsRemaining <= 5) {
            bar.classList.add('warning');
        } else {
            bar.classList.remove('warning');
        }
    }
}

// -------------------------------------------------------------
// 1. REGISTRATION SCREEN
// -------------------------------------------------------------
export function renderRegistrationScreen(container, avatarConfig, onRegister) {
    // Default shirt if not set
    if (avatarConfig.shirt === undefined) {
        avatarConfig.shirt = 0;
    }
    // Default effect if not set
    if (avatarConfig.effect === undefined) {
        avatarConfig.effect = 0;
    }

    container.innerHTML = `
        <div class="game-title-logo bounce">КТО БОЛЬШЕ?</div>
        <div class="cartoon-card neon-glow" style="max-width: 500px; margin: 0 auto;">
            <h2>Создай профиль</h2>
            
            <div class="reg-grid">
                <div class="avatar-creator-panel">
                    <div class="avatar-preview-box">
                        ${renderAvatarSvg(avatarConfig)}
                    </div>
                    
                    <div class="avatar-controls">
                        <div class="creator-row">
                            <button class="creator-arrow-btn" id="bg-prev">&lt;</button>
                            <span>ФОН</span>
                            <button class="creator-arrow-btn" id="bg-next">&gt;</button>
                        </div>
                        <div class="creator-row">
                            <button class="creator-arrow-btn" id="body-prev">&lt;</button>
                            <span>ТЕЛО</span>
                            <button class="creator-arrow-btn" id="body-next">&gt;</button>
                        </div>
                        <div class="creator-row">
                            <button class="creator-arrow-btn" id="eyes-prev">&lt;</button>
                            <span>ГЛАЗА</span>
                            <button class="creator-arrow-btn" id="eyes-next">&gt;</button>
                        </div>
                        <div class="creator-row">
                            <button class="creator-arrow-btn" id="mouth-prev">&lt;</button>
                            <span>РОТ</span>
                            <button class="creator-arrow-btn" id="mouth-next">&gt;</button>
                        </div>
                        <div class="creator-row">
                            <button class="creator-arrow-btn" id="shirt-prev">&lt;</button>
                            <span>ОДЕЖДА</span>
                            <button class="creator-arrow-btn" id="shirt-next">&gt;</button>
                        </div>
                        <div class="creator-row">
                            <button class="creator-arrow-btn" id="acc-prev">&lt;</button>
                            <span>АКСЕССУАР</span>
                            <button class="creator-arrow-btn" id="acc-next">&gt;</button>
                        </div>
                        <div class="creator-row">
                            <button class="creator-arrow-btn" id="effect-prev">&lt;</button>
                            <span>ЭФФЕКТ</span>
                            <button class="creator-arrow-btn" id="effect-next">&gt;</button>
                        </div>
                    </div>
                    
                    <button class="cartoon-btn secondary" id="btn-random-avatar" style="padding: 8px 16px; font-size: 0.9rem; width: 100%; max-width: 220px;">
                        🎲 Рандом
                    </button>
                </div>
                
                <div class="nickname-panel">
                    <div>
                        <label class="settings-label" style="display:block; margin-bottom: 8px;">Твой никнейм:</label>
                        <input type="text" class="cartoon-input" id="nick-input" placeholder="Введите ник..." maxlength="14">
                    </div>
                    
                    <div>
                        <label class="settings-label" style="display:block; margin-bottom: 8px;">Код комнаты (для входа):</label>
                        <input type="text" class="cartoon-input" id="code-input" placeholder="Необязательно..." maxlength="4" style="text-transform: uppercase;">
                    </div>
                    
                    <button class="cartoon-btn primary" id="btn-submit-reg" style="width: 100%;">
                        Играть!
                    </button>
                </div>
            </div>
        </div>
    `;

    // References
    const previewBox = container.querySelector('.avatar-preview-box');
    const nickInput = container.querySelector('#nick-input');
    const codeInput = container.querySelector('#code-input');
    
    // Pre-fill code if present in hash
    const hash = window.location.hash.slice(1).toUpperCase();
    if (hash && hash.length === 4) {
        codeInput.value = hash;
    }
    
    // Random nicknames list for convenience
    const randomNicks = ["КрутойБобёр", "УмныйКот", "ХитрыйЛис", "БыстрыйЗаяц", "ПандаМастер", "ВеселыйГусь", "ШустрыйЕнот", "ТихийТигр"];
    nickInput.value = randomNicks[Math.floor(Math.random() * randomNicks.length)];

    const updatePreview = () => {
        previewBox.innerHTML = renderAvatarSvg(avatarConfig);
    };

    // Cycle helper
    const cycle = (array, currentVal, direction) => {
        let idx = array.indexOf(currentVal);
        if (idx === -1) idx = 0;
        idx = (idx + direction + array.length) % array.length;
        return array[idx];
    };
    
    const cycleIndex = (max, currentVal, direction) => {
        return (currentVal + direction + max) % max;
    };

    // Listeners for avatar edits
    container.querySelector('#bg-prev').onclick = () => { playSound.click(); avatarConfig.bgColor = cycle(BG_COLORS, avatarConfig.bgColor, -1); updatePreview(); };
    container.querySelector('#bg-next').onclick = () => { playSound.click(); avatarConfig.bgColor = cycle(BG_COLORS, avatarConfig.bgColor, 1); updatePreview(); };
    
    container.querySelector('#body-prev').onclick = () => { playSound.click(); avatarConfig.bodyColor = cycle(BODY_COLORS, avatarConfig.bodyColor, -1); updatePreview(); };
    container.querySelector('#body-next').onclick = () => { playSound.click(); avatarConfig.bodyColor = cycle(BODY_COLORS, avatarConfig.bodyColor, 1); updatePreview(); };

    container.querySelector('#eyes-prev').onclick = () => { playSound.click(); avatarConfig.eyes = cycleIndex(EYE_OPTIONS.length, avatarConfig.eyes, -1); updatePreview(); };
    container.querySelector('#eyes-next').onclick = () => { playSound.click(); avatarConfig.eyes = cycleIndex(EYE_OPTIONS.length, avatarConfig.eyes, 1); updatePreview(); };

    container.querySelector('#mouth-prev').onclick = () => { playSound.click(); avatarConfig.mouth = cycleIndex(MOUTH_OPTIONS.length, avatarConfig.mouth, -1); updatePreview(); };
    container.querySelector('#mouth-next').onclick = () => { playSound.click(); avatarConfig.mouth = cycleIndex(MOUTH_OPTIONS.length, avatarConfig.mouth, 1); updatePreview(); };

    container.querySelector('#shirt-prev').onclick = () => { playSound.click(); avatarConfig.shirt = cycleIndex(SHIRT_OPTIONS.length, avatarConfig.shirt || 0, -1); updatePreview(); };
    container.querySelector('#shirt-next').onclick = () => { playSound.click(); avatarConfig.shirt = cycleIndex(SHIRT_OPTIONS.length, avatarConfig.shirt || 0, 1); updatePreview(); };

    container.querySelector('#acc-prev').onclick = () => { playSound.click(); avatarConfig.accessory = cycleIndex(ACCESSORY_OPTIONS.length, avatarConfig.accessory, -1); updatePreview(); };
    container.querySelector('#acc-next').onclick = () => { playSound.click(); avatarConfig.accessory = cycleIndex(ACCESSORY_OPTIONS.length, avatarConfig.accessory, 1); updatePreview(); };

    container.querySelector('#effect-prev').onclick = () => { playSound.click(); avatarConfig.effect = cycleIndex(EFFECT_OPTIONS.length, avatarConfig.effect !== undefined ? avatarConfig.effect : 0, -1); updatePreview(); };
    container.querySelector('#effect-next').onclick = () => { playSound.click(); avatarConfig.effect = cycleIndex(EFFECT_OPTIONS.length, avatarConfig.effect !== undefined ? avatarConfig.effect : 0, 1); updatePreview(); };

    container.querySelector('#btn-random-avatar').onclick = () => {
        playSound.click();
        Object.assign(avatarConfig, {
            bgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
            bodyColor: BODY_COLORS[Math.floor(Math.random() * BODY_COLORS.length)],
            eyes: Math.floor(Math.random() * EYE_OPTIONS.length),
            mouth: Math.floor(Math.random() * MOUTH_OPTIONS.length),
            shirt: Math.floor(Math.random() * SHIRT_OPTIONS.length),
            accessory: Math.floor(Math.random() * ACCESSORY_OPTIONS.length),
            effect: Math.floor(Math.random() * EFFECT_OPTIONS.length)
        });
        updatePreview();
    };

    container.querySelector('#btn-submit-reg').onclick = () => {
        playSound.click();
        const nickname = nickInput.value.trim() || "Аноним";
        const code = codeInput.value.trim().toUpperCase();
        onRegister(nickname, code);
    };
}

// -------------------------------------------------------------
// 2. LOBBY SCREEN
// -------------------------------------------------------------
export function renderLobbyScreen(container, lobbyState, player_id, onStartGame, onSettingsChange, onCopyLink, onKick) {
    const isHost = lobbyState.players.find(p => p.id === player_id)?.is_host;
    
    // Sort players so Host is at the top
    const sortedPlayers = [...lobbyState.players].sort((a, b) => b.is_host - a.is_host);
    const activePlayersCount = lobbyState.players.length;

    let playersHtml = "";
    sortedPlayers.forEach(p => {
        playersHtml += `
            <div class="player-row">
                <div class="player-info-left">
                    <div class="player-avatar-small">
                        ${renderAvatarSvg(p.avatar)}
                    </div>
                    <span class="player-name">${escapeHtml(p.name)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    ${p.is_host ? '<span class="badge host-badge">Хозяин</span>' : '<span class="badge" style="background-color:#4a457a;">Игрок</span>'}
                    ${isHost && p.id !== player_id ? `
                        <button class="kick-btn" data-id="${p.id}" title="Исключить">❌</button>
                    ` : ''}
                </div>
            </div>
        `;
    });

    const times = [
        { label: "30 сек", val: 30 },
        { label: "45 сек", val: 45 },
        { label: "1 мин", val: 60 },
        { label: "1.5 мин", val: 90 },
        { label: "2 мин", val: 120 },
        { label: "3 мин", val: 180 },
        { label: "5 мин", val: 300 },
        { label: "10 мин", val: 600 }
    ];

    let timeOptionsHtml = "";
    times.forEach(t => {
        const isSelected = lobbyState.settings.challenge_time === t.val;
        timeOptionsHtml += `<option value="${t.val}" ${isSelected ? "selected" : ""}>${t.label}</option>`;
    });

    const bonusVal = lobbyState.settings.correct_answer_bonus || 0;
    let bonusOptionsHtml = "";
    for (let b = 0; b <= 10; b++) {
        const isSelected = bonusVal === b;
        bonusOptionsHtml += `<option value="${b}" ${isSelected ? "selected" : ""}>+${b} сек</option>`;
    }

    container.innerHTML = `
        <div class="cartoon-card">
            <div class="lobby-header">
                <h2>Комната ожидания</h2>
                <div class="lobby-code-badge">КОД: ${lobbyState.code}</div>
            </div>
            
            <div class="flex-row" style="margin-bottom: 25px;">
                <button class="cartoon-btn info" id="btn-copy-link" style="flex-grow: 1;">
                    🔗 Скопировать ссылку
                </button>
            </div>
            
            <h3>Игроки (${activePlayersCount} / 5)</h3>
            <div class="players-list">
                ${playersHtml}
            </div>
            
            <div class="lobby-settings-panel">
                <div class="settings-row">
                    <span class="settings-label">⏱️ Время на написание ответов:</span>
                    <div>
                        ${isHost ? `
                            <select class="cartoon-input" id="time-select" style="width: auto; min-width: 140px; padding: 6px 12px; font-size: 1rem;">
                                ${timeOptionsHtml}
                            </select>
                        ` : `
                            <span class="badge score-badge" style="font-size: 1rem; padding: 6px 12px;">
                                ${times.find(t => t.val === lobbyState.settings.challenge_time)?.label || lobbyState.settings.challenge_time + " сек"}
                            </span>
                        `}
                    </div>
                </div>
                
                <div class="settings-row" style="margin-top: 15px;">
                    <span class="settings-label">➕ Доп. время за верный ответ:</span>
                    <div>
                        ${isHost ? `
                            <select class="cartoon-input" id="bonus-select" style="width: auto; min-width: 140px; padding: 6px 12px; font-size: 1rem;">
                                ${bonusOptionsHtml}
                            </select>
                        ` : `
                            <span class="badge score-badge" style="font-size: 1rem; padding: 6px 12px;">
                                +${bonusVal} сек
                            </span>
                        `}
                    </div>
                </div>
            </div>
            
            <div class="flex-center">
                ${isHost ? `
                    <button class="cartoon-btn success" id="btn-start-game" style="width: 100%; max-width: 300px;" ${activePlayersCount < 2 ? "disabled" : ""}>
                        🚀 Начать игру
                    </button>
                ` : `
                    <div style="font-family: var(--font-heading); font-weight: bold; color: var(--text-muted); text-align: center;">
                        🎮 Ожидаем, пока хозяин начнет игру...
                    </div>
                `}
            </div>
        </div>
    `;

    // Event listeners
    container.querySelector('#btn-copy-link').onclick = () => {
        playSound.click();
        onCopyLink();
    };

    if (isHost) {
        const timeSelect = container.querySelector('#time-select');
        const bonusSelect = container.querySelector('#bonus-select');
        
        const handleSettingsChange = () => {
            playSound.click();
            onSettingsChange(parseInt(timeSelect.value), parseInt(bonusSelect.value));
        };
        
        if (timeSelect) timeSelect.onchange = handleSettingsChange;
        if (bonusSelect) bonusSelect.onchange = handleSettingsChange;
        
        const btnStart = container.querySelector('#btn-start-game');
        if (btnStart) {
            btnStart.onclick = () => {
                playSound.click();
                onStartGame();
            };
        }

        container.querySelectorAll('.kick-btn').forEach(btn => {
            btn.onclick = () => {
                playSound.click();
                const targetId = btn.dataset.id;
                if (confirm("Вы уверены, что хотите исключить этого игрока?")) {
                    onKick(targetId);
                }
            };
        });
    }
}

// -------------------------------------------------------------
// 3. THEME VOTING SCREEN
// -------------------------------------------------------------
export function renderThemeVotingScreen(container, lobbyState, player_id, onVote) {
    // Generate timer bar
    const timerHtml = `
        <div class="game-timer-container">
            <div class="timer-clock">10</div>
            <div class="timer-bar-outer">
                <div class="timer-bar-inner" style="width: 100%;"></div>
            </div>
        </div>
    `;

    const votes = lobbyState.votes; // player_id -> index (0-3)
    const themes = lobbyState.themes_to_vote; // list of 4 themes
    const myVote = votes[player_id];

    let themesHtml = "";
    themes.forEach((theme, idx) => {
        const isSelected = myVote === idx;
        
        // Find players who voted for this index
        const voters = lobbyState.players.filter(p => votes[p.id] === idx);
        let votersHtml = "";
        voters.forEach(v => {
            votersHtml += `
                <div class="voter-avatar-micro" title="${escapeHtml(v.name)}">
                    ${renderAvatarSvg(v.avatar)}
                </div>
            `;
        });

        themesHtml += `
            <div class="theme-vote-card ${isSelected ? 'selected' : ''}" data-idx="${idx}">
                <div>${theme}</div>
                <div class="voters-avatars">
                    ${votersHtml}
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        ${timerHtml}
        <div class="cartoon-card">
            <h2>Выбор темы раунда!</h2>
            <p style="text-align: center; color: var(--text-muted); margin-bottom: 20px;">
                Проголосуйте за тему, в которой лучше разбираетесь
            </p>
            <div class="voting-grid">
                ${themesHtml}
            </div>
        </div>
    `;

    // Click handlers
    container.querySelectorAll('.theme-vote-card').forEach(card => {
        card.onclick = () => {
            playSound.click();
            const idx = parseInt(card.dataset.idx);
            onVote(idx);
        };
    });
}

// -------------------------------------------------------------
// 4. BIDDING SCREEN
// -------------------------------------------------------------
export function renderBiddingScreen(container, lobbyState, player_id, onBid, onLiar) {
    const activePlayerId = lobbyState.active_player_id;
    const isMyTurn = activePlayerId === player_id;
    const currentBid = lobbyState.current_bid;
    const lastBidderId = lobbyState.current_bidder_id;
    
    const activePlayerName = lobbyState.players.find(p => p.id === activePlayerId)?.name || "Игрок";
    const lastBidderName = lobbyState.players.find(p => p.id === lastBidderId)?.name || "";

    // Timer (30s)
    const timerHtml = `
        <div class="game-timer-container">
            <div class="timer-clock">30</div>
            <div class="timer-bar-outer">
                <div class="timer-bar-inner" style="width: 100%;"></div>
            </div>
        </div>
    `;

    // Build player circles
    let playersHtml = "";
    // We render players in order
    lobbyState.players_order.forEach(pid => {
        const p = lobbyState.players.find(x => x.id === pid);
        if (!p) return;
        const isActive = pid === activePlayerId;
        const isCurrentBidder = pid === lastBidderId;
        
        let cardClass = "";
        if (isActive) cardClass = "active-turn";
        else if (isCurrentBidder) cardClass = "active-bidder-highlight";

        playersHtml += `
            <div class="turn-player-card ${cardClass}">
                <div class="avatar-box">
                    ${renderAvatarSvg(p.avatar)}
                </div>
                <span class="turn-name">${escapeHtml(p.name)}</span>
                <span class="badge score-badge" style="margin-top: 4px; font-size: 0.7rem;">⭐ ${p.score}</span>
            </div>
        `;
    });

    // Temp local state for bid adjust
    let proposedBid = currentBid === 0 ? 1 : currentBid + 1;

    container.innerHTML = `
        ${timerHtml}
        <div class="cartoon-card bidding-layout">
            <div class="chosen-theme-display">
                Тема: <strong>${lobbyState.chosen_theme}</strong>
            </div>
            
            <div class="active-bid-display">
                ${currentBid === 0 ? `
                    Ставок еще нет! Начните торги.
                ` : `
                    Текущая ставка: <span>${currentBid}</span> от <strong>${escapeHtml(lastBidderName)}</strong>
                `}
            </div>
            
            <div class="players-turn-circle">
                ${playersHtml}
            </div>
            
            <div class="bidding-controls">
                ${isMyTurn ? `
                    <h3 style="margin-bottom: 10px; color: var(--success-color);">Твой ход! Повысь ставку или нажми ложь</h3>
                    
                    <div class="bid-input-row">
                        <button class="bid-adjust-btn" id="bid-minus">-</button>
                        <div class="bid-number-display" id="proposed-bid-display">${proposedBid}</div>
                        <button class="bid-adjust-btn" id="bid-plus">+</button>
                    </div>
                    
                    <div class="flex-row" style="margin-top: 10px;">
                        <button class="cartoon-btn success" id="btn-confirm-bid" style="flex-grow: 1;">
                            🎯 Назвать ${proposedBid}
                        </button>
                        <button class="cartoon-btn danger" id="btn-call-liar" style="flex-grow: 1;" ${currentBid === 0 ? "disabled" : ""}>
                            🚨 Ложь!
                        </button>
                    </div>
                ` : `
                    <div style="font-family: var(--font-heading); font-weight: bold; text-align: center; color: var(--text-muted);">
                        ⏳ Ожидаем ставку от <strong>${escapeHtml(activePlayerName)}</strong>...
                    </div>
                `}
            </div>
        </div>
    `;

    // Wire up events if it's my turn
    if (isMyTurn) {
        const display = container.querySelector('#proposed-bid-display');
        const btnConfirm = container.querySelector('#btn-confirm-bid');
        const btnLiar = container.querySelector('#btn-call-liar');
        const btnMinus = container.querySelector('#bid-minus');
        const minBid = currentBid === 0 ? 1 : currentBid + 1;

        const updateBtnLabel = () => {
            btnConfirm.textContent = `🎯 Назвать ${proposedBid}`;
            display.textContent = proposedBid;
            if (btnMinus) {
                btnMinus.disabled = proposedBid <= minBid;
            }
        };

        // Initialize state
        updateBtnLabel();

        if (btnMinus) {
            btnMinus.onclick = () => {
                playSound.click();
                if (proposedBid > minBid) {
                    proposedBid--;
                    updateBtnLabel();
                }
            };
        }

        container.querySelector('#bid-plus').onclick = () => {
            playSound.click();
            proposedBid++;
            updateBtnLabel();
        };

        btnConfirm.onclick = () => {
            playSound.bid();
            onBid(proposedBid);
        };

        btnLiar.onclick = () => {
            playSound.liar();
            onLiar();
        };
    }
}

// -------------------------------------------------------------
// 5. CHALLENGE SCREEN
// -------------------------------------------------------------
export function renderChallengeScreen(container, lobbyState, player_id, onAddItem, onRemoveItem, onSubmitChallenge) {
    const challengedId = lobbyState.challenged_id;
    const isMeChallenged = challengedId === player_id;
    const targetCount = lobbyState.current_bid;
    const theme = lobbyState.chosen_theme;
    
    const challengedPlayer = lobbyState.players.find(p => p.id === challengedId);
    const challengerPlayer = lobbyState.players.find(p => p.id === lobbyState.challenger_id);
    
    const totalSeconds = lobbyState.settings.challenge_time;
    const items = lobbyState.challenge_items || [];

    // Timer (configured challenge time)
    const timerHtml = `
        <div class="game-timer-container">
            <div class="timer-clock">${totalSeconds}</div>
            <div class="timer-bar-outer">
                <div class="timer-bar-inner" style="width: 100%;"></div>
            </div>
        </div>
    `;

    if (isMeChallenged) {
        // I have to write items!
        container.innerHTML = `
            ${timerHtml}
            <div class="cartoon-card">
                <h2>Тебе бросили вызов!</h2>
                <div class="chosen-theme-display" style="margin-bottom: 20px;">
                    Напиши <strong>${targetCount}</strong> названий на тему:<br>
                    <strong>${theme}</strong>
                </div>
                
                <div class="challenge-grid">
                    <div class="challenger-sidebar">
                        <div class="avatar-preview-box" style="width: 90px; height: 90px;">
                            ${renderAvatarSvg(challengerPlayer?.avatar)}
                        </div>
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 10px;">
                            <strong>${escapeHtml(challengerPlayer?.name)}</strong> объявил твою ставку ложью!
                        </p>
                    </div>
                    
                    <div class="challenge-main">
                        <div class="challenge-counter">
                            Записано: <span id="item-count">${items.length}</span> / ${targetCount}
                        </div>
                        
                        <div class="flex-row">
                            <input type="text" class="cartoon-input" id="item-input" placeholder="Введите название..." maxlength="80" autofocus>
                            <button class="cartoon-btn success" id="btn-add-item" style="padding: 12px 20px;">Добавить</button>
                        </div>
                        
                        <div class="words-scroller" id="words-list">
                            ${items.length === 0 ? `
                                <div style="color: var(--text-muted); text-align: center; margin-top: 80px;">Список пуст. Добавьте первый пункт!</div>
                            ` : items.map((itemObj, idx) => `
                                <div class="word-pill">
                                    <span>${idx + 1}. ${escapeHtml(itemObj.item)}</span>
                                    <button class="word-remove-btn" data-idx="${idx}">❌</button>
                                </div>
                            `).join('')}
                        </div>
                        
                        <button class="cartoon-btn primary" id="btn-submit-list" style="width: 100%; margin-top: 10px;" ${items.length < targetCount ? "disabled" : ""}>
                            🚀 Сдать ответы
                        </button>
                    </div>
                </div>
            </div>
        `;

        const input = container.querySelector('#item-input');
        const btnAdd = container.querySelector('#btn-add-item');
        const btnSubmit = container.querySelector('#btn-submit-list');

        input.focus();
        container.activeInput = input; // Expose to app.js for validation checks

        const tryAddItem = () => {
            const val = input.value.trim();
            if (!val) return;
            
            // Local duplicate check
            if (items.some(x => x.item.toLowerCase() === val.toLowerCase())) {
                input.value = "";
                input.classList.add('input-error');
                playSound.fail();
                setTimeout(() => input.classList.remove('input-error'), 350);
                return;
            }
            
            onAddItem(val);
        };

        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                tryAddItem();
            }
        };

        btnAdd.onclick = () => {
            tryAddItem();
        };

        btnSubmit.onclick = () => {
            playSound.click();
            onSubmitChallenge();
        };

        // Wire up delete events
        container.querySelectorAll('.word-remove-btn').forEach(btn => {
            btn.onclick = () => {
                playSound.click();
                const idx = parseInt(btn.dataset.idx);
                onRemoveItem(idx);
            };
        });

    } else {
        // Other players wait and see in real-time
        container.innerHTML = `
            ${timerHtml}
            <div class="cartoon-card">
                <h2>Время проверки!</h2>
                <div class="chosen-theme-display" style="margin-bottom: 25px;">
                    Тема: <strong>${theme}</strong> (Ставка: <strong>${targetCount}</strong>)
                </div>
                
                <div class="challenge-grid">
                    <div class="challenger-sidebar">
                        <div class="avatar-preview-box bounce" style="width: 100px; height: 100px;">
                            ${renderAvatarSvg(challengedPlayer?.avatar)}
                        </div>
                        <h3 style="color: var(--info-color); margin-top: 10px;">
                            <strong>${escapeHtml(challengedPlayer?.name)}</strong> пишет ответы...
                        </h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; max-width: 250px;">
                            Наблюдайте за ответами в реальном времени!
                        </p>
                    </div>
                    
                    <div class="challenge-main">
                        <div class="challenge-counter">
                            Записано: <span>${items.length}</span> / ${targetCount}
                        </div>
                        
                        <div class="words-scroller" id="spectator-words-list">
                            ${items.length === 0 ? `
                                <div style="color: var(--text-muted); text-align: center; margin-top: 80px; font-weight: bold;">
                                    Ожидаем первое слово... 📝
                                </div>
                            ` : items.map((itemObj, idx) => `
                                <div class="word-pill">
                                    <span>${idx + 1}. ${escapeHtml(itemObj.item)}</span>
                                    <span style="font-size: 1.1rem;">✅</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// -------------------------------------------------------------
// 6. REVIEW SCREEN
// -------------------------------------------------------------
export function renderReviewScreen(container, lobbyState, player_id, onContinue) {
    const challengedId = lobbyState.challenged_id;
    const isMeChallenged = challengedId === player_id;
    const items = lobbyState.challenge_items; // list of dicts: {item: string, valid: bool}
    const isHost = lobbyState.players.find(p => p.id === player_id)?.is_host;
    
    const challengedPlayer = lobbyState.players.find(p => p.id === challengedId);

    // Timer (15s reveal)
    const timerHtml = `
        <div class="game-timer-container">
            <div class="timer-clock">15</div>
            <div class="timer-bar-outer">
                <div class="timer-bar-inner" style="width: 100%;"></div>
            </div>
        </div>
    `;

    let listHtml = "";
    items.forEach((itemObj, idx) => {
        const text = itemObj.item;
        const isValid = itemObj.valid;
        
        listHtml += `
            <div class="review-item-row" style="animation-delay: ${idx * 0.08}s;">
                <span class="review-item-text">${idx + 1}. ${escapeHtml(text)}</span>
                <div>
                    ${isValid ? `
                        <span class="status-badge valid">✅ Верно</span>
                    ` : `
                        <span class="status-badge invalid">❌ Ошибка</span>
                    `}
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        ${timerHtml}
        <div class="cartoon-card">
            <h2>Проверка ответов по базе данных</h2>
            <p style="text-align: center; color: var(--text-muted); margin-bottom: 20px;">
                База данных проверила ответы игрока <strong>${escapeHtml(challengedPlayer?.name)}</strong>:
            </p>
            
            <div class="review-scroller">
                ${items.length === 0 ? `
                    <div style="color: var(--text-muted); text-align: center; margin-top: 100px; font-weight: bold; font-size: 1.2rem;">
                        Игрок не написал ни одного ответа! 😱
                    </div>
                ` : listHtml}
            </div>
            
            <div class="flex-center" style="margin-top: 25px;">
                ${isHost ? `
                    <button class="cartoon-btn success" id="btn-skip-reveal" style="width: 100%; max-width: 300px;">
                        👉 Продолжить
                    </button>
                ` : `
                    <div style="font-family: var(--font-heading); font-weight: bold; text-align: center; color: var(--text-muted);">
                        ⏳ Ожидаем перехода к результатам...
                    </div>
                `}
            </div>
        </div>
    `;

    if (isHost) {
        container.querySelector('#btn-skip-reveal').onclick = () => {
            playSound.click();
            onContinue();
        };
    }
}

// -------------------------------------------------------------
// 7. SCOREBOARD SCREEN
// -------------------------------------------------------------
export function renderScoreboardScreen(container, lobbyState, player_id, roundResult, onNextRound, onPlayAgain) {
    const isHost = lobbyState.players.find(p => p.id === player_id)?.is_host;
    
    // Sort players by score
    const sortedPlayers = [...lobbyState.players].sort((a, b) => b.score - a.score);

    // Generate players scoreboard list
    let scoreboardHtml = "";
    sortedPlayers.forEach((p, idx) => {
        let rankLabel = `${idx + 1}`;
        if (idx === 0) rankLabel = "👑 1";
        
        scoreboardHtml += `
            <div class="scoreboard-row">
                <div class="scoreboard-rank">${rankLabel}</div>
                <div class="scoreboard-player-info">
                    <div class="scoreboard-player-avatar">
                        ${renderAvatarSvg(p.avatar)}
                    </div>
                    <span class="scoreboard-player-name">${escapeHtml(p.name)}</span>
                </div>
                <div class="scoreboard-points">${p.score} очков</div>
            </div>
        `;
    });

    // Make round announcement
    let announcementHtml = "";
    if (roundResult) {
        const challenged = lobbyState.players.find(p => p.id === roundResult.challenged_id);
        const challenger = lobbyState.players.find(p => p.id === roundResult.challenger_id);
        const challengedName = challenged ? escapeHtml(challenged.name) : "Игрок";
        const challengerName = challenger ? escapeHtml(challenger.name) : "Оппонент";
        
        if (roundResult.success) {
            announcementHtml = `
                <div class="round-announcement success">
                    🎉 <strong>${challengedName}</strong> подтвердил ставку! Он правильно назвал ${roundResult.accepted_count} из ${roundResult.target_count} предметов.<br>
                    <span style="font-size: 0.9rem;">${challengedName} получает +2 очка. ${challengerName} теряет 1 очко!</span>
                </div>
            `;
        } else {
            announcementHtml = `
                <div class="round-announcement danger">
                    🚨 <strong>${challengedName}</strong> сблефовал! Он назвал только ${roundResult.accepted_count} из ${roundResult.target_count} верных предметов.<br>
                    <span style="font-size: 0.9rem;">${challengedName} теряет 1 очко. ${challengerName} получает +2 очка!</span>
                </div>
            `;
        }
    }

    container.innerHTML = `
        <div class="cartoon-card">
            <h2>Таблица результатов</h2>
            
            ${announcementHtml}
            
            <div class="scoreboard-list">
                ${scoreboardHtml}
            </div>
            
            <div class="flex-center" style="flex-direction: column; gap: 15px; margin-top: 30px;">
                ${isHost ? `
                    <button class="cartoon-btn success" id="btn-next-round" style="width: 100%; max-width: 300px;">
                        ➡️ Следующий раунд
                    </button>
                    <button class="cartoon-btn danger" id="btn-play-again" style="width: 100%; max-width: 300px;">
                        🔄 Начать игру заново (сбросить очки)
                    </button>
                ` : `
                    <div style="font-family: var(--font-heading); font-weight: bold; color: var(--text-muted); text-align: center;">
                        ⏳ Ожидаем решения хоста для продолжения...
                    </div>
                `}
            </div>
        </div>
    `;

    // Events
    if (isHost) {
        container.querySelector('#btn-next-round').onclick = () => {
            playSound.click();
            onNextRound();
        };
        
        container.querySelector('#btn-play-again').onclick = () => {
            playSound.click();
            onPlayAgain();
        };
    }
}
