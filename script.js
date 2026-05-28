// --- CONFIGURACIÓN Y BASES DE DATOS ---
const PREGUNTAS_BASE = [
    "cagar verde normal",
    "porque internet no funciona",
    "como saber si me han bloqueado",
    "mi gato me mira raro mañana muero",
    "como descargar mas memoria ram gratis",
    "duele operacion de amigdalas wikipedia",
    "youtube poner musica de fondo gratis"
];

const GENERADOR_TEMAS = {
    problemas: ["internet", "wifi", "google", "movil", "wasap", "teclado", "pantalla", "netflix"],
    conceptos: ["el bitcoing", "la clau", "un troyano", "el html", "la ia inteligente", "un gigabai"],
    sintomas: ["fiebre en el dedo", "tos de perro", "dolor de pelo", "hinchazon oreja izquierda"]
};

const REACCIONES_ELGOOG = {
    excelente: [
        "ok entendi grasias ia",
        "perfecto boy a intentar arreglarlo con un martillo",
        "vale ya me cuadra todo borro historial por si acaso"
    ],
    regular: [
        "mucho testo pero creo q entendi",
        "bueno provaremos a ber si funsiona",
        "ok pero sigo sin wifi"
    ],
    malo: [
        "no sirve no me as ayudado nada",
        "eso q dises es mentira mi primo dise otra cosa",
        "ia rota kiero hablar con un humano"
    ]
};

const LOGROS = [
    { id: 'ia_formal', title: '🤖 Ultra Formal', desc: 'Usa "estimado usuario" o "procesando".', unlocked: false },
    { id: 'mucho_texto', title: '📝 Mucho Texto', desc: 'Escribe más de 120 caracteres.', unlocked: false },
    { id: 'ia_cliche', title: '💡 El Sabelotodo', desc: 'Usa las palabras "porque", "es" y "significa".', unlocked: false },
    { id: 'paciente_cero', title: '🏥 Medico de Internet', desc: 'Responde a un síntoma médico extraño.', unlocked: false }
];

// --- ESTADO DEL JUEGO ---
let gameState = {
    score: 0,
    roundStep: 1, // 1: Pregunta, 2: Respuesta Usuario, 3: Cierre Elgoog
    currentQuestion: "",
    satisfaction: 50,
    level: 1,
    history: JSON.parse(localStorage.getItem('elgoog_history')) || []
};

// --- ELEMENTOS DEL DOM ---
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const chatForm = document.getElementById('chat-form');
const sendBtn = document.getElementById('send-btn');
const totalScoreEl = document.getElementById('total-score');
const playerLevelEl = document.getElementById('player-level');
const satisfactionBar = document.getElementById('satisfaction-bar');
const elgoogOpinion = document.getElementById('elgoog-opinion');
const elgoogStatus = document.getElementById('elgoog-status');
const achievementsList = document.getElementById('achievements-list');
const historyLog = document.getElementById('history-log');
const clearHistoryBtn = document.getElementById('clear-history');
const suggestionBox = document.getElementById('suggestion-box');

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    initAchievements();
    renderHistory();
    updateSidebarUI();
    nextRound(); // Inicia la primera ronda

    chatForm.addEventListener('submit', handleUserResponse);
    clearHistoryBtn.addEventListener('click', clearHistory);
    suggestionBox.addEventListener('click', acceptSuggestion);
});

