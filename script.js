const PREGUNTAS_BASE = [
    "cagar verde normal", 
    "agua porque moja",
    "duele la cabeza al pensar",
    "como saber si soy un robot test gratis",
    "por que los patos no se hunden",
    "se puede vivir con un gato me mira fijamente",
    "que significa soñar con gato me mira fijamente",
    "que pasa si como teclado escribe solo",
    "porque el agua tiene sabor a metal"
];

const PREGUNTAS_INFINITAS = [
    "es normal que el gato duerma encima del router",
    "que pasa si como plastilina de color azul por error",
    "por que el cielo es azul pero de noche se vuelve negro",
    "como saber si mi ordenador tiene un virus informatico",
    "que significa soñar que caigo al vacio y no despierto",
    "se puede vivir comiendo solo patatas fritas de bolsa",
    "porque el brazo me tiembla un poco cuando uso el raton",
    "es normal que el espejo de mi habitacion se mueva",
    "como saber si un robot puede pasar un captcha de internet",
    "por que los perros corren mientras estan durmiendo",
    "que pasa si dejas el teclado conectado al reves",
    "porque el agua del grifo a veces sale de color blanco"
];

const INDICADORES_COHERENCIA = [
    "porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", 
    "es por", "causa", "efecto", "consecuencia", "depende de", "si pasa", "cuando",
    "o sea", "es decir", "como", "esta relacionado", "visto que", "para que"
];

const FRASES_OK = [
    "vale, entiendo perfectamente la explicación. tiene bastante sentido.",
    "perfecto, me sirve la información para resolver la duda que tenía.",
    "entendido, ya no me rayo más con este tema. cierro la pestaña.",
    "me cuadra lo que dices, está bien explicado y se entiende todo.",
    "menos mal, ya me aclaro con esto. queda anotado en el sistema."
];

const FRASES_RECHAZO = [
    "vaya respuesta, no me convence nada. buscaré en otra página.",
    "eso no tiene nada que ver con lo que he preguntado, qué estafa.",
    "no te he entendido absolutamente nada, hablas de forma muy rara.",
    "vaya pérdida de tiempo, no respondes a mi consulta. abro otra pestaña.",
    "menuda tontería de texto, sigo exactamente igual que antes de entrar."
];

const FRASES_MUCHO_TEXTO = [
    "mucho texto, me da pereza leer un párrafo tan largo en el buscador.",
    "alto testamento has escrito, paso de leer todo eso. cierro pestaña.",
    "fua, menudo mareo de texto. es demasiado largo para una consulta rápida."
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "porquesea", "jaja", "ño", "sí", "si", "no"];

const LOGROS_POOL = {
    prefijos: ["acceso", "protocolo", "búfer", "parámetro", "bloque", "código", "módulo", "algoritmo", "flujo", "enlace"],
    acciones: ["optimizado", "interrumpido", "forzado", "depurado", "saturado", "verificado", "degradado", "inyectado", "ignorado", "desfasado"],
    sufijos: ["global", "alfa", "núcleo", "crítico", "interno", "remoto", "máximo", "alternativo", "lineal", "seguro"]
};

let gameState = { 
    index: 9, 
    satisfaction: 10,
    cycles: 9,
    totalChars: 124,
    lastOpinion: "El operador genera cadenas de datos incoherentes o bucles de texto basura de forma sistemática.",
    currentPregunta: "",
    history: [
        { pregunta: "cagar verde normal", respuesta: "ño", reaccion: "no te entiendo nada hablas raro", fav: true },
        { pregunta: "agua porque moja", respuesta: "ño", reaccion: "no te entiendo nada hablas raro", fav: true },
        { pregunta: "duele la cabeza al pensar", respuesta: "sí", reaccion: "no me convence nada esa respuesta buscare en otro sitio", fav: false },
        { pregunta: "como saber si soy un robot test gratis", respuesta: "no sé", reaccion: "sirve ya no me rayo", fav: false },
        { pregunta: "por que los patos no se hunden", respuesta: "depende", reaccion: "bale ta cn sntido", fav: false },
        { pregunta: "se puede vivir con un gato me mira fijamente", respuesta: "no, vas a morir", reaccion: "weno ta cn sntido", fav: false },
        { pregunta: "que significa soñar con gato me mira fijamente", respuesta: "te gusta matar abuelas a a a a a a", reaccion: "sirve ya no me rayo grasias info", fav: false },
        { pregunta: "que pasa si como teclado escribe solo", respuesta: "eres un robot muy malo a a a a a", reaccion: "aa bue grasias info", fav: false },
        { pregunta: "porque los agua tiene sabor a metal", respuesta: "ñ ñ ñ ñ ñ ñ ñ ñ a a a a  a", reaccion: "me cuadra ya m aclaro", fav: false }
    ],
    logrosDesbloqueados: [] 
};

function generarReaccionCoherente(esCorrecto, esMuchoTexto) {
    if (esMuchoTexto) {
        return FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)];
    }
    const pool = esCorrecto ? FRASES_OK : FRASES_RECHAZO;
    return pool[Math.floor(Math.random() * pool.length)];
}

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
        gameState.currentPregunta = PREGUNTAS_INFINITAS[(gameState.index - PREGUNTAS_BASE.length) % PREGUNTAS_INFINITAS.length];
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

