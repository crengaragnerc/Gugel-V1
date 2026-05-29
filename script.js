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

// ARRAYS PARA MODO INFINITO (CONEXIONES ALEATORIAS)
const SUSTANTIVOS_INFINITOS = ["mi cafetera", "el teclado mecánico", "un gato negro", "el router de casa", "mi cuenta de correo", "un cable de red", "el monitor secundario"];
const ACCIONES_INFINITAS = ["hace un ruido raro", "no enciende la luz", "parpadea en bucle", "huele a quemado", "da calambre", "funciona muy lento", "se desconecta solo"];
const CONTEXTOS_INFINITOS = ["al abrir el navegador", "cuando juego por la tarde", "después de actualizar", "sin tocar nada", "al conectar el USB", "al cambiar la resolución"];

const RESPUESTAS_GUGEL = {
    malas: [
        "ia rota de mielda", "vaya respuesta de mielda no funsiona", 
        "eso no tiene sentido mi primo dice otra cosa", "no rimes q te pego"
    ],
    regulares: [
        "mucho testo no lo leere", "ya provare a ver si funsiona", 
        "bueno... algo es algo supongo"
    ],
    buenas: [
        "ia de locos me as ayudado", "me cuadra perfectamente grasias", 
        "funsiona a la primera eres dios"
    ]
};

let gameState = {
    score: parseInt(localStorage.getItem('gugel_score')) || 0,
    roundStep: 1,
    currentQuestion: "",
    campaignIndex: parseInt(localStorage.getItem('gugel_campaign_index')) || 0, 
    satisfaction: parseInt(localStorage.getItem('gugel_satisfaction')) || 50,
    level: parseInt(localStorage.getItem('gugel_level')) || 1,
    currentTheme: localStorage.getItem('gugel_theme') || 'dark'
};

let ultimaFraseUsada = "";

window.addEventListener('DOMContentLoaded', () => {
    // Inicializar tema visual guardado
    document.body.setAttribute('data-theme', gameState.currentTheme);
    const dropdown = document.getElementById('theme-dropdown');
    if (dropdown) dropdown.value = gameState.currentTheme;

    const chatForm = document.getElementById('chat-form');
    if (chatForm) chatForm.onsubmit = handleUserResponse;

    updateSidebarUI();
    nextRound();
});

function changeSystemTheme(themeValue) {
    gameState.currentTheme = themeValue;
    localStorage.setItem('gugel_theme', themeValue);
    document.body.setAttribute('data-theme', themeValue);
}

function generarPreguntaAleatoria() {
    const s = SUSTANTIVOS_INFINITOS[Math.floor(Math.random() * SUSTANTIVOS_INFINITOS.length)];
    const a = ACCIONES_INFINITAS[Math.floor(Math.random() * ACCIONES_INFINITAS.length)];
    const c = CONTEXTOS_INFINITOS[Math.floor(Math.random() * CONTEXTOS_INFINITOS.length)];
    return `${s} ${a} ${c}`;
}

function nextRound() {
    gameState.roundStep = 1;
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const gugelStatus = document.getElementById('gugel-status');
    const statusDot = document.getElementById('status-dot');

    if (userInput) { userInput.disabled = true; userInput.value = ""; }
    if (sendBtn) sendBtn.disabled = true;
    if (gugelStatus) gugelStatus.innerText = "GUGEL está redactando su duda...";
    if (statusDot) { statusDot.className = "status-indicator thinking"; }

    setTimeout(() => {
        // Selector de Campaña fija o Generador Infinito
        if (gameState.campaignIndex < PREGUNTAS_CAMPAÑA.length) {
            gameState.currentQuestion = PREGUNTAS_CAMPAÑA[gameState.campaignIndex];
        } else {
            gameState.currentQuestion = generarPreguntaAleatoria();
        }
        
        appendMessage('gugel', gameState.currentQuestion);
        
        let timeLeft = 4;
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
                if (gugelStatus) gugelStatus.innerText = "Conectado";
                if (statusDot) { statusDot.className = "status-indicator connected"; }
            }
        }, 1000);
    }, 800);
}

