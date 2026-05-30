// ==========================================
// SISTEMA DE CUENTAS Y PERSISTENCIA
// ==========================================
let gameState = { 
    modoSeleccionadoSiguiente: "campaña", 
    modoActualJuego: "campaña", 
    campanaIndex: 0,
    campanaCompletada: false,
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "(analizando conexiones...)", 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [] 
};

let currentUser = null;

function ejecutarAccionCuenta() {
    const userIn = prompt("Introduce tu nombre de usuario para Registrarte/Iniciar Sesión:\n(Déjalo en blanco o cancela para salir)");
    if (userIn === null) return;
    
    const userClean = userIn.trim().toLowerCase();
    if (!userClean) {
        alert("El nombre de usuario no puede estar vacío.");
        return;
    }

    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");

    if (db[userClean]) {
        const passIn = prompt(`Usuario "${userClean}" encontrado. Introduce la contraseña:`);
        if (passIn === db[userClean].pass) {
            currentUser = userClean;
            gameState = db[userClean].data;
            alert(`Sesión iniciada. Bienvenido, ${userClean}.`);
        } else {
            alert("Contraseña incorrecta.");
            return;
        }
    } else {
        const passIn = prompt(`Usuario nuevo "${userClean}". Define tu contraseña:`);
        if (!passIn) return;
        
        if (gameState.cycles > 0 || gameState.history.length > 0) {
            if (confirm("¿Quieres vincular tu partida actual a esta cuenta?")) {
                // Se mantiene el gameState actual
            } else {
                resetGameState();
            }
        }
        
        currentUser = userClean;
        db[userClean] = { pass: passIn, data: gameState };
        localStorage.setItem("gugel_users", JSON.stringify(db));
        alert(`Cuenta "${userClean}" creada.`);
    }

    actualizarBotonCuentaUI();
    renderAllData();
    nextRound();
}

function guardarProgresoCuenta() {
    if (!currentUser) return; 
    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");
    if (db[currentUser]) {
        db[currentUser].data = gameState;
        localStorage.setItem("gugel_users", JSON.stringify(db));
    }
}

function resetGameState() {
    gameState = { 
        modoSeleccionadoSiguiente: "campaña", modoActualJuego: "campaña", campanaIndex: 0, campanaCompletada: false,
        satisfaction: 50, cycles: 0, totalChars: 0, lastOpinion: "(analizando conexiones...)", currentPregunta: "", history: [], logrosDesbloqueados: [] 
    };
}

// ==========================================
// CONFIGURACIÓN Y CONSTANTES
// ==========================================
const PREGUNTAS_CAMPANA = [
    "cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco",
    "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado",
    "porque no carga una pagina web"
];

const INFINITO_SUJETOS = ["gato", "perro vecino", "gato callejero", "pantalla pc", "espejo cuarto", "plastilina azul", "teclado usb", "conexion fibra", "raton optico"];
const INFINITO_PREDICADOS = ["mira fijo raro", "duerme encima router caliente", "maulla pared vacia", "morder cable teclado", "conduce electricidad", "parpadea sin parar", "da calambre"];
const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];
const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "¿te ha costado mucho esfuerzo escribir eso?", "dios q pereza para decirme eso no pongas nada"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura mejor nada", "para esto apago el pc no me vaciles"];
const FRASES_MUCHO_TEXTO = ["uf mucho texto ni de coña me leo eso", "me has escrito una biblia paso"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

// Opiniones y logros (Simplificados para brevedad pero funcionales)
const OPINIONES_BAJA = ["(quiere quemar el router)", "(esta buscando el boton de formatear)", "(asume que eres un bot roto)"];
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(te mira con desconfianza absoluta)"];
const OPINIONES_MEDIA_ALT_A = ["(cree que eres un bot pasable)", "(le parece una respuesta aceptable)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores)"];
const LOGROS_DIVERTIDOS = [{ t: "Hola Mundo", d: "Conseguiste no romper la base de datos." }];

// ==========================================
// LÓGICA DEL JUEGO
// ==========================================
function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
            return null;
        }
        return PREGUNTAS_CAMPANA[gameState.campanaIndex++];
    } else {
        let s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        let p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        return `${s} ${p}`;
    }
}

function analizarRespuesta(respuesta, numPalabras, palabrasArray) {
    if (EVASIVAS.includes(respuesta)) return "CRITICA";
    if (/(.)\1{4,}/.test(respuesta.replace(/\s+/g, ''))) return "CRITICA";
    if (numPalabras <= 2) return "RECHAZO";
    let contieneConector = INDICADORES_COHERENCIA.some(c => respuesta.includes(c));
    return contieneConector || respuesta.length > 12 ? "OK" : "RECHAZO";
}

function nextRound() {
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
    
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    if (continueBtn) continueBtn.style.display = "none";
    
    if (gameState.modoActualJuego === "campaña" && gameState.campanaCompletada) {
        if (input) { input.style.display = "block"; input.disabled = true; input.value = ""; input.placeholder = "CAMPAÑA COMPLETADA."; }
        if (transmitBtn) transmitBtn.style.display = "none";
        appendMessage('gugel', "has respondido todas las consultas de la campaña.");
        return;
    }

    if (input) { input.style.display = "block"; input.value = ""; input.disabled = false; }
    if (transmitBtn) transmitBtn.style.display = "block";

    let q = generarPregunta();
    gameState.currentPregunta = q;
    appendMessage('gugel', gameState.currentPregunta);
}

// ==========================================
// EVENTOS Y UI
// ==========================================
document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    
    appendMessage('ai', userText);
    let palabras = userText.split(/\s+/).filter(p => p.length > 0);
    
    let tipo = analizarRespuesta(userText, palabras.length, palabras);
    let reaccion = tipo === "OK" ? FRASES_OK[0] : (tipo === "CRITICA" ? FRASES_CRITICAS[0] : FRASES_RECHAZO[0]);
    
    setTimeout(() => {
        appendMessage('gugel', reaccion);
        gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: userText, reaccion: reaccion, fav: false });
        gameState.cycles++;
        renderAllData();
        guardarProgresoCuenta();
        
        document.getElementById('user-input').style.display = "none";
        document.getElementById('transmit-btn').style.display = "none";
        document.getElementById('continue-btn').style.display = "block";
    }, 600);
};

window.confirmContinue = function() {
    nextRound();
};

function renderAllData() {
    const hContainer = document.getElementById('history-list-container');
    if (hContainer) {
        hContainer.innerHTML = gameState.history.map((h, idx) => `
            <div class="historial-item" onclick="verChatHistorial(${idx}, event)">
                <strong>${h.pregunta}</strong> -> ${h.respuesta}
            </div>
        `).join('');
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (!box) return;
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    box.appendChild(msg);
}

function actualizarBotonCuentaUI() {
    const btn = document.getElementById("btn-gestion-cuenta");
    if (btn) btn.innerHTML = currentUser ? `⚙️ ${currentUser}` : "👤 CREAR CUENTA";
}

window.onload = function() {
    const btn = document.getElementById("btn-gestion-cuenta");
    if (btn) btn.onclick = ejecutarAccionCuenta;
    actualizarBotonCuentaUI();
    renderAllData();
    nextRound();
};
