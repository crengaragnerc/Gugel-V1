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

    // Verificar si ya está registrado
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
    
    // Cambio visual instantáneo
    if (authScreen) authScreen.style.display = "none";
    if (mainApp) mainApp.style.display = "flex"; 
    
    renderHistory();
    updateSidebarUI();
    
    if (chatForm) {
        chatForm.onsubmit = handleUserResponse;
    }
    
    // Lanzar primera ronda tras una milésima de segundo para asegurar el renderizado
    setTimeout(() => {
        nextRound();
    }, 500);
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

// --- FLUJO CON TEMPORIZADOR DE 5 SEGUNDOS ---
function nextRound(forcedQuestion = null) {
    gameState.roundStep = 1;
    
    if (userInput) {
        userInput.disabled = true;
        userInput
