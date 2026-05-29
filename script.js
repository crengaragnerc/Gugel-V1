// Banco de preguntas adaptado a búsquedas reales y crudas de internet
const CATEGORIAS_PREGUNTAS = [
    {
        sujetos: ["gato", "perro vecino", "gato callejero"],
        predicados: ["mira fijo raro", "duerme encima router caliente", "maulla pared vacia", "morder cable teclado"]
    },
    {
        sujetos: ["agua grifo", "patata frita", "plastilina azul"],
        predicados: ["sabor metal porque", "conduce electricidad", "cambia color sol"]
    },
    {
        sujetos: ["pantalla ordenador", "espejo cuarto", "robot internet"],
        predicados: ["se mueve si no miro", "saltarse captcha como", "escribe solo con polvo"]
    }
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
    "vale me quedo mas tranquilo con esto",
    "ni tan mal tiene sentido",
    "ah pues si gracias por aclararlo"
];

// Reacciones flojas adaptadas a internet
const FRASES_RECHAZO = [
    "vaya respuesta mas corta y vaga no aclaras nada",
    "ya esta? solo eso me vas a decir?",
    "a ver no te enrolles pero tampoco me pongas eso q no sirve",
    "eso es super impreciso estirate un poco mas q eres ia",
    "dios q pereza para decirme eso no pongas nada",
    "menudo escaqueo dame mas detalles",
    "no me dejes a medias con eso no resuelvo mi duda"
];

// Reacciones criticas adaptadas
const FRASES_CRITICAS = [
    "te estas riendo de mi? eso son letras al azar",
    "vaya troleo de ia para responderme esta basura mejor nada",
    "menudo virus de buscador vas fatal q insulto",
    "pero si estas escribiendo caracteres rotos q estafa total",
    "para esto apago el pc no me vaciles"
];

const FRASES_MUCHO_TEXTO = [
    "uf mucho texto ni de coña me leo eso",
    "me has escrito una biblia paso",
    "que pereza parece un examen de historia",
    "menudo testamento resúmelo o algo"
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

const MAX_PALABRAS = 15; 

// Generador de búsquedas al estilo "indio de internet"
function generarPreguntaAleatoria() {
    let cat = CATEGORIAS_PREGUNTAS[Math.floor(Math.random() * CATEGORIAS_PREGUNTAS.length)];
    let s = cat.sujetos[Math.floor(Math.random() * cat.sujetos.length)];
    let p = cat.predicados[Math.floor(Math.random() * cat.predicados.length)];
    return `${s} ${p}`;
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
    input.placeholder = `gugel buscando... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `gugel buscando... (${timeLeft}s)`;
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
    if (EVASIVAS.includes(respuesta)) {
        return "CRITICA"; 
    }

    let textoSinEspacios = respuesta.replace(/\s+/g, '');
    if (/(.)\1{4,}/.test(textoSinEspacios)) {
        return "CRITICA"; 
    }

    if (numPalabras <= 2) {
        return "RECHAZO";
    }

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
    let ultimosLogs = gameState.history.slice(-3);
    
    if (ultimosLogs.length === 0) {
        gameState.lastOpinion = "(mirando la pantalla...)";
        return;
    }

    let criticasSeguidas = ultimosLogs.filter(l => l.tipo === "CRITICA").length;
    let aciertosSeguidos = ultimosLogs.filter(l => l.tipo === "OK").length;
    let muchoTextoSeguido = ultimosLogs.filter(l => l.tipo === "MUCHO_TEXTO").length;

    if (muchoTextoSeguido >= 2) {
        gameState.lastOpinion = "(cree que eres un virus pesado)";
        return;
    }
    if (criticasSeguidas >= 1) {
        gameState.lastOpinion = "(va a cerrar la pestaña cabreado)";
        return;
    }
    if (aciertosSeguidos === 3) {
        gameState.lastOpinion = "(cree que eres la mejor ia de internet)";
        return;
    }

    if (gameState.satisfaction <= 25) {
        gameState.lastOpinion = "(piensa que este buscador es una basura)";
    } else if (gameState.satisfaction > 25 && gameState.satisfaction <= 50) {
        gameState.lastOpinion = "(juzgando en silencio en su cuarto)";
    } else if (gameState.satisfaction > 50 && gameState.satisfaction <= 75) {
        gameState.lastOpinion = "(le sirve lo que pones pero sin mas)";
    } else {
        gameState.lastOpinion = "(te tiene guardado en marcadores)";
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
        container.innerHTML = `<div style="color: #444; font-style: italic;">[sistema oculto] los logros aparecerán aquí</div>`;
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
        container.innerHTML = `<div style="color: #444; font-style: italic;">búfer vacío</div>`;
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
    favStatus.innerText = favs.length > 0 ? `Búfer activo con favoritos.` : "Sin marcas prioritarias.";
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

window.toggleFavorite = function(idx) {
    gameState.history[idx].fav = !gameState.history[idx].fav;
    renderHistoryData();
};

function exportCoreData() {
    if(gameState.history.length === 0) {
        alert("Historial vacío.");
        return;
    }
    let textoVolcado = `=== REGISTRO GUGEL (${gameState.history.length} logs) ===\n\n`;
    gameState.history.forEach((h, i) => {
        textoVolcado += `LOG #${i + 1}\nPREGUNTA: ${h.pregunta}\nRESPUESTA: ${h.respuesta}\nREACCIÓN: ${h.reaccion}\n-------------------\n`;
    });
    navigator.clipboard.writeText(textoVolcado).then(() => {
        alert("Copiado.");
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
