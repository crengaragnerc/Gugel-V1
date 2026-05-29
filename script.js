/**
 * GUGEL Core - Versión Esencial Estable
 */

const PREGUNTAS_BASE = [
    "cagar verde normal", "agua porque moja", "duele la cabeza al pensar",
    "como saber si soy un robot test gratis", "por que los patos no se hunden",
    "se puede vivir con un gato me mira fijamente", "que significa soñar con gato me mira fijamente",
    "que pasa si como teclado escribe solo", "porque el agua tiene sabor a metal"
];

let gameState = JSON.parse(localStorage.getItem('gugelState')) || { 
    index: 0, satisfaction: 50, cycles: 0, totalChars: 0, history: [] 
};
function generarReaccion(texto) {
    const t = texto.toLowerCase();
    const evasivas = ["porque si", "no se", "jaja", "ño", "nose"];
    
    // Si detecta evasivas o intentos de ser gracioso, GUGEL corta el rollo
    if (evasivas.some(e => t.includes(e))) return "qué aburrido eres.";
    if (t.includes("ia") || t.includes("sistema")) return "no intentes analizarme, humano.";
    if (t.includes("jaja") || t.includes("trola")) return "no tiene ninguna gracia.";
    
    // Aquí está la esencia pura de GUGEL (sin registros, sin secretarios)
    const respuestas = [
        "¿y eso es todo lo que tienes que decir?",
        "qué decepción de respuesta.",
        "ni fu ni fa. siguiente.",
        "podrías haberte esforzado un poco más.",
        "paso de tu cara.",
        "bueno... al menos has respondido."
    ];
    return respuestas[Math.floor(Math.random() * respuestas.length)];
}
    const reaccionesNeutras = [
        "interesante. anótalo en el registro.",
        "bueno, alguien tenía que decirlo.",
        "procedo a ignorar lo irrelevante de tu comentario.",
        "anotado. espero que la siguiente valga más la pena."
    ];
    return reaccionesNeutras[Math.floor(Math.random() * reaccionesNeutras.length)];
}

function nextRound() {
    const box = document.getElementById('chat-messages');
    let p = PREGUNTAS_BASE[gameState.index] || "pregunta proc: " + Math.random().toString(36).substring(7);
    box.innerHTML += `<div class="message gugel"><strong>gugel:</strong> ${p}</div>`;
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    let text = document.getElementById('user-input').value;
    let reaccion = generarReaccion(text);
    
    gameState.cycles++;
    gameState.totalChars += text.length;
    gameState.history.push({ index: gameState.index, respuesta: text });
    
    document.getElementById('chat-messages').innerHTML += `<div class="message ai"><strong>tú:</strong> ${text}</div>`;
    document.getElementById('chat-messages').innerHTML += `<div class="message gugel"><strong>gugel:</strong> ${reaccion}</div>`;
    
    saveState();
    actualizarInterfaz();
    document.getElementById('transmit-btn').style.display = "none";
    document.getElementById('continue-btn').style.display = "block";
};

function saveState() { localStorage.setItem('gugelState', JSON.stringify(gameState)); }

function actualizarInterfaz() {
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;
    renderHistoryData();
}

window.confirmContinue = function() {
    gameState.index++;
    nextRound();
    document.getElementById('continue-btn').style.display = "none";
    document.getElementById('transmit-btn').style.display = "block";
    document.getElementById('user-input').value = "";
    saveState();
};

function renderHistoryData() {
    document.getElementById('history-list-container').innerHTML = gameState.history.map(h => 
        `<div class="historial-item">Log #${h.index}: ${h.respuesta.substring(0, 15)}...</div>`
    ).join('');
}

function clearSystem() { localStorage.clear(); location.reload(); }

window.onload = () => {
    actualizarInterfaz();
    nextRound();
};
