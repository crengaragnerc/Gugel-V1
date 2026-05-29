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

// Estructuras de datos conectadas de forma lógica para evitar frases absurdas
const PLANTILLAS_COHERENTES = [
    {
        inicios: ["es normal que", "por que"],
        sujetos: ["mi gato", "el gato del vecino", "un gato callejero"],
        acciones: ["duerma encima del router", "me mire fijamente por las noches", "intente lamer los cables", "maulle sin parar al espejo", "esconda la comida debajo de la cama"]
    },
    {
        inicios: ["como saber si", "que pasa si"],
        sujetos: ["mi ordenador", "el portatil de la escuela", "el sistema operativo"],
        acciones: ["tiene un virus informatico", "va muy lento de repente", "se apaga solo al abrir el navegador", "no detecta el teclado usb", "actualiza el software sin permiso"]
    },
    {
        inicios: ["que significa soñar que", "por que noto que"],
        sujetos: ["mi cabeza", "el cuerpo", "el brazo izquierdo"],
        acciones: ["cae al vacio continuamente", "tiembla un poco al usar el raton", "duele bastante al pensar mucho", "se duerme por falta de descanso"]
    },
    {
        inicios: ["porque el", "por que el"],
        sujetos: ["agua del grifo", "agua embotellada", "liquido elemento"],
        acciones: ["tiene un sabor raro a metal", "sale de color blanco turbio", "no consigue calmar la sed", "huele de forma extraña por las mañanas"]
    }
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

const FRASES_SOSPECHA = [
    "espera... esa respuesta suena rarísima, sospecho que eres un bot intentando hackearme.",
    "no sé si creerme eso. me da que te estás inventando la mitad para salir del paso.",
    "vaya película te has montado para responder a esto, suena a trola total.",
    "mmh... no me convence nada esa explicación, tiene pinta de ser mentira.",
    "eso no te lo crees ni tú, huele a código sospecho desde aquí."
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "porquesea", "jaja", "ño", "sí", "si", "no"];

const LOGROS_FACILES = [
    { titulo: "Primeros Pasos", descripcion: "Has comenzado a responder las consultas del sistema." },
    { titulo: "Transmisión Estable", descripcion: "Has logrado mantener el nivel de satisfacción bajo control." },
    { titulo: "Hacker Novato", descripcion: "Has configurado y operado los primeros flujos de datos." },
    { titulo: "Analista de Datos", descripcion: "Superaste con éxito los primeros ciclos de preguntas de Gugel." },
    { titulo: "Conexión Segura", descripcion: "Has enviado respuestas sin activar las alertas críticas." },
    { titulo: "Control de Búfer", descripcion: "El sistema registra un almacenamiento continuo de registros." }
];

let gameState = { 
    index: 9, 
    satisfaction: 10,
    cycles: 9,
    totalChars: 124,
    lastOpinion: "",
    currentPregunta: "",
    preguntasMostradas: new Set(),
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

// Selecciona una plantilla temática coherente al azar y construye la frase
function generarPreguntaInfinitaCoherente() {
    let intentos = 0;
    let preguntaGenerada = "";
    
    while (intentos < 150) {
        // Seleccionar una categoría del pool (Gatos, Informática, Cuerpo o Agua)
        const plantilla = PLANTILLAS_COHERENTES[Math.floor(Math.random() * PLANTILLAS_COHERENTES.length)];
        
        const inicio = plantilla.inicios[Math.floor(Math.random() * plantilla.inicios.length)];
        const sujeto = plantilla.sujetos[Math.floor(Math.random() * plantilla.sujetos.length)];
        const accion = plantilla.acciones[Math.floor(Math.random() * plantilla.acciones.length)];
        
        preguntaGenerada = `${inicio} ${sujeto} ${accion}`;
        
        if (!gameState.preguntasMostradas.has(preguntaGenerada)) {
            gameState.preguntasMostradas.add(preguntaGenerada);
            return preguntaGenerada;
        }
        intentos++;
    }
    return preguntaGenerada;
}

function generarReaccionFiltros(esCorrecto, esMuchoTexto) {
    if (esMuchoTexto) {
        return { texto: FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)], sospecha: false };
    }
    if (esCorrecto) {
        if (Math.random() < 0.4) { 
            return { texto: FRASES_SOSPECHA[Math.floor(Math.random() * FRASES_SOSPECHA.length)], sospecha: true };
        }
        return { texto: FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)], sospecha: false };
    }
    return { texto: FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)], sospecha: false };
}

