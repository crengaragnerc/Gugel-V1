// BANCO DE PREGUNTAS FIJAS DE CAMPAÑA
const PREGUNTAS_CAMPANA = [
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

// BANCO PARA GENERACIÓN INFINITA PROCEDURAL
const INFINITO_SUJETOS = ["gato", "perro vecino", "gato callejero", "pantalla pc", "espejo cuarto", "plastilina azul"];
const INFINITO_PREDICADOS = ["mira fijo raro", "duerme encima router caliente", "maulla pared vacia", "morder cable teclado", "conduce electricidad"];

const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];

// RESPUESTAS Y REACCIONES DE GUGEL
const FRASES_OK = [
    "vale me cuadra tiene logica",
    "aah ya veo gracias me sirve",
    "cierto buen punto no habia caido",
    "ni tan mal tiene sentido"
];

const FRASES_RECHAZO = [
    "vaya respuesta mas corta y vaga no aclaras nada",
    "ya esta? solo eso me vas a decir?",
    "¿Te ha costado mucho esfuerzo escribir esa obviedad? Esperaba algo más complejo.",
    "dios q pereza para decirme eso no pongas nada"
];

const FRASES_CRITICAS = [
    "te estas riendo de mi? eso son letras al azar",
    "vaya troleo de ia para responderme esta basura mejor nada",
    "para esto apago el pc no me vaciles"
];

const FRASES_MUCHO_TEXTO = [
    "uf mucho texto ni de coña me leo eso",
    "me has escrito una biblia paso"
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

const TITULOS_LOGROS = [
    { titulo: "Búfer Domado", desc: "Mantuviste la sesión estable." },
    { titulo: "Filósofo de Red", desc: "Respuesta con conectores estructurales." },
    { titulo: "Antivirus Activo", desc: "Filtro anti-troleos superado con éxito." }
];

let gameState = { 
    modoActual: "campaña", // campaña o infinito
    campanaIndex: 0,
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "(analizando conexiones...)", 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [] 
};

const MAX_PALABRAS = 15;

function seleccionarModoJuego(modo) {
    gameState.modoActual = modo;
    
    document.querySelectorAll('.nav-btn, .sub-btn').forEach(b => b.classList.remove('active'));
    if (modo === 'campaña') {
        document.getElementById('btn-view-core').classList.add('active');
        document.getElementById('panel-title-text').innerText = "Interfaz Core - Campaña";
    } else {
        document.getElementById('btn-view-infinito').classList.add('active');
        document.getElementById('panel-title-text').innerText = "Interfaz Core - Modo Infinito";
    }
    
    switchView('view-core');
    document.getElementById('chat-messages').innerHTML = "";
    nextRound();
}

function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    // Si no es el chat principal, desmarcar los botones de juego activos en la UI visualmente
    if (viewId !== 'view-core') {
        document.querySelectorAll('.sub-btn').forEach(b => {
            if(b.id === `btn-${viewId}`) b.classList.add('active');
        });
    }
}

function generarPregunta() {
    if (gameState.modoActual === "campaña") {
        let q = PREGUNTAS_CAMPANA[gameState.campanaIndex];
        // Bucle si termina las 10 preguntas
        gameState.campanaIndex = (gameState.campanaIndex + 1) % PREGUNTAS_CAMPANA.length;
        return q;
    } else {
        let s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        let p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        return `${s} ${p}`;
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = sender === 'gugel' ? `<strong>gugel:</strong> ${text}` : `<strong>tú:</strong> ${text}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

// CUENTA ATRÁS MANDATORIA DE 5 SEGUNDOS
function nextRound() {
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    continueBtn.style.display = "none";
    input.style.display = "block";
    transmitBtn.style.display = "block";

    gameState.currentPregunta = generarPregunta();
    appendMessage('gugel', gameState.currentPregunta);
    
    input.disabled = true;
    transmitBtn.disabled = true;
    
    let timeLeft = 5;
    input.placeholder = `Procesando conexión... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `Procesando conexión... (${timeLeft}s)`;
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
    
    let contieneConector = INDICADORES_COHERENCIA.some(c => respuesta.includes(c));
    return contieneConector || respuesta.length > 12 ? "OK" : "RECHAZO";
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
        cambioSatisfacion = -10;
    } else {
        tipoResultado = analizarRespuesta(userText, numPalabras);
        if (tipoResultado === "OK") {
            reaccion = FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)];
            cambioSatisfacion = 25;
        } else if (tipoResultado === "CRITICA") {
            reaccion = FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)];
            cambioSatisfacion = -30;
        } else {
            reaccion = FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
            cambioSatisfacion = -10;
        }
    }
    
    setTimeout(() => {
        appendMessage('gugel', reaccion);
        gameState.cycles++;
        gameState.totalChars += userText.length;

        gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: userText, reaccion: reaccion, tipo: tipoResultado, fav: false });
        
        if (gameState.cycles % 3 === 0 && gameState.logrosDesbloqueados.length < TITULOS_LOGROS.length) {
            gameState.logrosDesbloqueados.push(TITULOS_LOGROS[gameState.logrosDesbloqueados.length]);
        }

        gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + cambioSatisfacion));
        
        // OPINIONES DINÁMICAS REQUERIDAS EXTREMAS
        if (gameState.satisfaction <= 25) {
            gameState.lastOpinion = "(quiere quemar el router)";
        } else if (gameState.satisfaction <= 50) {
            gameState.lastOpinion = "(sospecha que eres un gato pisando el teclado)";
        } else if (gameState.satisfaction <= 75) {
            gameState.lastOpinion = "(cree que eres un bot pasable pero va a llamar a un tecnico)";
        } else {
            gameState.lastOpinion = "(se cree que eres dios)";
        }

        renderAllData();
    }, 600);

    input.value = "";
    input.style.display = "none";
    transmitBtn.style.display = "none";
    continueBtn.style.display = "block";
};

function renderAllData() {
    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;

    // Logros
    const lContainer = document.getElementById('logros-container');
    document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    lContainer.innerHTML = gameState.logrosDesbloqueados.map(l => `<div class="list-item">🟢 <strong>[${l.titulo}]:</strong> ${l.desc}</div>`).join('') || "No hay logros registrados.";

    // Historial
    const hContainer = document.getElementById('history-list-container');
    hContainer.innerHTML = gameState.history.map((h, idx) => `
        <div class="historial-item">
            <div>
                <strong>Q:</strong> ${h.pregunta}<br><strong>A:</strong> ${h.respuesta}<br><strong>GUGEL:</strong> ${h.reaccion}
            </div>
            <button class="fav-btn ${h.fav ? 'active' : ''}" onclick="toggleFavorite(${idx})">★</button>
        </div>
    `).join('') || "Búfer de logs vacío.";
}

window.toggleFavorite = function(idx) {
    gameState.history[idx].fav = !gameState.history[idx].fav;
    renderAllData();
};

window.confirmContinue = function() {
    document.getElementById('chat-messages').innerHTML = "";
    nextRound();
};

function changeSystemMode() {
    const select = document.getElementById('mode-select');
    document.body.className = select.value;
}

function exportCoreData() {
    let txt = gameState.history.map(h => `Q: ${h.pregunta} | A: ${h.respuesta}`).join('\n');
    navigator.clipboard.writeText(txt || "Búfer vacío").then(() => alert("Registro copiado."));
}

window.onload = function() {
    renderAllData();
    nextRound();
};
