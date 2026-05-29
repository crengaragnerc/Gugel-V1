// --- CONFIGURACIÓN DE HISTORIAS Y PREGUNTAS ---
const PREGUNTAS_CAMPAÑA = [
    "cagar verde normal",
    "como hacer cubo rubik",
    "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa",
    "xq agua es liquida",
    "como allanar un barranco",
    "tomate fruta verdura?",
    "cancion tan tan tan tann nombre",
    "como saber si alguien te ha bloqueado",
    "porque no carga una pagina web"
];

const GENERADOR_TEMAS = {
    problemas: ["internet", "wifi", "google", "movil", "wasap", "teclado", "pantalla", "netflix"],
    conceptos: ["el bitcoing", "la clau", "un troyano", "el html", "la ia inteligente", "un gigabai"],
    sintomas: ["fiebre en el dedo", "tos de perro", "dolor de pelo", "hinchazon oreja izquierda"]
};

const RESPUESTAS_GUGEL = {
    malas: [
        "ia rota de mielda", "vaya respuesta de mielda no funsiona", 
        "eso no tiene sentido mi primo dice otra cosa", "no rimes q te pego",
        "q dices loco lo busco en la wikipedia mejor", "ia de hacendado arreglame el internet",
        "para eso prefiero preguntar en un foro de coches", "no funsiona menudo timo"
    ],
    regulares: [
        "mucho testo no lo leere", "ya provare a ver si funsiona", 
        "suena raro pero me sirve de momento", "bueno... algo es algo supongo",
        "un poco largo pero lo intentare", "ok provaremos aver"
    ],
    buenas: [
        "ia de locos me as ayudado", "me cuadra perfectamente grasias", 
        "funsiona a la primera eres dios", "oleeee solucionado q grande", 
        "lo has clavao de locos", "asi si da gusto usar una ia"
    ]
};

const LOGROS_DEFINICION = [
    { id: "primer_paso", icon: "🚀", title: "Primer Soporte", desc: "Responde con éxito a la primera consulta." },
    { id: "experto", icon: "🧠", title: "Verdad Absoluta", desc: "Consigue una puntuación perfecta de 10/10." },
    { id: "gugel_love", icon: "❤️", title: "Ídolo de Masas", desc: "Alcanza más del 80% de satisfacción de usuario." },
    { id: "infinito", icon: "🌌", title: "Más allá del Deber", desc: "Supera la campaña base y entra al Modo Infinito." }
];

// --- ESTADO GLOBAL ---
let gameState = {
    score: parseInt(localStorage.getItem('gugel_score')) || 0,
    roundStep: 1,
    currentQuestion: "",
    campaignIndex: parseInt(localStorage.getItem('gugel_campaign_index')) || 0, 
    inInfiniteMode: localStorage.getItem('gugel_infinite_mode') === 'true', 
    satisfaction: parseInt(localStorage.getItem('gugel_satisfaction')) || 50,
    level: parseInt(localStorage.getItem('gugel_level')) || 1,
    currentUser: null,
    history: JSON.parse(localStorage.getItem('gugel_history')) || [],
    favorites: JSON.parse(localStorage.getItem('gugel_favorites')) || [],
    unlockedAchievements: JSON.parse(localStorage.getItem('gugel_achievements')) || []
};

// Elementos DOM
let authScreen, mainApp, authForm, loggedUserName, chatMessages, userInput, chatForm, sendBtn;
let totalScoreEl, playerLevelEl, satisfactionBar, satisfactionPercentage, gugelOpinion, gugelStatus;
let resultModal, modalQuestion, modalAnswer, modalScoreNumber;