function actualizarOpinionDinamica() {
    let sat = gameState.satisfaction;
    if (sat <= 25) {
        gameState.lastOpinion = "¨(quiere quemar el router)¨";
    } else if (sat > 25 && sat <= 50) {
        gameState.lastOpinion = "¨(está intentando tirar el sistema con datos basura)¨";
    } else if (sat > 50 && sat <= 75) {
        gameState.lastOpinion = "¨(operador sospechoso, monitorizando inputs)¨";
    } else {
        gameState.lastOpinion = "¨(parece que sabe lo que hace, demasiado perfecto)¨";
    }
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
        gameState.currentPregunta = generarPreguntaInfinitaCoherente();
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
    let idxLogro = (gameState.cycles - 9) % LOGROS_FACILES.length;
    if (idxLogro < 0) idxLogro = 0;
    
    let logroSeleccionado = LOGROS_FACILES[idxLogro];
    
    let existe = gameState.logrosDesbloqueados.some(l => l.titulo === logroSeleccionado.titulo);
    if (!existe) {
        gameState.logrosDesbloqueados.push(logroSeleccionado);
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
    
    let resultadoReaccion = generarReaccionFiltros(esCoherente, esMuchoTexto);
    let reaccionText = resultadoReaccion.texto;
    
    let cambioSatisfacion = 0;
    if (esMuchoTexto) {
        cambioSatisfacion = -25;
    } else if (!esCoherente) {
        cambioSatisfacion = -20;
    } else if (resultadoReaccion.sospecha) {
        cambioSatisfacion = -10; 
    } else {
        cambioSatisfacion = 15;
    }
    
    setTimeout(() => {
        const box = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = `message gugel`;
        msg.innerHTML = `<strong>gugel:</strong> ${reaccionText}`;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;

        gameState.cycles++;
        gameState.totalChars += userText.length;

        updateSatisfaction(cambioSatisfacion);
        actualizarOpinionDinamica(); 

        gameState.history.push({
            pregunta: gameState.currentPregunta,
            respuesta: userText,
            reaccion: reaccionText,
            fav: false
        });

        desbloquearLogroProcedural();
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

    const behaviorBox = document.getElementById('prof-behavior');
    if (behaviorBox) {
        behaviorBox.innerText = "Registro desactivado.";
    }

    if(gameState.satisfaction >= 75) {
        document.getElementById('prof-titles').innerText = "operador_de_confianza";
        document.getElementById('prof-titles').style.color = "#00ff00";
    } else if(gameState.satisfaction <= 35) {
        document.getElementById('prof-titles').innerText = "analista_baneado";
        document.getElementById('prof-titles').style.color = "#ff0000";
    } else {
        document.getElementById('prof-titles').innerText = "usuario_en_sandbox";
        document.getElementById('prof-titles').style.color = "#ffaa00";
    }

    document.getElementById('prof-summary').innerText = `procesados con éxito ${gameState.cycles} hilos de datos`;
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
        div.innerHTML = `<span class="badge-unlocked">[desbloqueado]</span> <strong>[${logro.titulo}]:</strong> ${logro.descripcion}`;
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
        favStatus.innerText = "Ninguna transmisión marcada como prioritaria actualmente.";
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
    // Registra las base para asegurar exclusión total
    PREGUNTAS_BASE.forEach(p => gameState.preguntasMostradas.add(p));
    
    actualizarOpinionDinamica();
    renderProfileData();
    renderHistoryData();
    renderLogros();
    nextRound();
};
