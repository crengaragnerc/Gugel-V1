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

const LOGROS = [
    { id: 'ia_formal', title: '🤖 Ultra Formal', desc: 'Usa "estimado usuario" o "procesando".', unlocked: false },
    { id: 'mucho_texto', title: '📝 Mucho Texto', desc: 'Escribe más de 120 caracteres.', unlocked: false },
    { id: 'ia_cliche', title: '💡 El Sabelotodo', desc: 'Usa las palabras "porque", "es" y "significa".', unlocked: false }
];

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
const authScreen = document.getElementById('auth-screen');
const mainApp = document.getElementById('main-app');
const authForm = document.getElementById('auth-form');
const loggedUserName = document.getElementById('logged-user-name');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const chatForm = document.getElementById('chat-form');
const sendBtn = document.getElementById('send-btn');
const totalScoreEl = document.getElementById('total-score');
const playerLevelEl = document.getElementById('player-level');
const satisfactionBar = document.getElementById('satisfaction-bar');
const elgoogOpinion = document.getElementById('elgoog-opinion');
const elgoogStatus = document.getElementById('elgoog-status');
const historyLog = document.getElementById('history-log');
const suggestionBox = document.getElementById('suggestion-box');

// --- INICIALIZACIÓN Y LOGIN ---
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('elgoog_user');
    if (savedUser) {
        loginUser(savedUser);
    }

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('auth-username').value.trim();
        if (username) {
            localStorage.setItem('elgoog_user', username);
            loginUser(username);
        }
    });

    chatForm.addEventListener('submit', handleUserResponse);
    suggestionBox.addEventListener('click', acceptSuggestion);
});

function loginUser(username) {
    gameState.currentUser = username;
    loggedUserName.innerText = username;
    authScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    
    renderHistory();
    updateSidebarUI();
    nextRound(); 
}

