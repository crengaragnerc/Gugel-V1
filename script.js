const PREGUNTAS_BASE = ["cagar verde normal", "agua porque moja", "duele la cabeza al pensar", "como saber si soy un robot test gratis", "por que los patos no se hunden"];
const GEN_PREFIJOS = ["porque los", "como saber si mi", "es normal que el", "que pasa si como", "por que el", "que significa soñar con", "se puede vivir con un"];
const GEN_SUFIJOS = ["gato me mira fijamente", "teclado escribe solo", "agua tiene sabor a metal", "plastilina se puede comer", "brazo me tiembla un poco", "universo es infinito", "espejo se mueve", "perro duerme boca arriba"];
const REACCIONES_OK = ["ah vale me quedo mas tranquilo entonces cerrare la pestaña", "me cuadra bastante la explicacion tiene sentido", "vale entonces no me preocupo pensaba que era algo peor", "entendido menos mal que lo he buscado aqui ya me estaba rayando", "ok me sirve bastante esa respuesta", "perfecto ya entendi el problema de raiz", "bueno con eso me basta para no ir a urgencias", "tiene logica gracias por la info", "menos mal crei que me iba a morir o algo", "vale lo anoto para tenerlo en cuenta"];
const REACCIONES_RECHAZO = ["no me convence nada esa respuesta buscare en otro sitio", "vaya porqueria de buscador no me aclara nada", "eso no responde a mi pregunta que respuesta mas inutil", "para poner eso mejor no pongas nada sigo igual de rayado", "no me sirve para nada abrire otra pestaña", "que respuesta mas absurda que flojera", "eso es una tonteria no tiene ningun sentido", "vaya pérdida de tiempo me voy a otra pagina", "no te entiendo nada hablas raro", "que estafa de pagina sigo con la misma duda"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "porquesea", "jaja"];
let gameState = { index: 0, satisfaction: 50, cycles: 0, totalChars: 0, lastOpinion: "no hay consultas en la sesión actual", currentPregunta: "", history: [], logrosDesbloqueados: [] };
const LOGROS_DEFINICIONES = { "breve": "<strong>[logro revelado] respuestita:</strong> responder a gugel usando 3 caracteres o menos", "primero": "<strong>[logro revelado] primera consulta:</strong> resolver el primer hilo de datos de gugel", "visual": "<strong>[logro revelado] cambio de entorno:</strong> modificar los parámetros visuales del terminal central", "cuber": "<strong>[logro revelado] concepto avanzado:</strong> resolver un hilo de gugel inyectando términos algorítmicos o mecánicos" };

function switchView(viewId) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${viewId}`);
    if (activeBtn) activeBtn.classList.add('active');
    document.querySelectorAll('.content-panel').forEach(panel => panel.classList.remove('active'));
    const activePanel = document.getElementById(viewId);
    if (activePanel) activePanel.classList.add('active');
    document.getElementById('panel-title-text').innerText = (viewId === 'view-consultas') ? "GUGEL Core" : "GUGEL Core - Sistema de Módulos";
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = sender === 'gugel' ? `<strong>gugel:</strong> ${text.toLowerCase()}` : `<strong>tú:</strong> ${text.toLowerCase()}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function nextRound() {
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.style.display = "none"; transmitBtn.style.display = "block"; input.style.display = "block";
    gameState.currentPregunta = (gameState.index < PREGUNTAS_BASE.length) ? PREGUNTAS_BASE[gameState.index] : `${GEN_PREFIJOS[Math.floor(Math.random()*GEN_PREFIJOS.length)]} ${GEN_SUFIJOS[Math.floor(Math.random()*GEN_SUFIJOS.length)]}`;
    appendMessage('gugel', gameState.currentPregunta);
    input.disabled = true; transmitBtn.disabled = true;
    let timeLeft = 5;
    input.placeholder = `gugel buscando... (${timeLeft}s)`;
    const timer = setInterval(() => {
        timeLeft--; input.placeholder = `gugel buscando... (${timeLeft}s)`;
        if (timeLeft <= 0) { clearInterval(timer); input.disabled = false; transmitBtn.disabled = false; input.placeholder = "introduce la respuesta del motor..."; input.focus(); }
    }, 1000);
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    appendMessage('ai', userText);
    let esEvasiva = EVASIVAS.some(e => userText.includes(e)) || (userText.length <= 3 && !["no", "si", "ci", "depende"].includes(userText));
    let reaccion = esEvasiva ? REACCIONES_RECHAZO[Math.floor(Math.random()*REACCIONES_RECHAZO.length)] : REACCIONES_OK[Math.floor(Math.random()*REACCIONES_OK.length)];
    setTimeout(() => {
        appendMessage('gugel', reaccion);
        gameState.cycles++; gameState.totalChars += userText.length;
        gameState.lastOpinion = esEvasiva ? "Usuario evasivo. El sistema detecta respuestas basura o redundantes." : (userText.includes("porque") || userText.length > 30 ? "El operador proporciona argumentos estructurados. Flujo de datos óptimo." : "Nivel de coherencia medio. Monitoreando flujos de texto plano.");
        gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: userText, reaccion: reaccion, fav: false });
        if (userText.length <= 3) verifLogro("breve");
        if (gameState.cycles === 1) verifLogro("primero");
        if (userText.includes("algoritmo") || userText.includes("cubo") || userText.includes("rubik")) verifLogro("cuber");
        updateSatisfaction(esEvasiva ? -20 : 15);
        renderProfileData(); renderHistoryData(); renderLogros();
    }, 600);
    input.value = ""; input.style.display = "none"; document.getElementById('transmit-btn').style.display = "none"; document.getElementById('continue-btn').style.display = "block";
};