// --- GENERADOR DE PREGUNTAS (MODO INFINITO) ---
function generateQuestion() {
    if (Math.random() < 0.4 && PREGUNTAS_BASE.length > 0) {
        return PREGUNTAS_BASE[Math.floor(Math.random() * PREGUNTAS_BASE.length)];
    }
    
    const tipos = ['problema', 'concepto', 'sintoma'];
    const tipoElegido = tipos[Math.floor(Math.random() * tipos.length)];
    
    switch (tipoElegido) {
        case 'problema':
            const p = GENERADOR_TEMAS.problemas[Math.floor(Math.random() * GENERADOR_TEMAS.problemas.length)];
            return `porque no funciona ${p}`;
        case 'concepto':
            const c = GENERADOR_TEMAS.conceptos[Math.floor(Math.random() * GENERADOR_TEMAS.conceptos.length)];
            return `que es ${c}`;
        case 'sintoma':
            const s = GENERADOR_TEMAS.sintomas[Math.floor(Math.random() * GENERADOR_TEMAS.sintomas.length)];
            return `como curar ${s}`;
    }
}

// --- FLUJO DEL JUEGO (REGLA DE 3 MENSAJES) ---
function nextRound(forcedQuestion = null) {
    gameState.roundStep = 1;
    elgoogStatus.innerText = "Escribiendo...";
    
    setTimeout(() => {
        gameState.currentQuestion = forcedQuestion ? forcedQuestion : generateQuestion();
        appendMessage('elgoog', gameState.currentQuestion);
        elgoogStatus.innerText = "Conectado";
        
        // Habilitar la respuesta del usuario
        gameState.roundStep = 2;
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
    }, 1200);
}

function handleUserResponse(e) {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text || gameState.roundStep !== 2) return;

    // Deshabilitar inputs inmediatamente
    userInput.disabled = true;
    sendBtn.disabled = true;
    userInput.value = "";

    appendMessage('ai', text);
    
    // Procesar puntuación
    const pointsEarned = evaluateResponse(text);
    gameState.score += pointsEarned;
    updateSatisfaction(pointsEarned);
    checkAchievements(text);
    
    // Guardar en historial interno
    saveToHistory(gameState.currentQuestion, text, pointsEarned);

    gameState.roundStep = 3;
    elgoogStatus.innerText = "Escribiendo...";

    // Reacción de Elgoog y cierre automático
    setTimeout(() => {
        let pool = REACCIONES_ELGOOG.regular;
        if (pointsEarned >= 7) pool = REACCIONES_ELGOOG.excelente;
        if (pointsEarned <= 3) pool = REACCIONES_ELGOOG.malo;
        
        const reaccion = pool[Math.floor(Math.random() * pool.length)];
        appendMessage('elgoog', reaccion);
        
        elgoogStatus.innerText = "Conectado";
        updateSidebarUI();

        // Sistema "Ya que has respondido esto..." (25% de probabilidad)
        if (Math.random() < 0.35) {
            triggerSuggestion();
        } else {
            appendMessage('system', '--- FIN DE LA RONDA: GENERANDO NUEVA BÚSQUEDA ---');
            setTimeout(nextRound, 1500);
        }
    }, 1500);
}

// --- LÓGICA DE PUNTUACIÓN DE IA ---
function evaluateResponse(text) {
    let score = 0;
    const lower = text.toLowerCase();

    // 1. Longitud (Premiar respuestas elaboradas estilo IA)
    if (text.length > 30) score += 2;
    if (text.length > 80) score += 2;

    // 2. Coherencia formal/corporativa de IA
    if (lower.includes("estimado usuario") || lower.includes("siento") || lower.includes("procesando") || lower.includes("asistencia")) {
        score += 2;
    }

    // 3. Palabras clave estructurales
    if (lower.includes("porque")) score += 1;
    if (lower.includes("es")) score += 1;
    if (lower.includes("significa") || lower.includes("recomienda")) score += 1;

    // 4. Penalización por absurdo o excesiva brevedad
    if (text.length < 10) score -= 2;
    if (lower.includes("jajaja") || lower.includes("xd") || lower.includes("no se")) score -= 2;

    // Acotar el score final entre 0 y 10
    return Math.max(0, Math.min(10, score));
}