window.addEventListener('DOMContentLoaded', () => {
    // Vinculación rápida de elementos
    authScreen = document.getElementById('auth-screen');
    mainApp = document.getElementById('main-app');
    authForm = document.getElementById('auth-form');
    loggedUserName = document.getElementById('logged-user-name');
    chatMessages = document.getElementById('chat-messages');
    userInput = document.getElementById('user-input');
    chatForm = document.getElementById('chat-form');
    sendBtn = document.getElementById('send-btn');
    totalScoreEl = document.getElementById('total-score');
    playerLevelEl = document.getElementById('player-level');
    satisfactionBar = document.getElementById('satisfaction-bar');
    satisfactionPercentage = document.getElementById('satisfaction-percentage');
    gugelOpinion = document.getElementById('gugel-opinion');
    gugelStatus = document.getElementById('gugel-status');
    
    // Modales
    resultModal = document.getElementById('result-modal');
    modalQuestion = document.getElementById('modal-question');
    modalAnswer = document.getElementById('modal-answer');
    modalScoreNumber = document.getElementById('modal-score-number');

    // Recuperar tema preferido
    const savedTheme = localStorage.getItem('gugel_theme') || 'dark';
    setTheme(savedTheme);

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-username').value.trim();
            if (username) {
                localStorage.setItem('gugel_user', username);
                loginUser(username);
            }
        });
    }

    const savedUser = localStorage.getItem('gugel_user');
    if (savedUser) {
        loginUser(savedUser);
    } else {
        authScreen.style.display = "flex";
        mainApp.style.display = "none";
    }
});

function loginUser(username) {
    gameState.currentUser = username;
    if (loggedUserName) loggedUserName.innerText = username;
    authScreen.style.display = "none";
    mainApp.style.display = "flex"; 
    
    updateSidebarUI();
    renderArchive();
    renderAchievements();
    
    if (chatForm) chatForm.onsubmit = handleUserResponse;
    
    setTimeout(() => { nextRound(); }, 500);
}

// --- TEMAS (CLARO, OSCURO, HACKER) ---
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gugel_theme', theme);
}

// --- NAVEGACIÓN POR PESTAÑAS ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).style.display = 'flex';
    // Marcar botón correspondiente como activo
    const btnIndex = tabId === 'chat-tab' ? 0 : tabId === 'archive-tab' ? 1 : 2;
    document.querySelectorAll('.nav-btn')[btnIndex].classList.add('active');

    if (tabId === 'archive-tab') renderArchive();
    if (tabId === 'achievements-tab') renderAchievements();
}

// --- LÓGICA DEL JUEGO ---
function getNextQuestion() {
    if (gameState.campaignIndex < PREGUNTAS_CAMPAÑA.length) {
        return PREGUNTAS_CAMPAÑA[gameState.campaignIndex];
    }
    if (!gameState.inInfiniteMode) {
        gameState.inInfiniteMode = true;
        localStorage.setItem('gugel_infinite_mode', 'true');
        unlockAchievement("infinito");
        appendMessage('system', '⚠️ MODO INICIAL COMPLETADO: INCORPORANDO GENERADOR INFINITO DE CONSULTAS...');
    }
    const tipos = ['problema', 'concepto', 'sintoma'];
    const tipoElegido = tipos[Math.floor(Math.random() * tipos.length)];
    switch (tipoElegido) {
        case 'problema': return `porque no funciona ${GENERADOR_TEMAS.problemas[Math.floor(Math.random() * GENERADOR_TEMAS.problemas.length)]}`;
        case 'concepto': return `que es ${GENERADOR_TEMAS.conceptos[Math.floor(Math.random() * GENERADOR_TEMAS.conceptos.length)]}`;
        case 'sintoma': return `como curar ${GENERADOR_TEMAS.sintomas[Math.floor(Math.random() * GENERADOR_TEMAS.sintomas.length)]}`;
    }
}

function nextRound(forcedQuestion = null) {
    gameState.roundStep = 1;
    if (userInput) { userInput.disabled = true; userInput.value = ""; }
    if (sendBtn) sendBtn.disabled = true;
    if (gugelStatus) gugelStatus.innerText = "GUGEL está redactando su duda...";

    setTimeout(() => {
        gameState.currentQuestion = forcedQuestion ? forcedQuestion : getNextQuestion();
        appendMessage('gugel', gameState.currentQuestion);
        
        let timeLeft = 5;
        if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;

        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;
            } else {
                clearInterval(countdown);
                gameState.roundStep = 2;
                if (userInput) {
                    userInput.disabled = false;
                    userInput.placeholder = "Escribe tu respuesta técnica avanzada...";
                    userInput.focus();
                }
                if (sendBtn) sendBtn.disabled = false;
                if (gugelStatus) gugelStatus.innerText = "Esperando entrada de operador...";
            }
        }, 1000);
    }, 1000);
}

