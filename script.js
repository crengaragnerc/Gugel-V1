/** * GUGEL Core - Versión Extendida
 * Módulo: Gestión de estado, persistencia y análisis semántico
 */

const PREGUNTAS_BASE = [
    "cagar verde normal", "agua porque moja", "duele la cabeza al pensar",
    "como saber si soy un robot test gratis", "por que los patos no se hunden",
    "se puede vivir con un gato me mira fijamente", "que significa soñar con gato me mira fijamente",
    "que pasa si como teclado escribe solo", "porque el agua tiene sabor a metal"
];

const EVASIVAS = ["porque si", "no se", "jaja", "ño", "nose"];
const LOGROS_LISTA = [
    { id: 1, titulo: "Primeros Pasos", desc: "Has completado la primera consulta." },
    { id: 2, titulo: "Analista Nivel 1", desc: "5 ciclos completados." },
    { id: 3, titulo: "Hacker Profesional", desc: "Has accedido a los niveles profundos." }
];

let gameState = JSON.parse(localStorage.getItem('gugelState')) || { 
    index: 0, modoLibre: false, satisfaction: 50, cycles: 0, totalChars: 0, history: [], logros: [] 
};

// Motor de Calificación Semántica
function calificarRespuesta(texto) {
    let t = texto.toLowerCase();
    let m = { humor: 0, coherencia: 0, vibraIA: 0, evasiva: false };
    
    if (t.length > 25) m.coherencia = 100;
    if (t.includes("jaja") || t.includes("trola")) m.humor = 100;
    if (t.includes("ia") || t.includes("sistema")) m.vibraIA = 100;
    if (EVASIVAS.some(e => t.includes(e))) m.evasiva = true;
    
    console.log("Análisis semántico ejecutado:", m);
    return m;
}

// Motor de Reacciones de Sistema
function generarReaccion(m) {
    if (m.evasiva) return "otra vez con evasivas... ¿te cuesta tanto pensar?";
    if (m.vibraIA > 50) return "suenas como una máquina barata. prueba a ser humano.";
    if (m.humor > 50) return "jaja, muy gracioso. sigamos.";
    
    const reaccionesNeutras = [
        "interesante. anótalo en el registro.",
        "bueno, alguien tenía que decirlo.",
        "procedo a ignorar lo irrelevante de tu comentario.",
        "anotado. espero que la siguiente valga más la pena."
    ];
    return reaccionesNeutras[Math.floor(Math.random() * reaccionesNeutras.length)];
}

// Lógica de Ciclo Principal
function nextRound() {
    const box = document.getElementById('chat-messages');
    let p = (gameState.modoLibre || gameState.index >= PREGUNTAS_BASE.length) 
            ? "pregunta proc: " + Math.random().toString(36).substring(7) 
            : PREGUNTAS_BASE[gameState.index];
    box.innerHTML += `<div class="message gugel"><strong>gugel:</strong> ${p}</div>`;
    console.log("Siguiente hilo: " + p);
}

// Evento de Envío de Respuesta
document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    let text = document.getElementById('user-input').value;
    let m = calificarRespuesta(text);
    let reaccion = generarReaccion(m);
    
    gameState.cycles++;
    gameState.totalChars += text.length;
    // Lógica de satisfacción ajustada manualmente
    gameState.satisfaction += (m.evasiva ? -10 : (m.coherencia > 50 ? 5 : -5));
    gameState.history.push({ index: gameState.index, respuesta: text, metrics: m });
    
    document.getElementById('chat-messages').innerHTML += `<div class="message ai"><strong>tú:</strong> ${text} <small>[H:${m.humor}% C:${m.coherencia}% V:${m.vibraIA}% E:${m.evasiva}]</small></div>`;
    document.getElementById('chat-messages').innerHTML += `<div class="message gugel"><strong>gugel:</strong> ${reaccion}</div>`;
    
    // Verificación de Logros
    if (gameState.cycles > 0 && gameState.cycles % 5 === 0) {
        let logro = LOGROS_LISTA[(gameState.cycles/5 - 1) % LOGROS_LISTA.length];
        if (!gameState.logros.find(l => l.id === logro.id)) {
            gameState.logros.push(logro);
            document.getElementById('logros-count').innerText = gameState.logros.length;
            document.getElementById('logros-container').innerHTML += `<div class="badge-unlocked">${logro.titulo}</div>`;
        }
    }
    
    saveState();
    actualizarInterfaz();
    document.getElementById('transmit-btn').style.display = "none";
    document.getElementById('continue-btn').style.display = "block";
};

// Persistencia y Utilidades
function saveState() { localStorage.setItem('gugelState', JSON.stringify(gameState)); }

function actualizarInterfaz() {
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;
    document.getElementById('prof-satisfaction').innerText = gameState.satisfaction + "%";
    document.getElementById('prof-opinion').innerText = gameState.satisfaction > 50 ? "Estable" : "Sospechoso";
    renderHistoryData();
}

window.confirmContinue = function() {
    gameState.index++;
    renderProfileData();
    nextRound();
    document.getElementById('continue-btn').style.display = "none";
    document.getElementById('transmit-btn').style.display = "block";
    document.getElementById('user-input').value = "";
    saveState();
};

window.saltarANivelInfinito = function() {
    gameState.modoLibre = true;
    renderProfileData();
    nextRound();
    saveState();
};

function renderProfileData() {
    document.getElementById('prof-titles').innerText = (gameState.modoLibre || gameState.index >= PREGUNTAS_BASE.length) ? "MODO_INFINITO" : `NIVEL ${gameState.index + 1}/9`;
}

function renderHistoryData() {
    document.getElementById('history-list-container').innerHTML = gameState.history.map(h => `<div class="historial-item">Log #${h.index}: ${h.respuesta.substring(0, 15)}...</div>`).join('');
}

function changeSystemMode() { 
    document.body.className = document.getElementById('mode-select').value;
    localStorage.setItem('gugelMode', document.getElementById('mode-select').value);
}

function exportCoreData() {
    console.log("--- VOLCADO COMPLETO DEL NÚCLEO ---");
    console.table(gameState);
    alert("Datos volcados en consola.");
}

function clearSystem() { localStorage.clear(); location.reload(); }

window.onload = () => {
    let mode = localStorage.getItem('gugelMode') || 'default';
    document.body.className = mode;
    document.getElementById('mode-select').value = mode;
    renderProfileData();
    actualizarInterfaz();
    nextRound();
};
