// Banco de preguntas del MODO HISTORIA
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

// Banco de preguntas crudas del MODO INFINITO
const CATEGORIAS_INFINITO = [
    { sujetos: ["gato", "perro vecino", "gato callejero"], predicados: ["mira fijo raro", "duerme encima router caliente", "maulla pared vacia", "morder cable teclado"] },
    { sujetos: ["agua grifo", "patata frita", "plastilina azul"], predicados: ["sabor metal porque", "conduce electricidad", "cambia color sol"] },
    { sujetos: ["pantalla ordenador", "espejo cuarto", "robot internet"], predicados: ["se mueve si no miro", "saltarse captcha como", "escribe solo con polvo"] }
];

const INDICADORES_COHERENCIA = [
    "porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", 
    "es por", "causa", "efecto", "consecuencia", "depende de", "si pasa", "cuando", "o sea", "como"
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

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

// Estado del sistema
let gameState = { 
    mode: "historia", // Modos: 'historia' o 'infinito'
    currentLevelIdx: 0, 
    infiniteCount: 0,
    satisfaction: 50, // ¡Inicializado rigurosamente al 50%!
    totalChars: 0,
    lastOpinion: "analizando respuestas...",
    currentPregunta: "",
    history: []
};

const MAX_PALABRAS = 15; 

// Cambiar de tema visual (Claro, Oscuro, Hacker)
function changeSystemMode() {
    const select = document.getElementById('mode-select');
    document.body.className = ''; 
    if (select.value !== 'modo-oscuro') {
        document.body.classList.add(select.value);
    }
}

// Cambiar entre Modo Historia e Infinito
function cambiarModoJuego() {
    const select = document.getElementById('game-mode-select');
    gameState.mode = select.value;
    
    // Resetear contadores de fase para el nuevo modo
    if (gameState.mode === "historia") {
        gameState.currentLevelIdx = 0;
    } else {
        gameState.infiniteCount = 0;
    }
    
    document.getElementById('chat-messages').innerHTML = "";
    renderProfileData();
    nextRound();
}

function generarPreguntaAleatoria() {
    let cat = CATEGORIAS_INFINITO[Math.floor(Math.random() * CATEGORIAS_INFINITO.length)];
    let s = cat.sujetos[Math.floor(Math.random() * cat.sujetos.length)];
    let p = cat.predicados[Math.floor(Math.random() * cat.predicados.length)];
    return `${s} ${p}`;
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = `<strong>${sender === 'gugel' ? 'gugel' : 'tú'}:</strong> ${text.toLowerCase()}`;
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

    if (gameState.mode === "historia") {
        if (gameState.currentLevelIdx >= NIVELES_CAMPANA.length) {
            appendMessage('gugel', "has completado los 10 niveles del modo historia.");
            input.style.display = "none";
            transmitBtn.style.display = "none";
            return;
        }
        gameState.currentPregunta = NIVELES_CAMPANA[gameState.currentLevelIdx];
        document.getElementById('panel-title-text').innerText = `GUGEL - Modo Historia`;
    } else {
        gameState.currentPregunta = generarPreguntaAleatoria();
        document.getElementById('panel-title-text').innerText = `GUGEL - Modo Infinito`;
    }

    appendMessage('gugel', gameState.currentPregunta);
    
    input.disabled = true; 
    transmitBtn.disabled = true;
    let timeLeft = 1;
    
    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = false; 
            transmitBtn.disabled = false;
            input.placeholder = "introduce tu respuesta de ia...";
            input.focus();
        }
    }, 500);
}

function analizarRespuesta(respuesta, numPalabras) {
    if (EVASIVAS.includes(respuesta)) return "CRITICA"; 
    let textoSinEspacios = respuesta.replace(/\s+/g, '');
    if (/(.)\1{4,}/.test(textoSinEspacios)) return "CRITICA"; 
    if (numPalabras <= 2) return "RECHAZO";
    let contieneConector = INDICADORES_COHERENCIA.some(conector => respuesta.includes(conector));
    if (contieneConector || respuesta.length > 12) return "OK";
    return "RECHAZO"; 
}

function updateSatisfaction(cambio) {
    gameState.satisfaction += cambio;
    if (gameState.satisfaction > 100) gameState.satisfaction = 100;
    if (gameState.satisfaction < 0) gameState.satisfaction = 0;
}

function calcularOpinionDinamica() {
    if (gameState.satisfaction <= 25) gameState.lastOpinion = "(está de mala hostia)";
    else if (gameState.satisfaction > 25 && gameState.satisfaction <= 50) gameState.lastOpinion = "(no se fía un pelo)";
    else if (gameState.satisfaction > 50 && gameState.satisfaction <= 75) gameState.lastOpinion = "(le vale lo que pones)";
    else gameState.lastOpinion = "(piensa que eres dios)";
}

function renderProfileData() {
    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    
    if (gameState.mode === "historia") {
        document.getElementById('prof-cycles').innerText = `Nivel ${gameState.currentLevelIdx + 1}`;
        document.getElementById('prof-summary').innerText = `Fijos: ${gameState.currentLevelIdx} / 10`;
    } else {
        document.getElementById('prof-cycles').innerText = `Infinito`;
        document.getElementById('prof-summary').innerText = `Consultas: ${gameState.infiniteCount}`;
    }
    document.getElementById('prof-chars').innerText = gameState.totalChars;
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    
    appendMessage('ai', userText);
    
    let numPalabras = userText.split(/\s+/).filter(p => p.length > 0).length;
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

        if (gameState.mode === "historia") {
            gameState.currentLevelIdx++; 
        } else {
            gameState.infiniteCount++;
        }

        gameState.totalChars += userText.length;

        gameState.history.push({
            pregunta: gameState.currentPregunta,
            respuesta: userText,
            reaccion: reaccion,
            tipo: tipoResultado
        });

        updateSatisfaction(cambioSatisfacion);
        calcularOpinionDinamica(); 
        renderProfileData();
        renderHistoryData();
    }, 500);

    input.value = "";
    input.style.display = "none";
    transmitBtn.style.display = "none";
    continueBtn.style.display = "block";
};

function renderHistoryData() {
    const container = document.getElementById('history-list-container');
    container.innerHTML = "";
    gameState.history.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'historial-item';
        div.innerHTML = `
            <strong>#${idx + 1} [${gameState.mode}]:</strong> ${item.pregunta}<br>
            <strong>tú:</strong> ${item.respuesta}<br>
            <strong>gugel:</strong> ${item.reaccion}
        `;
        container.appendChild(div);
    });
}

window.exportCoreData = function() {
    let txt = gameState.history.map((h, i) => `LOG #${i+1}\nQ: ${h.pregunta}\nA: ${h.respuesta}\nR: ${h.reaccion}\n---`).join("\n");
    navigator.clipboard.writeText(txt).then(() => alert("Copiado al portapapeles."));
};

window.confirmContinue = function() {
    document.getElementById('chat-messages').innerHTML = "";
    nextRound();
};

window.onload = function() {
    calcularOpinionDinamica();
    renderProfileData();
    nextRound();
};
