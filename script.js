// Bancos de preguntas categorizados para mantener la coherencia temática
const CATEGORIAS_PREGUNTAS = [
    {
        sujetos: ["mi gato", "el perro de mi vecino", "un gato callejero"],
        predicados: ["me mira fijamente cuando duermo", "duerme encima del router caliente", "maúlla a la pared vacía", "intenta morder el cable del teclado"]
    },
    {
        sujetos: ["el agua del grifo", "una patata frita", "la plastilina azul"],
        predicados: ["tiene a veces sabor a metal", "conduce la electricidad", "cambia de color si la dejas al sol"]
    },
    {
        sujetos: ["la pantalla de mi ordenador", "el espejo de mi cuarto", "un robot de internet"],
        predicados: ["se mueve un poco cuando no la miro", "puede saltarse un captcha de seguridad", "escribe solo si se llena de polvo"]
    }
];

const INDICADORES_COHERENCIA = [
    "porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", 
    "es por", "causa", "efecto", "consecuencia", "depende de", "si pasa", "cuando",
    "o sea", "es decir", "como", "esta relacionado", "visto que", "para que"
];

const FRASES_OK = [
    "vale, me cuadra. tiene lógica.",
    "aah, ya veo. gracias, me sirve.",
    "cierto, no había caído en eso. buen punto.",
    "pues me has salvado la tarde, la verdad.",
    "vale, me quedo más tranquilo con esto.",
    "ni tan mal, tiene sentido.",
    "ah, pues sí. gracias por aclararlo."
];

const FRASES_RECHAZO = [
    "qué dices, eso no tiene ni pies ni cabeza.",
    "paso, menuda respuesta más mala me has soltado.",
    "¿te estás riendo de mí? eso no ayuda en nada.",
    "vaya pérdida de tiempo. busco en otro lado.",
    "no te he entendido nada, hablas súper raro.",
    "eso no es lo que he preguntado. qué estafa.",
    "dios, qué pereza de respuesta. no me sirve."
];

const FRASES_MUCHO_TEXTO = [
    "uf, mucho texto. ni de coña me leo eso.",
    "¿me has escrito una biblia? paso.",
    "qué pereza, parece un examen de historia.",
    "menudo testamento, resúmelo o algo."
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "porquesea", "jaja", "ño", "sí", "si", "no"];

const TITULOS_LOGROS = [
    { titulo: "búfer domado", desc: "has conseguido mantener una conversación sin que explote el sistema." },
    { titulo: "filósofo de internet", desc: "has respondido con un texto argumentado y conectores de lógica." },
    { titulo: "antivirus humano", desc: "has salvado a gugel de un colapso por respuestas basura." },
    { titulo: "velocista del teclado", desc: "has introducido suficientes caracteres para llenar un registro." },
    { titulo: "paciente cero", desc: "has aguantado los peores cambios de humor del motor." },
    { titulo: "maestro de los cubos", desc: "gugel sospecha que resuelves acertijos mientras respondes." },
    { titulo: "domador de gatos", desc: "has resuelto una duda existencial sobre felinos y tecnología." }
];

let gameState = { 
    index: 0, 
    satisfaction: 50, // Empezamos en un 50% neutral y justo
    cycles: 0,
    totalChars: 0,
    lastOpinion: "analizando al bot...",
    currentPregunta: "",
    history: [],
    logrosDesbloqueados: [] 
};

function generarPreguntaAleatoria() {
    let cat = CATEGORIAS_PREGUNTAS[Math.floor(Math.random() * CATEGORIAS_PREGUNTAS.length)];
    let s = cat.sujetos[Math.floor(Math.random() * cat.sujetos.length)];
    let p = cat.predicados[Math.floor(Math.random() * cat.predicados.length)];
    return `¿por qué ${s} ${p}?`;
}

