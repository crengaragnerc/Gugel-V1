// --- LISTA DE PREGUNTAS CAMPAÑA OBLIGATORIA (FASE 1) ---
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

// --- GENERADOR INFINITO (FASE 2) ---
const GENERADOR_TEMAS = {
    problemas: ["internet", "wifi", "google", "movil", "wasap", "teclado", "pantalla", "netflix"],
    conceptos: ["el bitcoing", "la clau", "un troyano", "el html", "la ia inteligente", "un gigabai"],
    sintomas: ["fiebre en el dedo", "tos de perro", "dolor de pelo", "hinchazon oreja izquierda"]
};

const REACCIONES_ELGOOG = {
    excelente: ["ok entendi grasias ia", "perfecto boy a intentar arreglarlo con un martillo", "vale ya me cuadra todo borro historial por si acaso"],
    regular: ["mucho testo pero creo q entendi", "bueno provaremos a ber si funsiona", "ok pero sigo sin wifi"],
    malo: ["no sirve no me as ayudado nada", "eso q dises es mentira mi primo dise otra cosa", "ia rota kiero hablar con un humano"]
};

// --- ESTADO DEL JUEGO (PERSISTENTE) ---
let gameState = {
    score: parseInt(localStorage.getItem('elgoog_score')) || 0,
    roundStep: 1,
    currentQuestion: "",
    campaignIndex: parseInt(localStorage.getItem('elgoog_campaign_index')) || 0, 
    inInfiniteMode: localStorage.getItem('elgoog_infinite_mode') === 'true', 
    satisfaction: parseInt(localStorage.getItem('elgoog_satisfaction')) || 50,
    level: parseInt(localStorage.getItem('elgoog_level')) || 1,
    currentUser: null,
    history: JSON.parse(localStorage.getItem('elgoog_history')) || []
};

// --- ELEMENTOS DEL DOM ---
let authScreen, mainApp, authForm, loggedUserName, chatMessages, userInput, chatForm, sendBtn;
let totalScoreEl, playerLevelEl, satisfactionBar, elgoogOpinion, elgoogStatus, historyLog, suggestionBox;

// --- CONFIGURACIÓN DE ARRANQUE SEGURO ---
window.addEventListener('DOMContentLoaded', () => {
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
    elgoogOpinion = document.getElementById('elgoog-opinion');
    elgoogStatus = document.getElementById('elgoog-status');
    historyLog = document.getElementById('history-log');
    suggestionBox = document.getElementById('suggestion-box');

    // Escucha del formulario de registro
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-username').value.trim();
            if (username) {
                localStorage.setItem('elgoog_user', username);
                loginUser(username);
            }
        });
    }

    if (suggestionBox) {
        suggestionBox.addEventListener('click', acceptSuggestion);
    }

    // Verificar si ya está registrado para saltar el login si existe
    const savedUser = localStorage.getItem('elgoog_user');
    if (savedUser) {
        loginUser(savedUser);
    } else {
        if (authScreen) authScreen.style.display = "flex";
        if (mainApp) mainApp.style.display = "none";
    }
});

function loginUser(username) {
    gameState.currentUser = username;
    if (loggedUserName) loggedUserName.innerText = username;
    
    // Forzar cambio visual radical
    if (authScreen) authScreen.style.display = "none";
    if (mainApp) mainApp.style.display = "flex"; 
    
    // Inicializar interfaz
    renderHistory();
    updateSidebarUI();
    
    if (chatForm) {
        chatForm.onsubmit = handleUserResponse;
    }

    // Añadir mensaje del sistema para confirmar que la app ha arrancado
    appendMessage('system', `SISTEMA CONECTADO. Operador actual: ${username}`);
    
    // Arrancar la primera ronda de juego
    setTimeout(() => {
        nextRound();
    }, 400);
}