// --- SELECTOR DE PREGUNTAS MATEMÁTICAMENTE ESTRICTO ---
function getNextQuestion() {
    // Si todavía quedan preguntas en la lista fija, se devuelve la actual
    if (gameState.campaignIndex < PREGUNTAS_CAMPAÑA.length) {
        return PREGUNTAS_CAMPAÑA[gameState.campaignIndex];
    }
    
    // Si acaba de terminar la última pregunta de campaña y no se ha activado el modo infinito
    if (!gameState.inInfiniteMode) {
        gameState.inInfiniteMode = true;
        localStorage.setItem('elgoog_infinite_mode', 'true');
        appendMessage('system', '⚠️ SINOPSIS: MODO INICIAL COMPLETADO. INCORPORANDO GENERADOR INFINITO DE CONSULTAS...');
    }

    // Modo infinito por descarte absoluto
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

// --- FLUJO GENERAL DE TRABAJO ---
function nextRound(forcedQuestion = null) {
    gameState.roundStep = 1;
    // Bloqueo preventivo total de los controles mientras Elgoog "piensa"
    userInput.disabled = true;
    sendBtn.disabled = true;
    elgoogStatus.innerText = "Escribiendo...";
    
    setTimeout(() => {
        gameState.currentQuestion = forcedQuestion ? forcedQuestion : getNextQuestion();
        appendMessage('elgoog', gameState.currentQuestion);
        elgoogStatus.innerText = "Conectado";
        
        gameState.roundStep = 2;
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
    }, 1200);
}

function handleUserResponse(e) {
    e.preventDefault();
    const text = userInput.value.trim();
    
    // Evita inyecciones de respuestas si el estado no está listo
    if (!text || gameState.roundStep !== 2) return;

    userInput.disabled = true;
    sendBtn.disabled = true;
    userInput.value = "";

    appendMessage('ai', text);
    
    const pointsEarned = evaluateResponse(text);
    gameState.score += pointsEarned;
    updateSatisfaction(pointsEarned);
    checkAchievementsInternal(text);
    
    saveToHistory(gameState.currentQuestion, text, pointsEarned);

    // Si estábamos en campaña y no se usó una sugerencia externa, avanzamos el índice real
    if (!gameState.inInfiniteMode && !suggestionBox.dataset.activeSuggestion) {
        gameState.campaignIndex++;
        localStorage.setItem('elgoog_campaign_index', gameState.campaignIndex);
    }
    // Limpiar flag de sugerencia
    delete suggestionBox.dataset.activeSuggestion;

    gameState.roundStep = 3;
    elgoogStatus.innerText = "Escribiendo...";

    setTimeout(() => {
        let pool = REACCIONES_ELGOOG.regular;
        if (pointsEarned >= 7) pool = REACCIONES_ELGOOG.excelente;
        if (pointsEarned <= 3) pool = REACCIONES_ELGOOG.malo;
        
        const reaccion = pool[Math.floor(Math.random() * pool.length)];
        appendMessage('elgoog', reaccion);
        
        elgoogStatus.innerText = "Conectado";
        
        // Guardar estado numérico general
        localStorage.setItem('elgoog_score', gameState.score);
        localStorage.setItem('elgoog_satisfaction', gameState.satisfaction);
        localStorage.setItem('elgoog_level', gameState.level);
        
        updateSidebarUI();

        // Las sugerencias solo saltan con un 30% de probabilidad en modo infinito para no romper la campaña
        if (gameState.inInfiniteMode && Math.random() < 0.30) {
            triggerSuggestion();
        } else {
            appendMessage('system', '--- FIN DE LA RONDA: GENERANDO NUEVA BÚSQUEDA ---');
            setTimeout(nextRound, 1500);
        }
    }, 1500);
}

// --- EVALUACIÓN Y LOGROS (SILENCIOSOS) ---
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

function checkAchievementsInternal(text) {
    const lower = text.toLowerCase();
    if ((lower.includes("estimado usuario") || lower.includes("procesando")) && !LOGROS[0].unlocked) LOGROS[0].unlocked = true;
    if (text.length > 120 && !LOGROS[1].unlocked) LOGROS[1].unlocked = true;
    if (lower.includes("porque") && lower.includes("es") && !LOGROS[2].unlocked) LOGROS[2].unlocked = true;
}

// --- RECOMENDACIONES ---
function triggerSuggestion() {
    const sugerencias = ["porque internet se rompe", "como saber si una pagina es falsa", "mi ordenador hace ruido de cafetera ayuda"];
    const elegida = sugerencias[Math.floor(Math.random() * sugerencias.length)];
    
    suggestionBox.innerHTML = `🎬 <strong>Recomendación para Elgoog:</strong> "${elegida}" (Clic para forzar en la red)`;
    suggestionBox.classList.remove('hidden');
    suggestionBox.dataset.pendingQuestion = elegida;
}

function acceptSuggestion() {
    const nextQ = suggestionBox.dataset.pendingQuestion;
    suggestionBox.classList.add('hidden');
    suggestionBox.dataset.activeSuggestion = "true"; // Bloquea el avance de campaña si se juega desde aquí
    appendMessage('system', '--- REDIRECCIONANDO AL HUMANO POR ENLACE ---');
    nextRound(nextQ);
}

// --- INTERFAZ DE USUARIO ---
function updateSatisfaction(points) {
    const diff = points - 5;
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + (diff * 4)));
    if (gameState.score > 20 && gameState.score <= 50) gameState.level = 2;
    if (gameState.score > 50) gameState.level = 3;
}

function updateSidebarUI() {
    totalScoreEl.innerText = gameState.score;
    satisfactionBar.innerText = `${gameState.satisfaction}%`;
    
    let opinion = "indiferente";
    if (gameState.satisfaction > 75) opinion = "te ama / te reza";
    else if (gameState.satisfaction > 55) opinion = "le sirves";
    else if (gameState.satisfaction < 35) opinion = "quiere romper el router";
    elgoogOpinion.innerText = opinion;

    const tier = gameState.level === 1 ? "1 (Iniciante)" : gameState.level === 2 ? "2 (Soporte Técnico)" : "3 (Skynet Consciente)";
    playerLevelEl.innerText = tier;
}

function appendMessage(sender, text) {
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
