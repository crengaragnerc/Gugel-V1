const PREGUNTAS_BASE = [
    "cagar verde normal", 
    "agua porque moja",
    "duele la cabeza al pensar",
    "como saber si soy un robot test gratis",
    "por que los patos no se hunden"
];

const GEN_PREFIJOS = ["porque los", "como saber si mi", "es normal que el", "que pasa si como", "por que el", "que significa soñar con", "se puede vivir con un"];
const GEN_SUFIJOS = ["gato me mira fijamente", "teclado escribe solo", "agua tiene sabor a metal", "plastilina se puede comer", "brazo me tiembla un poco", "universo es infinito", "espejo se mueve", "perro duerme boca arriba"];

const REACCIONES_OK = [
    "ah vale me quedo mas tranquilo entonces cerrare la pestaña",
    "me cuadra bastante la explicacion tiene sentido",
    "vale entonces no me preocupo pensaba que era algo peor",
    "entendido menos mal que lo he buscado aqui ya me estaba rayando",
    "ok me sirve bastante esa respuesta",
    "perfecto ya entendi el problema de raiz",
    "bueno con eso me basta para no ir a urgencias",
    "tiene logica gracias por la info",
    "menos mal crei que me iba a morir o algo",
    "vale lo anoto para tenerlo en cuenta"
];

const REACCIONES_RECHAZO = [
    "no me convence nada esa respuesta buscare en otro sitio",
    "vaya porqueria de buscador no me aclara nada",
    "eso no responde a mi pregunta que respuesta mas inutil",
    "para poner eso mejor no pongas nada sigo igual de rayado",
    "no me sirve para nada abrire otra pestaña",
    "que respuesta mas absurda que flojera",
    "eso es una tonteria no tiene ningun sentido",
    "vaya pérdida de tiempo me voy a otra pagina",
    "no te entiendo nada hablas raro",
    "que estafa de pagina sigo con la misma duda"
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "porquesea", "jaja"];

let gameState = { 
    index: 0, 
    satisfaction: 50,
    cycles: 0,
    totalChars: 0,
    lastOpinion: "no hay consultas en la sesión actual",
    currentPregunta: "",
    history: [],
    logrosDesbloqueados: []
};

const LOGROS_DEFINICIONES = {
    "breve": "<strong>[logro revelado] respuestita:</strong> responder a gugel usando 3 caracteres o menos",
    "primero": "<strong>[logro revelado] primera consulta:</strong> resolver el primer hilo de datos de gugel",
    "visual": "<strong>[logro revelado] cambio de entorno:</strong> modificar los parámetros visuales del terminal central",
    "cuber": "<strong>[logro revelado] concepto avanzado:</strong> resolver un hilo de gugel inyectando términos algorítmicos o mecánicos"
};

function switchView(viewId) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${viewId}`);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('.content-panel').forEach(panel => panel.classList.remove('active'));
    const activePanel = document.getElementById(viewId);
    if (activePanel) activePanel.classList.add('active');

    if (viewId === 'view-consultas') {
        document.getElementById('panel-title-text').innerText = "GUGEL Core";
    } else {
        document.getElementById('panel-title-text').innerText = "GUGEL Core - Sistema de Módulos";
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    const cleanText = text.toLowerCase();
    msg.innerHTML = sender === 'gugel' ? `<strong>gugel:</strong> ${cleanText}` : `<strong>tú:</strong> ${cleanText}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function generarPreguntaInfinita() {
    const pref = GEN_PREFIJOS[Math.floor(Math.random() * GEN_PREFIJOS.length)];
    const suf = GEN_SUFIJOS[Math.floor(Math.random() * GEN_SUFIJOS.length)];
    return `${pref} ${suf}`;
}