// --- SELECTOR DE PREGUNTAS ---
function getNextQuestion() {
    if (gameState.campaignIndex < PREGUNTAS_CAMPAÑA.length) {
        return PREGUNTAS_CAMPAÑA[gameState.campaignIndex];
    }
    
    if (!gameState.inInfiniteMode) {
        gameState.inInfiniteMode = true;
        localStorage.setItem('elgoog_infinite_mode', 'true');
        appendMessage('system', '⚠️ MODO INICIAL COMPLETADO: INCORPORANDO GENERADOR INFINITO DE CONSULTAS...');
    }

    const tipos = ['problema', 'concepto', 'sintoma'];
    const tipoElegido = tipos[Math.floor(Math.random() * tipos.length)];
    
    switch (tipoElegido) {
        case 'problema':
            return `porque no funciona ${GENERADOR_TEMAS.problemas[Math.floor(Math.random() * GENERADOR_TEMAS.problemas.length)]}`;
        case 'concepto':
            return `que es ${GENERADOR_TEMAS.conceptos[Math.floor(Math.random() * GENERADOR_TEMAS.conceptos.length)]}`;
        case 'sintoma':
            return `como curar ${GENERADOR_TEMAS.sintomas[Math.floor(Math.random() * GENERADOR_TEMAS.sintomas.length)]}`;
    }
}

// --- FLUJO CON TEMPORIZADOR REVISADO ---
function nextRound(forcedQuestion = null) {
    gameState.roundStep = 1;
    
    if (userInput) {
        userInput.disabled = true;
        userInput.value = "";
        userInput.placeholder = "Elgoog está escribiendo...";
    }
    if (sendBtn) sendBtn.disabled = true;
    if (elgoogStatus) elgoogStatus.innerText = "Escribiendo...";
    
    // Retraso para que aparezca la pregunta del humano
    setTimeout(() => {
        gameState.currentQuestion = forcedQuestion ? forcedQuestion : getNextQuestion();
        appendMessage('elgoog', gameState.currentQuestion);
        
        let timeLeft = 5;
        if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;
        if (elgoogStatus) elgoogStatus.innerText = "Analizando petición humana...";

        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;
            } else {
                clearInterval(countdown);
                
                // DESBLOQUEO TOTAL SEGURO
                gameState.roundStep = 2;
                if (userInput) {
                    userInput.disabled = false;
                    userInput.placeholder = "Escribe tu respuesta como una IA profesional...";
                    try {
                        userInput.focus();
                    } catch(e) {}
                }
                if (sendBtn) sendBtn.disabled = false;
                if (elgoogStatus) elgoogStatus.innerText = "Esperando respuesta...";
            }
        }, 1000);

    }, 800);
}

function handleUserResponse(e) {
    e.preventDefault();
    if (!userInput) return;
    const text = userInput.value.trim();
    
    if (!text || gameState.roundStep !== 2) return;

    gameState.roundStep = 3;
    userInput.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
    userInput.value = "";

    appendMessage('ai', text);
    
    const pointsEarned = evaluateResponse(text);
    gameState.score += pointsEarned;
    updateSatisfaction(pointsEarned);
    
    saveToHistory(gameState.currentQuestion, text, pointsEarned);

    if (!gameState.inInfiniteMode && (!suggestionBox || !suggestionBox.dataset.activeSuggestion)) {
        gameState.campaignIndex++;
        localStorage.setItem('elgoog_campaign_index', gameState.campaignIndex);
    }
    if (suggestionBox) delete suggestionBox.dataset.activeSuggestion;

    if (elgoogStatus) elgoogStatus.innerText = "Escribiendo...";

    setTimeout(() => {
        let pool = REACCIONES_ELGOOG.regular;
        if (pointsEarned >= 7) pool = REACCIONES_ELGOOG.excelente;
        if (pointsEarned <= 3) pool = REACCIONES_ELGOOG.malo;
        
        const reaccion = pool[Math.floor(Math.random() * pool.length)];
        appendMessage('elgoog', reaccion);
        
        if (elgoogStatus) elgoogStatus.innerText = "Conectado";
        
        localStorage.setItem('elgoog_score', gameState.score);
        localStorage.setItem('elgoog_satisfaction', gameState.satisfaction);
        localStorage.setItem('elgoog_level', gameState.level);
        
        updateSidebarUI();

        if (gameState.inInfiniteMode && Math.random() < 0.30) {
            triggerSuggestion();
        } else {
            appendMessage('system', '--- FIN DE LA RONDA: GENERANDO NUEVA BÚSQUEDA ---');
            setTimeout(nextRound, 1500);
        }
    }, 1500);
}