function handleUserResponse(e) {
    e.preventDefault();
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    if (!userInput) return;

    const text = userInput.value.trim();
    if (!text || gameState.roundStep !== 2) return;

    gameState.roundStep = 3;
    userInput.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    appendMessage('ai', text);
    const pointsEarned = evaluateResponse(text);
    
    gameState.score += pointsEarned;
    updateSatisfaction(pointsEarned);
    
    openResultModal(gameState.currentQuestion, text, pointsEarned);
}

function evaluateResponse(text) {
    let score = 5; 
    const lower = text.toLowerCase();
    
    if (text.length > 25) score += 2;
    if (text.length > 60) score += 2;
    if (lower.includes("porque") || lower.includes("debido") || lower.includes("solucion") || lower.includes("configurar")) score += 1;
    
    // Penalizaciones directas
    if (text.length < 12) score -= 3;
    if (lower.includes("jajaja") || lower.includes("xd")) score -= 2;
    
    return Math.max(0, Math.min(10, score));
}

function finishRoundAfterModal(points) {
    const gugelStatus = document.getElementById('gugel-status');
    if (gugelStatus) gugelStatus.innerText = "Procesando reacción...";
    
    setTimeout(() => {
        const reaccion = obtenerRespuestaLocal(points);
        appendMessage('gugel', reaccion);
        
        // Guardado persistente local
        localStorage.setItem('gugel_score', gameState.score);
        localStorage.setItem('gugel_satisfaction', gameState.satisfaction);
        localStorage.setItem('gugel_level', gameState.level);
        
        gameState.campaignIndex++;
        localStorage.setItem('gugel_campaign_index', gameState.campaignIndex);

        updateSidebarUI();

        appendMessage('system', '--- FIN DE LA RONDA ---');
        setTimeout(nextRound, 1200);
    }, 600);
}

function obtenerRespuestaLocal(puntuacion) {
    let saco = puntuacion < 4 ? RESPUESTAS_GUGEL.malas : puntuacion <= 6 ? RESPUESTAS_GUGEL.regulares : RESPUESTAS_GUGEL.buenas;
    let fraseElegida = saco[Math.floor(Math.random() * saco.length)];
    if (fraseElegida === ultimaFraseUsada && saco.length > 1) {
        fraseElegida = saco[(saco.indexOf(fraseElegida) + 1) % saco.length];
    }
    ultimaFraseUsada = fraseElegida;
    return fraseElegida;
}

function openResultModal(q, a, score) {
    const resultModal = document.getElementById('result-modal');
    const modalQ = document.getElementById('modal-question');
    const modalA = document.getElementById('modal-answer');
    const modalS = document.getElementById('modal-score-number');

    if (!resultModal || !modalQ || !modalA || !modalS) {
        finishRoundAfterModal(score);
        return;
    }

    modalQ.innerText = `"${q}"`;
    modalA.innerText = `"${a}"`;
    modalS.innerText = `${score}/10`;
    resultModal.style.display = "flex";
}

function closeResultModal() {
    const resultModal = document.getElementById('result-modal');
    if (resultModal) resultModal.style.display = "none";
    
    const modalS = document.getElementById('modal-score-number');
    const score = modalS ? parseInt(modalS.innerText.split("/")[0]) : 5;

    finishRoundAfterModal(score);
}

function updateSatisfaction(points) {
    const diff = points - 5;
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + (diff * 4)));
    
    // Escala de niveles basada en puntuación
    if (gameState.score > 25 && gameState.score <= 60) gameState.level = 2;
    if (gameState.score > 60) gameState.level = 3;
}

function updateSidebarUI() {
    const totalScoreEl = document.getElementById('total-score');
    const satisfactionPercentage = document.getElementById('satisfaction-percentage');
    const satisfactionBar = document.getElementById('satisfaction-bar');
    const gugelOpinion = document.getElementById('gugel-opinion');
    const playerLevelEl = document.getElementById('player-level');

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
    const chatMessages = document.getElementById('chat-messages');
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