function handleUserResponse(e) {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text || gameState.roundStep !== 2) return;

    gameState.roundStep = 3;
    userInput.disabled = true;
    sendBtn.disabled = true;

    appendMessage('ai', text);
    const pointsEarned = evaluateResponse(text);
    
    // Procesar logros por rendimiento
    unlockAchievement("primer_paso");
    if (pointsEarned === 10) unlockAchievement("experto");

    // Guardar datos
    gameState.score += pointsEarned;
    updateSatisfaction(pointsEarned);
    
    // Abrir pantalla de resultados
    openResultModal(gameState.currentQuestion, text, pointsEarned);
}

function finishRoundAfterModal(points, questionText, answerText) {
    if (gugelStatus) gugelStatus.innerText = "Procesando reacción de GUGEL...";
    
    setTimeout(() => {
        const reaccion = obtenerRespuestaLocal(points);
        appendMessage('gugel', reaccion);
        
        // Guardar de forma definitiva en el archivo general
        saveToArchive(questionText, answerText, points, reaccion);

        localStorage.setItem('gugel_score', gameState.score);
        localStorage.setItem('gugel_satisfaction', gameState.satisfaction);
        localStorage.setItem('gugel_level', gameState.level);
        
        updateSidebarUI();

        if (!gameState.inInfiniteMode && !document.getElementById('suggestion-box').dataset.activeSuggestion) {
            gameState.campaignIndex++;
            localStorage.setItem('gugel_campaign_index', gameState.campaignIndex);
        }
        delete document.getElementById('suggestion-box').dataset.activeSuggestion;

        appendMessage('system', '--- FIN DE LA RONDA: PETICIÓN CERRADA ---');
        setTimeout(nextRound, 1200);
    }, 800);
}

// --- EVALUACIÓN REAJUSTADA (MÁXIMA COHERENCIA INTERNET) ---
function evaluateResponse(text) {
    let score = 5; // Base neutra equilibrada
    const lower = text.toLowerCase();

    if (text.length > 25) score += 2;
    if (text.length > 60) score += 2;
    if (lower.includes("porque") || lower.includes("debido") || lower.includes("consiste") || lower.includes("solucion")) score += 1;

    if (text.length < 12) score -= 3;
    if (lower.includes("jajaja") || lower.includes("xd")) score -= 3;

    return Math.max(0, Math.min(10, score));
}

function obtenerRespuestaLocal(puntuacion) {
    let saco = puntuacion < 4 ? RESPUESTAS_GUGEL.malas : puntuacion <= 6 ? RESPUESTAS_GUGEL.regulares : RESPUESTAS_GUGEL.buenas;
    return saco[Math.floor(Math.random() * saco.length)];
}

// --- PANTALLA DE RESULTADOS (MODAL) ---
function openResultModal(q, a, score) {
    if (!resultModal) return;
    modalQuestion.innerText = `"${q}"`;
    modalAnswer.innerText = `"${a}"`;
    modalScoreNumber.innerText = `${score}/10`;
    resultModal.style.display = "flex";
}

function closeResultModal() {
    if (!resultModal) return;
    resultModal.style.display = "none";
    // Extraer datos visuales para continuar el flujo normal del chat
    const q = modalQuestion.innerText.replace(/"/g, "");
    const a = modalAnswer.innerText.replace(/"/g, "");
    const score = parseInt(modalScoreNumber.innerText.split("/")[0]);
    finishRoundAfterModal(score, q, a);
}

// --- SISTEMA DE LOGROS ---
function unlockAchievement(id) {
    if (!gameState.unlockedAchievements.includes(id)) {
        gameState.unlockedAchievements.push(id);
        localStorage.setItem('gugel_achievements', JSON.stringify(gameState.unlockedAchievements));
        appendMessage('system', `🏆 ¡LOGRO DESBLOQUEADO!: ${LOGROS_DEFINICION.find(l => l.id === id).title}`);
    }
}

function renderAchievements() {
    const listEl = document.getElementById('achievements-list');
    if (!listEl) return;
    listEl.innerHTML = "";
    LOGROS_DEFINICION.forEach(logro => {
        const isUnlocked = gameState.unlockedAchievements.includes(logro.id);
        const card = document.createElement('div');
        card.classList.add('achievement-card');
        if (isUnlocked) card.classList.add('unlocked');
        card.innerHTML = `
            <div class="achievement-icon">${logro.icon}</div>
            <div class="achievement-info">
                <h4>${logro.title} ${isUnlocked ? '✅' : '🔒'}</h4>
                <p>${logro.desc}</p>
            </div>
        `;
        listEl.appendChild(card);
    });
}

// --- ARCHIVO, FAVORITOS Y COMPARTIR ---
function saveToArchive(q, a, score, reaccion) {
    const id = Date.now();
    const item = { id, q, a, score, reaccion, timestamp: new Date().toLocaleTimeString() };
    gameState.history.unshift(item);
    localStorage.setItem('gugel_history', JSON.stringify(gameState.history));
}

function toggleFavorite(id) {
    const index = gameState.favorites.indexOf(id);
    if (index === -1) gameState.favorites.push(id);
    else gameState.favorites.splice(index, 1);
    localStorage.setItem('gugel_favorites', JSON.stringify(gameState.favorites));
    renderArchive();
}

function shareChat(q, a, score) {
    const textToCopy = `🔴 [LOG DE SOPORTE GUGEL]\nConsulta: "${q}"\nRespuesta del Sistema: "${a}"\nEvaluación de Eficiencia: ${score}/10\nModulo de simulación de red activo.`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Enlace cifrado y log copiado al portapapeles. ¡Listo para compartir!");
    }).catch(() => {
        alert("Error al acceder al portapapeles del sistema.");
    });
}