function verifLogro(id) { if (LOGROS_DEFINICIONES[id] && !gameState.logrosDesbloqueados.includes(id)) gameState.logrosDesbloqueados.push(id); }
window.confirmContinue = () => { document.getElementById('chat-messages').innerHTML = ""; gameState.index++; nextRound(); };
function updateSatisfaction(c) { gameState.satisfaction = Math.min(100, Math.max(0, gameState.satisfaction + c)); }
function renderProfileData() {
    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;
    document.getElementById('prof-behavior').innerText = gameState.satisfaction >= 70 ? "Gugel muestra conformidad absoluta con los datos." : (gameState.satisfaction <= 30 ? "Gugel ignora el sistema." : "Patrón técnico estable.");
    document.getElementById('prof-titles').innerText = gameState.satisfaction >= 70 ? "operador de confianza" : (gameState.satisfaction <= 30 ? "analista de datos ignorado" : "operador del sistema novato");
    document.getElementById('prof-summary').innerText = `procesadas con exito ${gameState.cycles} hilos de datos`;
}

function renderLogros() {
    const container = document.getElementById('logros-container');
    container.innerHTML = gameState.logrosDesbloqueados.length === 0 ? '<div style="color: #444; font-style: italic;">[sistema oculto] las directivas resueltas se mostrarán aquí solo cuando realices la acción requerida</div>' : "";
    gameState.logrosDesbloqueados.forEach(id => {
        const div = document.createElement('div'); div.className = 'data-item'; div.style.borderColor = '#00ff00';
        div.innerHTML = `<span class="badge-unlocked">[desbloqueado]</span> ${LOGROS_DEFINICIONES[id]}`; container.appendChild(div);
    });
}

function renderHistoryData() {
    const container = document.getElementById('history-list-container');
    container.innerHTML = "";
    gameState.history.forEach((item, idx) => {
        const div = document.createElement('div'); div.className = 'historial-item';
        div.innerHTML = `<div><strong>consulta:</strong> ${item.pregunta} <br><strong style="color:#00ff00;">respuesta:</strong> ${item.respuesta} <br><strong style="color:#888;">reacción:</strong> ${item.reaccion}</div><button class="fav-btn ${item.fav ? 'active' : ''}" onclick="toggleFavorite(${idx})">★</button>`;
        container.appendChild(div);
    });
}

window.toggleFavorite = (idx) => { gameState.history[idx].fav = !gameState.history[idx].fav; renderHistoryData(); };
function exportCoreData() {
    if(gameState.history.length === 0) return alert("historial vacio");
    let v = "=== registro de trafico ===\n";
    gameState.history.forEach((h, i) => v += `log ${i+1} |\n pregunta: ${h.pregunta}\n respuesta: ${h.respuesta}\n reaccion: ${h.reaccion}\n-------------------\n`);
    navigator.clipboard.writeText(v.toLowerCase()).then(() => alert("registro copiado al portapapeles"));
}

function changeSystemMode() {
    const select = document.getElementById('mode-select');
    document.body.className = select.value;
    verifLogro("visual"); renderLogros();
}

window.onload = nextRound;
