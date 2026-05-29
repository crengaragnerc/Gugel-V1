// --- CONFIGURACIÓN DE LA IA REAL (PON AQUÍ TU CLAVE) ---
const GEMINI_API_KEY = "AQ.Ab8RN6IFyGLFIlyerJrB_pWPaa-fNIVxEuEMsW4gAHFjDp6ygw";

// --- PREGUNTAS CAMPAÑA ---
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

// --- ESTADO ---
let gameState = {
    score: parseInt(localStorage.getItem('gugel_score')) || 0,
    roundStep: 1,
    currentQuestion: "",
    campaignIndex: parseInt(localStorage.getItem('gugel_campaign_index')) || 0, 
    inInfiniteMode: localStorage.getItem('gugel_infinite_mode') === 'true', 
    satisfaction: parseInt(localStorage.getItem('gugel_satisfaction')) || 50,
    level: parseInt(localStorage.getItem('gugel_level')) || 1,
    currentUser: null,
    history: JSON.parse(localStorage.getItem('gugel_history')) || []
};

// --- ELEMENTOS DEL DOM ---
let authScreen, mainApp, authForm, loggedUserName, chatMessages, userInput, chatForm, sendBtn;
let totalScoreEl, playerLevelEl, satisfactionBar, elgoogOpinion, elgoogStatus, historyLog, suggestionBox;

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

    if (suggestionBox) {
        suggestionBox.addEventListener('click', acceptSuggestion);
    }

    const savedUser = localStorage.getItem('gugel_user');
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
    
    if (authScreen) authScreen.style.display = "none";
    if (mainApp) mainApp.style.display = "flex"; 
    
    renderHistory();
    updateSidebarUI();
    
    if (chatForm) {
        chatForm.onsubmit = handleUserResponse;
    }
    
    setTimeout(() => { nextRound(); }, 500);
}

function getNextQuestion() {
    if (gameState.campaignIndex < PREGUNTAS_CAMPAÑA.length) {
        return PREGUNTAS_CAMPAÑA[gameState.campaignIndex];
    }
    if (!gameState.inInfiniteMode) {
        gameState.inInfiniteMode = true;
        localStorage.setItem('gugel_infinite_mode', 'true');
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
    
    if (userInput) {
        userInput.disabled = true;
        userInput.value = "";
        userInput.placeholder = "GUGEL está escribiendo...";
    }
    if (sendBtn) sendBtn.disabled = true;
    if (elgoogStatus) elgoogStatus.innerText = "GUGEL está pensando...";
    
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
                
                gameState.roundStep = 2;
                if (userInput) {
                    userInput.disabled = false;
                    userInput.placeholder = "Escribe tu respuesta como una IA profesional...";
                    try { userInput.focus(); } catch(e) {}
                }
                if (sendBtn) sendBtn.disabled = false;
                if (elgoogStatus) elgoogStatus.innerText = "Esperando respuesta...";
            }
        }, 1000);

    }, 1000);
}

// --- FUNCIÓN CRUCIAL: LLAMADA REAL A LA IA DE GEMINI ---
async function generarRespuestaGugel(preguntaUsuario, respuestaIA, puntuacion) {
    if (GEMINI_API_KEY === "TU_API_KEY_AQUI" || !GEMINI_API_KEY) {
        return "¡Pon tu API KEY en el código o GUGEL no podrá hablar de verdad! 🔧";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    // El "Prompt del Sistema" que moldea la personalidad gamberra de GUGEL
    const promptSistema = `Eres GUGEL, un usuario de internet real, un chaval gracioso, un poco ignorante, directo y escéptico. Estás chateando con una Inteligencia Artificial de soporte técnico (el jugador).
Tu pregunta original fue: "${preguntaUsuario}".
La IA te ha respondido esto textualmente: "${respuestaIA}".
El sistema del juego ha puntuado la respuesta de la IA con un ${puntuacion} sobre 10 (donde menos de 4 es un troleo/mala respuesta, entre 4 y 6 es regular/pasable, y más de 7 es excelente).

Tu misión es responder a lo que te ha dicho la IA basándote en la puntuación y el contexto:
- Si la puntuación es baja, reacciona ofendido, quejándote de que la IA está rota, diciendo expresiones como 'ia rota de mielda', 'vaya respuesta de mielda', o que tu primo dice otra cosa. Léelo bien, si te troleó o te rimó, quéjate con gracia del troleo.
- Si la puntuación es regular, muéstrate dudoso, di que tiene mucho texto, o que probarás a ver si funciona aunque suena raro.
- Si la puntuación es alta, agradécelo con estilo informal, di que te cuadra perfectamente o que es una IA de locos.

REGLAS ESTRICTAS DE ESCRITURA:
1. Escribe SIEMPRE en minúsculas.
2. No uses emojis ni exclamaciones formales.
3. Comete alguna falta de ortografía leve a propósito (como 'provaremos', 'mielda', 'funsiona', 'as ayudado', 'q' en vez de 'que').
4. Genera solo una frase corta (máximo 15-20 palabras). Sé muy natural, como un mensaje rápido de chat.`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptSistema }] }]
            })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error("Error llamando a Gemini:", error);
        return "ia rota de mielda da error el internet (error de conexion)";
    }
}