function analizarCoherenciaEstructural(respuesta) {
    let respuestasCortasLegitimas = ["depende", "quizas", "tal vez", "posiblemente"];
    if (respuestasCortasLegitimas.includes(respuesta)) return true;

    if (EVASIVAS.includes(respuesta)) return false;

    const palabras = respuesta.split(/\s+/);
    let repeticionesLetrasOClp = 0;
    palabras.forEach(p => {
        if (p === 'a' || p === 'ñ' || p === 'e' || p === 'o') repeticionesLetrasOClp++;
    });
    if (repeticionesLetrasOClp >= 3) return false;

    if (/(.)\1{3,}/.test(respuesta)) return false;

    let contieneConector = INDICADORES_COHERENCIA.some(conector => respuesta.includes(conector));
    if (contieneConector) return true;

    if (respuesta.length > 22) return true;

    return false;
}

function desbloquearLogroProcedural() {
    let baseId = (gameState.cycles * 13 + gameState.totalChars * 7 + gameState.satisfaction * 3) % 1000;
    
    let idxPref = Math.floor(baseId / 100) % 10;
    let idxAcc = Math.floor(baseId / 10) % 10;
    let idxSuf = baseId % 10;

    let titulo = `${LOGROS_POOL.prefijos[idxPref]} ${LOGROS_POOL.acciones[idxAcc]} ${LOGROS_POOL.sufijos[idxSuf]}`;
    let desc = `el sistema ha verificado un estado de tipo [${LOGROS_POOL.prefijos[idxPref]}] que ha sido [${LOGROS_POOL.acciones[idxAcc]}] bajo el entorno [${LOGROS_POOL.sufijos[idxSuf]}].`;
    
    let objetoLogro = { titulo: titulo, descripcion: desc };

    let existe = gameState.logrosDesbloqueados.some(l => l.titulo === titulo);
    if (!existe) {
        gameState.logrosDesbloqueados.push(objetoLogro);
    }
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    
    appendMessage('ai', userText);
    
    let esMuchoTexto = userText.length > 70;
    let esCoherente = esMuchoTexto ? false : analizarCoherenciaEstructural(userText);
    
    let reaccion = generarReaccionCoherente(esCoherente, esMuchoTexto);
    let cambioSatisfacion = esCoherente ? 15 : -20;
    
    setTimeout(() => {
        const box = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = `message gugel`;
        msg.innerHTML = `<strong>gugel:</strong> ${reaccion}`;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;

        gameState.cycles++;
        gameState.totalChars += userText.length;

        if (esMuchoTexto) {
            gameState.lastOpinion = "Desbordamiento de búfer. El operador transmite fragmentos de longitud excesiva.";
        } else if (!esCoherente) {
            gameState.lastOpinion = "El operador genera cadenas de datos incoherentes o bucles de texto basura de forma sistemática.";
        } else {
            gameState.lastOpinion = "El operador proporciona explicaciones funcionales estructuradas. Flujo analítico óptimo.";
        }

        gameState.history.push({
            pregunta: gameState.currentPregunta,
            respuesta: userText,
            reaccion: reaccion,
            fav: false
        });

        desbloquearLogroProcedural();

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
    document.getElementById('prof-summary').innerText = `procesadas con exito ${gameState.cycles} hilos de datos`;
}

function renderLogros() {
    const container = document.getElementById('logros-container');
    document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    
    if (gameState.logrosDesbloqueados.length === 0) {
        container.innerHTML = `<div style="color: #444; font-style: italic;">[sistema oculto] las directivas resueltas se mostrarán aquí solo cuando realices la acción requerida</div>`;
        return;
    }

    container.innerHTML = "";
    gameState.logrosDesbloqueados.forEach(logro => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.style.borderColor = '#00ff00';
        div.innerHTML = `<span class="badge-unlocked">[desbloqueado]</span> <strong>[${logro.titulo.toLowerCase()}]:</strong> ${logro.descripcion.toLowerCase()}`;
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
                <strong>consulta:</strong> ${item.pregunta} <br>
                <strong style="color:#00ff00;">respuesta:</strong> ${item.respuesta} <br>
                <strong style="color:#888;">reacción:</strong> ${item.reaccion}
            </div>
            <button class="fav-btn ${item.fav ? 'active' : ''}" onclick="toggleFavorite(${idx})">★</button>
        `;
        container.appendChild(div);
    });

    const favs = gameState.history.filter(h => h.fav);
    const favStatus = document.getElementById('fav-status');
    if (favs.length > 0) {
        favStatus.innerHTML = `Tienes ${favs.length} transmisión(es) prioritarias en el búfer.`;
    } else {
        favStatus.innerText = "Ninguna transmisión marcada como prioritaria ultravioleta.";
    }
}

window.toggleFavorite = function(idx) {
    gameState.history[idx].fav = !gameState.history[idx].fav;
    renderHistoryData();
};

function exportCoreData() {
    if(gameState.history.length === 0) {
        alert("historial vacio");
        return;
    }
    let textoVolcado = "=== registro de trafico ===\n";
    gameState.history.forEach((h, i) => {
        textoVolcado += `log ${i+1} |\n pregunta: ${h.pregunta}\n respuesta: ${h.respuesta}\n reaccion: ${h.reaccion}\n-------------------\n`;
    });
    navigator.clipboard.writeText(textoVolcado).then(() => {
        alert("registro copiado al portapapeles");
    });
}

function changeSystemMode() {
    const select = document.getElementById('mode-select');
    document.body.className = ''; 
    if (select.value !== 'modo-hacker') {
        document.body.classList.add(select.value);
    }
    renderLogros();
}

window.confirmContinue = function() {
    document.getElementById('chat-messages').innerHTML = "";
    gameState.index++;
    nextRound();
};

window.onload = function() {
    renderProfileData();
    renderHistoryData();
    renderLogros();
    nextRound();
};
