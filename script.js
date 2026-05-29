// ... (Mantén las constantes PREGUNTAS_BASE, PLANTILLAS_COHERENTES, etc. igual que antes) ...

let gameState = { 
    index: 0, 
    modoLibre: false, // <-- NUEVO: flag para desbloquear infinito
    satisfaction: 50,
    cycles: 0,
    totalChars: 0,
    lastOpinion: "",
    currentPregunta: "",
    preguntasMostradas: new Set(),
    history: [],
    logrosDesbloqueados: [] 
};

// ... (Mantén las funciones de calificación y generación como estaban) ...

function nextRound() {
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    continueBtn.style.display = "none";
    transmitBtn.style.display = "block";
    input.style.display = "block";

    // Lógica de salto: si modoLibre o index superó la base, generamos infinito
    if (gameState.modoLibre || gameState.index >= PREGUNTAS_BASE.length) {
        gameState.currentPregunta = generarPreguntaInfinitaCoherente();
    } else {
        gameState.currentPregunta = PREGUNTAS_BASE[gameState.index];
    }
    
    appendMessage('gugel', gameState.currentPregunta);
    // ... (resto del timer igual)
}

// NUEVA FUNCIÓN: Salto directo
window.saltarANivelInfinito = function() {
    gameState.modoLibre = true;
    gameState.index = PREGUNTAS_BASE.length;
    document.getElementById('chat-messages').innerHTML = "";
    nextRound();
    renderProfileData();
    alert("Acceso al núcleo infinito concedido.");
};

function renderProfileData() {
    document.getElementById('prof-opinion').innerText = `${gameState.lastOpinion}`;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = gameState.cycles;

    const levelBox = document.getElementById('prof-titles');
    if (gameState.modoLibre || gameState.index >= PREGUNTAS_BASE.length) {
        levelBox.innerText = "MODO_INFINITO_DESBLOQUEADO";
        levelBox.style.color = "#00ff00";
    } else {
        levelBox.innerText = `NIVEL_BASE_${gameState.index + 1}_DE_9`;
        levelBox.style.color = "#ffaa00";
    }
}