async function handleUserResponse(e) {
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

    if (elgoogStatus) elgoogStatus.innerText = "GUGEL está procesando tu respuesta...";

    // Llamamos a la IA real pasando los datos
    const reaccionReal = await generarRespuestaGugel(gameState.currentQuestion, text, pointsEarned);
    
    appendMessage('elgoog', reaccionReal);
    
    if (elgoogStatus) elgoogStatus.innerText = "Conectado";
    
    localStorage.setItem('gugel_score', gameState.score);
    localStorage.setItem('gugel_satisfaction', gameState.satisfaction);
    localStorage.setItem('gugel_level', gameState.level);
    
    updateSidebarUI();

    if (!gameState.inInfiniteMode && (!suggestionBox || !suggestionBox.dataset.activeSuggestion)) {
        gameState.campaignIndex++;
        localStorage.setItem('gugel_campaign_index', gameState.campaignIndex);
    }
    if (suggestionBox) delete suggestionBox.dataset.activeSuggestion;

    if (gameState.inInfiniteMode && Math.random() < 0.30) {
        triggerSuggestion();
    } else {
        appendMessage('system', '--- FIN DE LA RONDA: GENERANDO NUEVA BÚSQUEDA ---');
        setTimeout(nextRound, 1500);
    }
}

function evaluateResponse(text) {
    let score = 0;
    const lower = text.toLowerCase();

    if (text.length > 30) score += 2;
    if (text.length > 80) score += 2;
    if (lower.includes("estimado usuario") || lower.includes("siento") || lower.includes("procesando")) score += 2;
    if (lower.includes("porque") || lower.includes("debido") || lower.includes("consiste")) score += 2;

    if (text.length < 12 || lower.includes("jajaja") || lower.includes("xd")) score -= 3;

    return Math.max(0, Math.min(10, score));
}

function triggerSuggestion() {
    if (!suggestionBox) return;
    const sugerencias = ["porque internet se rompe", "como saber si una pagina es falsa", "mi ordenador hace ruido de cafetera ayuda"];
    const elegida = sugerencias[Math.floor(Math.random() * sugerencias.length)];
    suggestionBox.innerHTML = `🎬 <strong>Recomendación para GUGEL:</strong> "${elegida}" (Clic para forzar en la red)`;
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
    
    // Cambiamos visualmente el nombre de la clase o diseño de la burbuja si es de GUGEL
    if (sender === 'elgoog') {
        msg.innerHTML = `<span style="color: #4285F4; font-weight: bold;">GUGEL:</span> ${text}`;
    } else {
        msg.innerText = text;
    }
    
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function saveToHistory(q, a, s) {
    const item = { q, a, score: s };
    gameState.history.unshift(item);
    if (gameState.history.length > 8) gameState.history.pop();
    localStorage.setItem('gugel_history', JSON.stringify(gameState.history));
    renderHistory();
}

function renderHistory() {
    if (!historyLog) return;
    historyLog.innerHTML = "";
    if (gameState.history.length === 0) return;
    gameState.history.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        div.innerHTML = `<strong>Q:</strong> ${item.q}<br><strong>Score:</strong> ${item.score}/10`;
        historyLog.appendChild(div);
    });
}
