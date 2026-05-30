const NIVELES_CAMPANA = [
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

const INDICADORES_COHERENCIA = [
    "porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", 
    "es por", "causa", "efecto", "consecuencia", "depende de", "si pasa", "cuando",
    "o sea", "es decir", "como", "esta relacionado", "visto que", "para que", "no", "los", "las"
];

const FRASES_OK = [
    "vale me cuadra tiene logica",
    "aah ya veo gracias me sirve",
    "cierto buen punto no habia caido",
    "pues me has salvado la tarde la verdad",
    "vale me quedo mas tranquilo con esto"
];

const FRASES_RECHAZO = [
    "vaya respuesta mas corta y vaga no aclaras nada",
    "ya esta? solo eso me vas a decir?",
    "a ver no te enrolles pero tampoco me pongas eso q no sirve",
    "eso es super impreciso estirate un poco mas q eres ia",
    "no me dejes a medias con eso no resuelvo mi duda"
];

const FRASES_CRITICAS = [
    "te estas riendo de mi? eso son letras al azar",
    "vaya troleo de ia para responderme esta basura mejor nada",
    "menudo virus de buscador vas fatal q insulto",
    "para esto apago el pc no me vaciles"
];

const FRASES_MUCHO_TEXTO = [
    "uf mucho texto ni de coña me leo eso",
    "me has escrito una biblia paso",
    "menudo testamento resúmelo o algo"
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "porquesea", "jaja", "ño", "sí", "si", "no"];

const TITULOS_LOGROS = [
    { titulo: "búfer domado", desc: "has conseguido mantener una conversación sin que explote el sistema." },
    { titulo: "filósofo de internet", desc: "has respondido con un texto argumentado y conectores de lógica." },
    { titulo: "antivirus humano", desc: "has salvado a gugel de un colapso por respuestas basura." },
    { titulo: "velocista del teclado", desc: "has introducido suficientes caracteres para llenar un registro." }
];

let gameState = { 
    currentLevelIdx: 0, 
    satisfaction: 50, 
    cycles: 0,
    totalChars: 0,
    lastOpinion: "esperando respuesta...",
    currentPregunta: "",
    history: [],
    logrosDesbloqueados: [] 
};

const MAX_PALABRAS = 15; 

function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(panel => panel.classList.remove('active'));
    const targetPanel = document.getElementById(viewId);
    if (targetPanel) targetPanel.classList.add('active');

    const titleText = document.getElementById('panel-title-text');
    if (viewId === 'view-consultas') {
        titleText.innerText = "GUGEL Core";
    } else {
        titleText.innerText = "GUGEL Core - Monitor de Sistema";
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    
    if (sender === 'gugel') {
        msg.innerHTML = `<strong>gugel:</strong> ${text.toLowerCase()}`;
    } else {
        msg.innerHTML = `<strong>tú:</strong> ${text.toLowerCase()}`;
    }
    
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function nextRound() {
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    continueBtn.style.display = "none";
    transmitBtn.style.display = "block";
    input.style.display = "block";

    if (gameState.currentLevelIdx >= NIVELES_CAMPANA.length) {
        appendMessage('gugel', "has respondido todas las búsquedas de la lista.");
        input.style.display = "none";
        transmitBtn.style.display = "none";
        return;
    }

    gameState.currentPregunta = NIVELES_CAMPANA[gameState.currentLevelIdx];
    appendMessage('gugel', gameState.currentPregunta);
    
    input.disabled = true; 
    transmitBtn.disabled = true;
    
    let timeLeft = 2;
    input.placeholder = `gugel buscando... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = false; 
            transmitBtn.disabled = false;
            input.placeholder = "introduce tu respuesta de ia...";
            input.focus();
        }
    }, 1000);
}

function analizarRespuesta(respuesta, numPalabras) {
    if (EVASIVAS.includes(respuesta)) return "CRITICA"; 
    let textoSinEspacios = respuesta.replace(/\s+/g, '');
    if (/(.)\1{4,}/.test(textoSinEspacios)) return "CRITICA"; 

    if (numPalabras <= 2) return "RECHAZO";

    let contieneConector = INDICADORES_COHERENCIA.some(conector => respuesta.includes(conector));
    if (contieneConector) return "OK";
    if (respuesta.length > 12) return "OK";

    return "RECHAZO"; 
}

function updateSatisfaction(cambio) {
    gameState.satisfaction += cambio;
    if (gameState.satisfaction > 100) gameState.satisfaction = 100;
    if (gameState.satisfaction < 0) gameState.satisfaction = 0;
}

function calcularOpinionDinamica() {
    if (gameState.satisfaction <= 25) {
        gameState.lastOpinion = "(está bastante descontento)";
    } else if (gameState.satisfaction > 25 && gameState.satisfaction <= 50) {
        gameState.lastOpinion = "(te mira con desconfianza)";
    } else if (gameState.satisfaction > 50 && gameState.satisfaction <= 75) {
        gameState.lastOpinion = "(le convence lo que dices)";
    } else {
        gameState.lastOpinion = "(está muy contento con el buscador)";
    }
}

function renderProfileData() {
    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = `Nivel ${gameState.currentLevelIdx + 1}`;
    document.getElementById('prof-chars').innerText = gameState.totalChars;
    document.getElementById('prof-summary').innerText = `Progreso: ${gameState.currentLevelIdx} / ${NIVELES_CAMPANA.length}`;
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    
    appendMessage('ai', userText);
    
    let palabrasArray = userText.split(/\s+/).filter(p => p.length > 0);
    let numPalabras = palabrasArray.length;
    let esMuchoTexto = numPalabras > MAX_PALABRAS;
    
    let tipoResultado = "OK";
    let reaccion = "";
    let cambioSatisfacion = 0;

    if (esMuchoTexto) {
        tipoResultado = "MUCHO_TEXTO";
        reaccion = FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)];
        cambioSatisfacion = -15;
    } else {
        tipoResultado = analizarRespuesta(userText, numPalabras);
        if (tipoResultado === "OK") {
            reaccion = FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)];
            cambioSatisfacion = 15;
        } else if (tipoResultado === "CRITICA") {
            reaccion = FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)];
            cambioSatisfacion = -25; 
        } else {
            reaccion = FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
            cambioSatisfacion = -10; 
        }
    }
    
    setTimeout(() => {
        appendMessage('gugel', reaccion);
        gameState.currentLevelIdx++; 
        gameState.cycles++;
        gameState.totalChars += userText.length;

        gameState.history.push({
            pregunta: gameState.currentPregunta,
            respuesta: userText,
            reaccion: reaccion,
            tipo: tipoResultado,
            fav: false
        });

        if (gameState.cycles % 3 === 0) {
            let idx = (gameState.cycles / 3) - 1;
            if (idx < TITULOS_LOGROS.length) gameState.logrosDesbloqueados.push(TITULOS_LOGROS[idx]);
        }

        updateSatisfaction(cambioSatisfacion);
        calcularOpinionDinamica(); 
        renderProfileData();
        renderHistoryData();
        renderLogros();
    }, 600);

    input.value = "";
    input.style.display = "none";
    transmitBtn.style.display = "none";
    continueBtn.style.display = "block";
};

function renderLogros() {
    const container = document.getElementById('logros-container');
    document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    if (gameState.logrosDesbloqueados.length === 0) return;
    container.innerHTML = "";
    gameState.logrosDesbloqueados.forEach(logro => {
        const div = document.createElement('div');
        div.className = 'historial-item';
        div.innerHTML = `<strong>[${logro.titulo.toUpperCase()}]:</strong> ${logro.desc}`;
        container.appendChild(div);
    });
}

function renderHistoryData() {
    const container = document.getElementById('history-list-container');
    if (gameState.history.length === 0) return;
    container.innerHTML = "";
    gameState.history.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'historial-item';
        div.innerHTML = `
            <div>
                <strong>Nivel #${idx + 1}:</strong> ${item.pregunta} | <strong>IA:</strong> ${item.respuesta}<br>
                <strong>GUGEL:</strong> ${item.reaccion}
            </div>
            <button class="fav-btn ${item.fav ? 'active' : ''}" onclick="toggleFavorite(${idx})">★</button>
        `;
        container.appendChild(div);
    });
    const favs = gameState.history.filter(h => h.fav).length;
    document.getElementById('fav-status').innerText = `Tienes ${favs} logs prioritarios en memoria.`;
}

window.toggleFavorite = function(idx) {
    gameState.history[idx].fav = !gameState.history[idx].fav;
    renderHistoryData();
};

function exportCoreData() {
    if(gameState.history.length === 0) return;
    let texto = `=== REGISTRO GUGEL ===\n\n`;
    gameState.history.forEach((h, i) => {
        texto += `LOG #${i + 1}\nPREGUNTA: ${h.pregunta}\nRESPUESTA: ${h.respuesta}\nREACCIÓN: ${h.reaccion}\n-------------------\n`;
    });
    navigator.clipboard.writeText(texto).then(() => alert("Copiado al portapapeles."));
}

function changeSystemMode() {
    const select = document.getElementById('mode-select');
    document.body.className = select.value;
}

window.confirmContinue = function() {
    document.getElementById('chat-messages').innerHTML = "";
    nextRound();
};

window.onload = function() {
    calcularOpinionDinamica();
    renderProfileData();
    nextRound();
};