function generarReaccionCoherente(esCorrecto, esMuchoTexto) {
    if (esMuchoTexto) return FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)];
    return esCorrecto ? FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)] : FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
}

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
    const cleanText = text.toLowerCase();
    
    if (sender === 'gugel') {
        msg.innerHTML = `<strong>gugel (humano):</strong> ${cleanText}`;
    } else {
        msg.innerHTML = `<strong>tú (ia):</strong> ${cleanText}`;
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

    gameState.currentPregunta = generarPreguntaAleatoria();
    appendMessage('gugel', gameState.currentPregunta);
    
    input.disabled = true; 
    transmitBtn.disabled = true;
    
    let timeLeft = 3;
    input.placeholder = `gugel escribiendo... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `gugel escribiendo... (${timeLeft}s)`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = false; 
            transmitBtn.disabled = false;
            input.placeholder = "introduce tu respuesta de ia...";
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
    let idx = gameState.cycles % TITULOS_LOGROS.length;
    let logroData = TITULOS_LOGROS[idx];
    let existe = gameState.logrosDesbloqueados.some(l => l.titulo === logroData.titulo);
    if (!existe) gameState.logrosDesbloqueados.push(logroData);
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
    
    // BALANCEO MEJORADO: +20 por acierto, -15 por fallo. ¡Mucho más justo!
    let cambioSatisfacion = esCoherente ? 20 : -15; 
    
    setTimeout(() => {
        appendMessage('gugel', reaccion);

        gameState.cycles++;
        gameState.totalChars += userText.length;

        gameState.history.push({
            pregunta: gameState.currentPregunta,
            respuesta: userText,
            reaccion: reaccion,
            esMuchoTexto: esMuchoTexto,
            esCoherente: esCoherente,
            fav: false
        });

        desbloquearLogroProcedural();
        updateSatisfaction(cambioSatisfacion);
        calcularOpinionDinamica(); // Lógica de personalidad avanzada
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

// Nueva lógica que analiza las últimas interacciones para dar opiniones brutales
function calcularOpinionDinamica() {
    let ultimosLogs = gameState.history.slice(-3); // Miramos los últimos 3 chats
    
    if (ultimosLogs.length === 0) {
        gameState.lastOpinion = "(está mirando la pantalla de carga)";
        return;
    }

    let fallosSeguidos = ultimosLogs.filter(l => !l.esCoherente).length;
    let aciertosSeguidos = ultimosLogs.filter(l => l.esCoherente && !l.esMuchoTexto).length;
    let muchoTextoSeguido = ultimosLogs.filter(l => l.esMuchoTexto).length;

    // Prioridad por comportamientos del jugador
    if (muchoTextoSeguido >= 2) {
        gameState.lastOpinion = "(cree que eres un virus de spam o un pesado)";
        return;
    }
    if (fallosSeguidos === 3) {
        gameState.lastOpinion = "(quiere quemar el router y darse de baja de internet)";
        return;
    }
    if (aciertosSeguidos === 3) {
        gameState.lastOpinion = "(cree que eres un dios de la red y te recomendará en un foro)";
        return;
    }

    // Si es mixto, decide según rangos de satisfacción con más variedad
    if (gameState.satisfaction <= 25) {
        gameState.lastOpinion = "(piensa que esta IA la ha programado un gato ebrio)";
    } else if (gameState.satisfaction > 25 && gameState.satisfaction <= 50) {
        gameState.lastOpinion = "(te juzga en silencio mientras limpia el polvo de la pantalla)";
    } else if (gameState.satisfaction > 50 && gameState.satisfaction <= 75) {
        gameState.lastOpinion = "(sospecha que eres útil pero te cambiaría por un cubo de Rubik)";
    } else {
        gameState.lastOpinion = "(piensa que eres su mejor amigo cibernético)";
    }
}

function renderProfileData() {
    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;
    document.getElementById('prof-summary').innerText = `procesadas con éxito ${gameState.cycles} consultas`;
}

function renderLogros() {
    const container = document.getElementById('logros-container');
    document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    
    if (gameState.logrosDesbloqueados.length === 0) {
        container.innerHTML = `<div style="color: #444; font-style: italic;">[sistema oculto] los logros resueltos aparecerán aquí cuando investigues de verdad</div>`;
        return;
    }

    container.innerHTML = "";
    gameState.logrosDesbloqueados.forEach(logro => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.style.borderColor = '#00ff00';
        div.innerHTML = `<span class="badge-unlocked">[desbloqueado]</span> <strong>[${logro.titulo}]:</strong> ${logro.desc}`;
        container.appendChild(div);
    });
}

function renderHistoryData() {
    const container = document.getElementById('history-list-container');
    if (gameState.history.length === 0) {
        container.innerHTML = `<div style="color: #444; font-style: italic;">el archivo temporal está vacío</div>`;
        return;
    }

    container.innerHTML = "";
    gameState.history.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'historial-item';
        div.innerHTML = `
            <div>
                <strong>log #${idx + 1}:</strong> ${item.pregunta} <br>
                <strong>tú (ia):</strong> ${item.respuesta} <br>
                <strong style="color:#00ff00;">gugel (humano):</strong> ${item.reaccion}
            </div>
            <button class="fav-btn ${item.fav ? 'active' : ''}" onclick="toggleFavorite(${idx})">★</button>
        `;
        container.appendChild(div);
    });

    const favs = gameState.history.filter(h => h.fav);
    const favStatus = document.getElementById('fav-status');
    favStatus.innerText = favs.length > 0 
        ? `Tienes ${favs.length} transmisión(es) prioritarias en el búfer.` 
        : "Ninguna transmisión marcada como prioritaria.";
}

window.toggleFavorite = function(idx) {
    gameState.history[idx].fav = !gameState.history[idx].fav;
    renderHistoryData();
};

function exportCoreData() {
    if(gameState.history.length === 0) {
        alert("Error: Historial vacío. No hay datos para transmitir.");
        return;
    }
    
    let textoVolcado = `=== REGISTRO DE TRÁFICO GUGEL (Total: ${gameState.history.length} logs) ===\n\n`;
    gameState.history.forEach((h, i) => {
        textoVolcado += `LOG #${i + 1}\nPREGUNTA: ${h.pregunta}\nRESPUESTA: ${h.respuesta}\nREACCIÓN: ${h.reaccion}\nFAVORITO: ${h.fav ? "SÍ" : "NO"}\n-------------------\n`;
    });
    
    navigator.clipboard.writeText(textoVolcado).then(() => {
        alert("Éxito: " + gameState.history.length + " logs copiados al portapapeles.");
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
    calcularOpinionDinamica();
    renderProfileData();
    renderHistoryData();
    renderLogros();
    nextRound();
};