// --- SISTEMA RECOMENDACIONES (NETFLIX STYLE) ---
function triggerSuggestion() {
    const sugerencias = [
        "porque internet se rompe",
        "como saber si una pagina es falsa",
        "mi ordenador hace ruido de cafetera ayuda",
        "descargar antivirus que no tenga virus"
    ];
    const elegida = sugerencias[Math.floor(Math.random() * sugerencias.length)];
    
    suggestionBox.innerHTML = `🎬 <strong>Ya que has respondido esto prueba con:</strong> "${elegida}" (Clic para aceptar)`;
    suggestionBox.classList.remove('hidden');
    suggestionBox.dataset.pendingQuestion = elegida;
}

function acceptSuggestion() {
    const nextQ = suggestionBox.dataset.pendingQuestion;
    suggestionBox.classList.add('hidden');
    appendMessage('system', '--- CARGANDO RECOMENDACIÓN RELEVANTE ---');
    nextRound(nextQ);
}

// --- LOGROS Y ESTADOS ---
function initAchievements() {
    achievementsList.innerHTML = "";
    LOGROS.forEach(ach => {
        const li = document.createElement('li');
        li.id = `ach-${ach.id}`;
        li.innerHTML = `<strong>${ach.title}</strong>: ${ach.desc}`;
        achievementsList.appendChild(li);
    });
}

function checkAchievements(text) {
    const lower = text.toLowerCase();
    
    if ((lower.includes("estimado usuario") || lower.includes("procesando")) && !LOGROS[0].unlocked) unlockLogro(0);
    if (text.length > 120 && !LOGROS[1].unlocked) unlockLogro(1);
    if (lower.includes("porque") && lower.includes("es") && lower.includes("significa") && !LOGROS[2].unlocked) unlockLogro(2);
    if (gameState.currentQuestion.includes("curar") || gameState.currentQuestion.includes("muero") && !LOGROS[3].unlocked) unlockLogro(3);
}

function unlockLogro(index) {
    LOGROS[index].unlocked = true;
    const el = document.getElementById(`ach-${LOGROS[index].id}`);
    if (el) {
        el.classList.add('unlocked');
        el.innerHTML += " ✅";
    }
}

function updateSatisfaction(points) {
    // Si saca más de 5 sube satisfacción, si saca menos baja
    const diff = points - 5;
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + (diff * 4)));
    
    // Calcular nivel según puntuación acumulada
    if (gameState.score > 20 && gameState.score <= 50) gameState.level = 2;
    if (gameState.score > 50) gameState.level = 3;
}

function updateSidebarUI() {
    totalScoreEl.innerText = gameState.score;
    satisfactionBar.innerText = `${gameState.satisfaction}%`;
    
    // Actualizar opinión de Elgoog
    let opinion = "indiferente";
    if (gameState.satisfaction > 75) opinion = "te ama / te reza";
    else if (gameState.satisfaction > 55) opinion = "le sirves";
    else if (gameState.satisfaction < 35) opinion = "quiere romper el router";
    elgoogOpinion.innerText = opinion;

    // Actualizar Nivel
    const tier = gameState.level === 1 ? "1 (Iniciante)" : gameState.level === 2 ? "2 (Soporte Técnico)" : "3 (Skynet Consciente)";
    playerLevelEl.innerText = tier;
}

// --- GESTIÓN DE HISTORIAL & INTERFAZ ---
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
    if (gameState.history.length > 10) gameState.history.pop(); // Máximo 10 items
    localStorage.setItem('elgoog_history', JSON.stringify(gameState.history));
    renderHistory();
}

function renderHistory() {
    historyLog.innerHTML = "";
    if (gameState.history.length === 0) {
        historyLog.innerHTML = "<p class='subtext'>No hay datos.</p>";
        return;
    }
    gameState.history.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        div.innerHTML = `<strong>Q:</strong> ${item.q}<br><strong>Score:</strong> ${item.score}/10`;
        historyLog.appendChild(div);
    });
}

function clearHistory() {
    gameState.history = [];
    localStorage.removeItem('elgoog_history');
    renderHistory();
}
