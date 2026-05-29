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
    "o sea", "es decir", "como", "esta relacionado", "visto que", "para que", "no", "los", "las"
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

// Mayoría de reacciones: Negativas normales (Incoherentes pero sin troleo masivo)
const FRASES_RECHAZO = [
    "qué dices, eso no tiene ni pies ni cabeza.",
    "paso, menuda respuesta más mala me has soltado.",
    "no te he entendido nada, hablas súper raro.",
    "eso no es lo que he preguntado. qué estafa.",
    "dios, qué pereza de respuesta. no me sirve.",
    "vaya mezcla de palabras más rara, no entiendo nada.",
    "creo que te has liado, eso no responde a mi duda."
];

// REACCIONES MUY NEGATIVAS: Para troleos descarados, spam de letras o respuestas vacías
const FRASES_CRITICAS = [
    "¿te estás riendo de mí? ¡eso son solo letras al azar!",
    "vaya troleo de ia. para responderme esta basura mejor no digas nada.",
    "menudo virus de buscador, vas fatal. ¡vaya insulto a mi inteligencia!",
    "¡pero si estás escribiendo caracteres rotos! qué estafa total de sistema.",
    "para esto apago el ordenador. no me vaciles."
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
    satisfaction: 50, 
    cycles: 0,
    totalChars: 0,
    lastOpinion: "analizando al bot...",
    currentPregunta: "",
    history: [],
    logrosDesbloqueados: [] 
};

const MAX_PALABRAS = 15; // Límite de palabras configurable en lugar de caracteres

function generarPreguntaAleatoria() {
    let cat = CATEGORIAS_PREGUNTAS[Math.floor(Math.random() * CATEGORIAS_PREGUNTAS.length)];
    let s = cat.sujetos[Math.floor(Math.random() * cat.sujetos.length)];
    let p = cat.predicados[Math.floor(Math.random() * cat.predicados.length)];
    return `¿por qué ${s} ${p}?`;
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

// Analizador avanzado de coherencia y detección de troleo
function analizarRespuesta(respuesta, numPalabras) {
    if (EVASIVAS.includes(respuesta)) {
        return "CRITICA"; // Evasivas burdas se consideran críticas
    }

    // Parche anti-troleo: quitamos los espacios para ver si está repitiendo letras sueltas tipo "a a a a"
    let textoSinEspacios = respuesta.replace(/\s+/g, '');
    if (/(.)\1{4,}/.test(textoSinEspacios)) {
        return "CRITICA"; // Detecta "aaaaa" y "a a a a a", falta grave
    }

    let respuestasCortasLegitimas = ["depende", "quizas", "tal vez", "posiblemente", "no sé", "no se"];
    if (respuestasCortasLegitimas.includes(respuesta)) return "OK";

    let contieneConector = INDICADORES_COHERENCIA.some(conector => respuesta.includes(conector));
    if (contieneConector) return "OK";
    
    if (respuesta.length > 12) return "OK";

    return "RECHAZO"; // Negativa normal por incoherencia simple
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
    
    // Contamos las palabras de forma exacta dividiendo por espacios reales
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
            cambioSatisfacion = -30; // Hachazo de puntos por trolear
        } else {
            reaccion = FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
            cambioSatisfacion = -10; // Negativa estándar
        }
    }
    
    setTimeout(() => {
        appendMessage('gugel', reaccion);

        gameState.cycles++;
        gameState.totalChars += userText.length;

        gameState.history.push({
            pregunta: gameState.currentPregunta,
            respuesta: userText,
            reaccion: reaccion,
            tipo: tipoResultado,
            fav: false
        });

        desbloquearLogroProcedural();
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

function updateSatisfaction(cambio) {
    gameState.satisfaction += cambio;
    if (gameState.satisfaction > 100) gameState.satisfaction = 100;
    if (gameState.satisfaction < 0) gameState.satisfaction = 0;
}

function calcularOpinionDinamica() {
    let ultimosLogs = gameState.history.slice(-3);
    
    if (ultimosLogs.length === 0) {
        gameState.lastOpinion = "(está mirando la pantalla de carga)";
        return;
    }

    let criticasSeguidas = ultimosLogs.filter(l => l.tipo === "CRITICA").length;
    let aciertosSeguidos = ultimosLogs.filter(l => l.tipo === "OK").length;
    let muchoTextoSeguido = ultimosLogs.filter(l => l.tipo === "MUCHO_TEXTO").length;

    if (muchoTextoSeguido >= 2) {
        gameState.lastOpinion = "(cree que eres un virus de spam o un pesado)";
        return;
    }
    if (criticasSeguidas >= 1) {
        gameState.lastOpinion = "(está a punto de reportar el buscador y apagar el pc)";
        return;
    }
    if (aciertosSeguidos === 3) {
        gameState.lastOpinion = "(cree que eres un dios de la red y te recomendará en un foro)";
        return;
    }

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
        
        let colorTag = "#00ff00";
        if (item.tipo === "CRITICA") colorTag = "#ff0033";
        if (item.tipo === "MUCHO_TEXTO" || item.tipo === "RECHAZO") colorTag = "#ff9900";

        div.innerHTML = `
            <div>
                <strong>log #${idx + 1}:</strong> ${item.pregunta} <br>
                <strong>tú (ia):</strong> ${item.respuesta} <br>
                <strong style="color:${colorTag};">gugel (humano):</strong> ${item.reaccion}
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
        textoVolcado += `LOG #${i + 1}\nPREGUNTA: ${h.pregunta}\nRESPUESTA: ${h.respuesta}\nREACCIÓN: ${h.reaccion}\nTIPO LOG: ${h.tipo}\nFAVORITO: ${h.fav ? "SÍ" : "NO"}\n-------------------\n`;
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