function renderArchive() {
    const listEl = document.getElementById('archive-list');
    if (!listEl) return;
    listEl.innerHTML = "";
    if (gameState.history.length === 0) {
        listEl.innerHTML = `<p style="color: var(--text-muted); font-size: 14px;">No hay registros grabados en el disco local todavía.</p>`;
        return;
    }
    gameState.history.forEach(item => {
        const isFav = gameState.favorites.includes(item.id);
        const card = document.createElement('div');
        card.classList.add('archive-card');
        card.innerHTML = `
            <div class="archive-meta">
                <span>Registro ID: #${item.id} - ${item.timestamp}</span>
                <span>Calificación: <strong>${item.score}/10</strong></span>
            </div>
            <div class="archive-body">
                <p><strong>Usuario:</strong> ${item.q}</p>
                <p><strong>Tú:</strong> ${item.a}</p>
                <p style="color: var(--text-muted); font-style: italic; font-size: 13px; margin-top:2px;"><strong>GUGEL:</strong> ${item.reaccion}</p>
            </div>
            <div class="archive-actions">
                <button class="archive-btn" onclick="toggleFavorite(${item.id})">${isFav ? '⭐ Quitar Favorito' : '📁 Guardar en Favoritos'}</button>
                <button class="archive-btn" onclick="shareChat('${item.q}', '${item.a}', ${item.score})">🔗 Compartir Ficha</button>
            </div>
        `;
        listEl.appendChild(card);
    });
}

// --- ACTUALIZACIÓN DE ESTADÍSTICAS LATERALES ---
function updateSatisfaction(points) {
    const diff = points - 5;
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + (diff * 4)));
    if (gameState.satisfaction >= 80) unlockAchievement("gugel_love");
    
    // Escala de niveles según puntuación acumulada
    if (gameState.score > 25 && gameState.score <= 60) gameState.level = 2;
    if (gameState.score > 60) gameState.level = 3;
}

function updateSidebarUI() {
    if (totalScoreEl) totalScoreEl.innerText = gameState.score;
    if (satisfactionPercentage) satisfactionPercentage.innerText = `${gameState.satisfaction}%`;
    if (satisfactionBar) satisfactionBar.style.width = `${gameState.satisfaction}%`;
    
    let opinion = "Indiferente";
    if (gameState.satisfaction > 75) opinion = "Te reza / Eres Dios";
    else if (gameState.satisfaction > 50) opinion = "Le sirves de algo";
    else if (gameState.satisfaction < 30) opinion = "Quiere quemar tu router";
    if (gugelOpinion) gugelOpinion.innerText = opinion;

    const tier = gameState.level === 1 ? "Nivel 1 (Iniciante)" : gameState.level === 2 ? "Nivel 2 (Técnico Avanzado)" : "Nivel 3 (Skynet Consciente)";
    if (playerLevelEl) playerLevelEl.innerText = tier;
}

function appendMessage(sender, text) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    if (sender === 'gugel') {
        msg.innerHTML = `<span style="color: #4285F4; font-weight: bold;">GUGEL:</span> ${text}`;
    } else {
        msg.innerText = text;
    }
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