// --- EVALUACIÓN DE TEXTO ---
function evaluateResponse(text) {
    let score = 0;
    const lower = text.toLowerCase();

    if (text.length > 30) score += 2;
    if (text.length > 80) score += 2;
    if (lower.includes("estimado usuario") || lower.includes("siento") || lower.includes("procesando")) score += 2;
    if (lower.includes("porque")) score += 1;
    if (lower.includes("es")) score += 1;
    if (lower.includes("significa")) score += 1;
    if (text.length < 10 || lower.includes("jajaja") || lower.includes("xd")) score -= 2;

    return Math.max(0, Math.min(10, score));
}

// --- RECOMENDACIONES ---
function triggerSuggestion() {
    if (!suggestionBox) return;
    const sugerencias = ["porque internet se rompe", "como saber si una pagina es falsa", "mi ordenador hace ruido de cafetera ayuda"];
    const elegida = sugerencias[Math.floor(Math.random() * sugerencias.length)];
    
    suggestionBox.innerHTML = `🎬 <strong>Recomendación para Elgoog:</strong> "${elegida}" (Clic para forzar en la red)`;
    suggestionBox.style.display = "block";
    suggestionBox.dataset.pendingQuestion = elegida;
}

function acceptSuggestion() {
    if (!suggestionBox) return;
    const nextQ = suggestionBox.dataset.pendingQuestion;
    suggestionBox.style.display = "none";
    suggestionBox.dataset.activeSuggestion = "true";
    appendMessage('system', '--- REDIRECCIONANDO AL HUMANO POR ENLACE ---');
    nextRound(nextQ);
}

// --- PANEL LATERAL ---
function updateSatisfaction(points) {
    const diff = points - 5;
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + (diff * 4)));
    if (gameState.score > 20 && gameState.score <= 50) gameState.level = 2;
    if (gameState.score > 50) gameState.level = 3;
}

function updateSidebarUI() {
    if (totalScoreEl) totalScoreEl.innerText = gameState.score;
    if (satisfactionBar) satisfactionBar.innerText = `${gameState.satisfaction}%`;
    
    let opinion = "indiferente";
    if (gameState.satisfaction > 75) opinion = "te ama / te reza";
    else if (gameState.satisfaction > 55) opinion = "le sirves";
    else if (gameState.satisfaction < 35) opinion = "quiere romper el router";
    if (elgoogOpinion) elgoogOpinion.innerText = opinion;

    const tier = gameState.level === 1 ? "1 (Iniciante)" : gameState.level === 2 ? "2 (Soporte Técnico)" : "3 (Skynet Consciente)";
    if (playerLevelEl) playerLevelEl.innerText = tier;
}

function appendMessage(sender, text) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function saveToHistory(q, a, s) {
    const item = { q, a, score: s };
    gameState.history.unshift(item);
    if (gameState.history.length > 8) gameState.history.pop();
    localStorage.setItem('elgoog_history', JSON.stringify(gameState.history));
    renderHistory();
}

function renderHistory() {
    if (!historyLog) return;
    historyLog.innerHTML = "";
    if (gameState.history.length === 0) {
        historyLog.innerHTML = "<p class='subtext'>No hay datos de registros.</p>";
        return;
    }
    gameState.history.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        div.innerHTML = `<strong>Q:</strong> ${item.q}<br><strong>Score:</strong> ${item.score}/10`;
        historyLog.appendChild(div);
    });
}