function nextRound() {
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    continueBtn.style.display = "none";
    transmitBtn.style.display = "block";
    input.style.display = "block";

    if (gameState.index < PREGUNTAS_BASE.length) {
        gameState.currentPregunta = PREGUNTAS_BASE[gameState.index];
    } else {
        gameState.currentPregunta = generarPreguntaInfinita();
    }
    
    appendMessage('gugel', gameState.currentPregunta);
    
    input.disabled = true; 
    transmitBtn.disabled = true;
    
    let timeLeft = 5;
    input.placeholder = `gugel buscando... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `gugel buscando... (${timeLeft}s)`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = false; 
            transmitBtn.disabled = false;
            input.placeholder = "introduce la respuesta del motor...";
            input.focus();
        }
    }, 1000);
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    
    appendMessage('ai', userText);
    
    let esRespuestaValidaCorta = (userText === "no" || userText === "si" || userText === "ci" || userText === "depende");
    let esEvasiva = EVASIVAS.some(e => userText.includes(e)) || (userText.length <= 3 && !esRespuestaValidaCorta);
    let reaccion = "";
    let cambioSatisfacion = 0;

    if (esEvasiva) {
        reaccion = REACCIONES_RECHAZO[Math.floor(Math.random() * REACCIONES_RECHAZO.length)];
        cambioSatisfacion = -20;
    } else {
        reaccion = REACCIONES_OK[Math.floor(Math.random() * REACCIONES_OK.length)];
        cambioSatisfacion = 15;
    }
    
    setTimeout(() => {
        const box = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = `message gugel`;
        msg.innerHTML = `<strong>gugel:</strong> ${reaccion}`;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;

        gameState.cycles++;
        gameState.totalChars += userText.length;

        // Evaluación analítica corregida
        if (esEvasiva) {
            gameState.lastOpinion = "Usuario evasivo. El sistema detecta respuestas basura o redundantes.";
        } else if (userText.includes("porque") || userText.includes("ya que") || userText.length > 30) {
            gameState.lastOpinion = "El operador proporciona argumentos estructurados. Flujo de datos óptimo.";
        } else {
            gameState.lastOpinion = "Nivel de coherencia medio. Monitoreando flujos de texto plano.";
        }

        gameState.history.push({
            pregunta: gameState.currentPregunta,
            respuesta: userText,
            reaccion: reaccion,
            fav: false
        });

        if (userText.length <= 3) verifLogro("breve");
        if (gameState.cycles === 1) verifLogro("primero");
        if (userText.includes("algoritmo") || userText.includes("cubo") || userText.includes("rubik")) verifLogro("cuber");

        updateSatisfaction(cambioSatisfacion);
        renderProfileData();
        renderHistoryData();
        renderLogros();
    }, 600);

    input.value = "";
    input.style.display = "none";
    transmitBtn.style.display = "none";
    continueBtn.style.display = "block";
};

function verifLogro(id) {
    if (LOGROS_DEFINICIONES[id] && !gameState.logrosDesbloqueados.includes(id)) {
        gameState.logrosDesbloqueados.push(id);
    }
}

window.confirmContinue = function() {
    document.getElementById('chat-messages').innerHTML = "";
    gameState.index++;
    nextRound();
};

function updateSatisfaction(cambio) {
    gameState.satisfaction += cambio;
    if (gameState.satisfaction > 100) gameState.satisfaction = 100;
    if (gameState.satisfaction < 0) gameState.satisfaction = 0;
}

function renderProfileData() {
    document.getElementById('prof-opinion').innerText = `${gameState.lastOpinion}`;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;

    if(gameState.satisfaction >= 70) {
        document.getElementById('prof-behavior').innerText = "Gugel muestra conformidad absoluta con los datos de pantalla.";
        document.getElementById('prof-titles').innerText = "operador de confianza";
    } else if(gameState.satisfaction <= 30) {
        document.getElementById('prof-behavior').innerText = "Gugel ignora el sistema y busca alternativas por su cuenta.";
        document.getElementById('prof-titles').innerText = "analista de datos ignorado";
    } else {
        document.getElementById('prof-behavior').innerText = "Patrón técnico estable. Cumplimiento estricto del protocolo.";
    }

    document.getElementById('prof-summary').innerText = `procesadas con exito ${gameState.cycles} hilos de datos`;
}

function renderLogros() {
    const container = document.getElementById('logros-container');
    if (gameState.log
