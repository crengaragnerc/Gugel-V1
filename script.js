// ==========================================
// SISTEMA DE CUENTAS (CON PASSWORD)
// ==========================================
function ejecutarAccionCuenta() {
    const userIn = prompt("introduce tu nombre de usuario para registrarte/iniciar sesion:\n(deja en blanco o cancela para salir)");
    if (userIn === null) return;
    
    const userClean = userIn.trim().toLowerCase();
    if (!userClean) {
        alert("el nombre de usuario no puede estar vacio.");
        return;
    }

    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");

    if (db[userClean]) {
        const passIn = prompt(`usuario "${userClean}" encontrado. introduce la contraseña:`);
        if (passIn === db[userClean].pass) {
            currentUser = userClean;
            gameState = db[userClean].data;
            alert(`sesion iniciada. bienvenido, ${userClean}.`);
        } else {
            alert("contraseña incorrecta.");
            return;
        }
    } else {
        const passIn = prompt(`usuario nuevo "${userClean}". define tu contraseña:`);
        if (!passIn) {
            alert("necesitas una contraseña.");
            return;
        }
        
        if (gameState.cycles > 0 || gameState.history.length > 0) {
            const migrar = confirm("¿quieres vincular tu partida actual a esta cuenta?");
            if (!migrar) {
                gameState = { 
                    modoSeleccionadoSiguiente: "campaña", modoActualJuego: "campaña", campanaIndex: 0, campanaCompletada: false,
                    satisfaction: 50, cycles: 0, totalChars: 0, lastOpinion: "(analizando...)", currentPregunta: "", history: [], logrosDesbloqueados: [] 
                };
            }
        }
        
        currentUser = userClean;
        db[userClean] = { pass: passIn, data: gameState };
        localStorage.setItem("gugel_users", JSON.stringify(db));
        alert(`cuenta "${userClean}" creada.`);
    }

    actualizarBotonCuentaUI();
    renderAllData();
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
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

// ==========================================
// CONFIGURACION Y DATOS GUGEL
// ==========================================
const PREGUNTAS_CAMPANA = [
    "cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco",
    "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado",
    "porque no carga una pagina web"
];

const SUJETOS = [
    "mi gato", "el router", "la conexion", "el vecino", "la plastilina", "el monitor", "mi teclado", 
    "la bateria", "el sistema", "la ram", "el raton", "el cable de red", "un virus", "la actualizacion", 
    "el ventilador", "el disco duro", "la impresora", "el servidor", "mi silla", "el cargador", "el movil",
    "la pantalla", "el procesador", "la fibra optica", "el mando", "el enchufe", "la nevera"
];

const PREDICADOS = [
    "esta ardiendo", "hace un ruido raro", "se ha vuelto loco", "no enciende", "parpadea todo el rato", 
    "se queda pillado", "me esta vacilando", "tiene vida propia", "esta lleno de polvo", "se calienta un monton", 
    "tira chispas", "esta mas lento que una tortuga", "parece que quiere despegar", "se desconecta solo", 
    "me pide contraseña cada minuto", "huele a quemado", "no tiene bateria", "va a pedales", "se apaga de golpe",
    "esta haciendo cosas raras", "parece que tiene hambre", "no para de dar errores", "se ha quedado congelado"
];

const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];
const EVASIVAS = ["ni idea", "yo que se", "asdf", "nose", "jaja", "ño"]; // QUITADO: si, no

const FRASES_OK = ["vale me cuadra", "aah ya veo gracias", "cierto buen punto", "ni tan mal tiene sentido", "pos vale me sirve"];
const FRASES_RECHAZO = ["vaya respuesta mas corta", "ya esta? solo eso?", "te ha costado escribir eso? esperaba mas.", "dios q pereza pa decirme eso"];
const FRASES_CRITICAS = ["eso son letras al azar o q", "vaya troleo de ia mejor nada", "para esto apago el pc no me vaciles"];
const FRASES_MUCHO_TEXTO = ["uf mucho texto paso", "me has escrito una biblia ni de coña"];

// Estado inicial
let gameState = { 
    modoSeleccionadoSiguiente: "campaña", 
    modoActualJuego: "campaña", 
    campanaIndex: 0,
    campanaCompletada: false,
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "(analizando...)", 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [] 
};

let currentUser = null;

// ==========================================
// LOGICA DE PROCESAMIENTO
// ==========================================
function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
            return null;
        }
        return PREGUNTAS_CAMPANA[gameState.campanaIndex++];
    } else {
        const s = SUJETOS[Math.floor(Math.random() * SUJETOS.length)];
        const p = PREDICADOS[Math.floor(Math.random() * PREDICADOS.length)];
        return `${s} ${p}`;
    }
}

function analizarRespuesta(respuesta, numPalabras, palabrasArray) {
    const textoMinus = respuesta.toLowerCase();

    // 1. Deteccion de evasivas
    if (EVASIVAS.includes(textoMinus)) return "CRITICA";

    // 2. Patrones repetitivos
    if (/(.)\1{4,}/.test(respuesta)) return "CRITICA";

    // 3. Keyboard Mash
    const tieneVocales = /[aeiouáéíóú]/i.test(respuesta);
    if (!tieneVocales && respuesta.length > 5) return "CRITICA";

    // 4. Repeticion de palabras
    if (palabrasArray.length >= 4) {
        let conteoPalabras = {};
        let maximaRepeticion = 0;
        palabrasArray.forEach(p => {
            conteoPalabras[p] = (conteoPalabras[p] || 0) + 1;
            if (conteoPalabras[p] > maximaRepeticion) maximaRepeticion = conteoPalabras[p];
        });
        if (maximaRepeticion > palabrasArray.length * 0.5) return "CRITICA";
    }

    // 5. Longitud
    if (numPalabras <= 2) return "RECHAZO";

    // 6. Coherencia
    const contieneConector = INDICADORES_COHERENCIA.some(c => textoMinus.includes(c));
    if (!contieneConector) return "RECHAZO";

    return "OK";
}

// ==========================================
// UI Y EVENTOS
// ==========================================
document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;

    // BLOQUEO DUPLICADOS
    const esDuplicado = gameState.history.some(h => h.respuesta.toLowerCase() === userText);
    if (esDuplicado) {
        alert("no seas pesado ya has dicho eso antes");
        return;
    }
    
    appendMessage('ai', userText);
    let palabrasArray = userText.split(/\s+/).filter(p => p.length > 0);
    let numPalabras = palabrasArray.length;
    
    let tipoResultado = analizarRespuesta(userText, numPalabras, palabrasArray);
    let reaccion = tipoResultado === "OK" ? FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)] : 
                   tipoResultado === "CRITICA" ? FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)] : 
                   FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
    
    setTimeout(() => {
        appendMessage('gugel', reaccion);
        gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: userText, reaccion: reaccion, fav: false });
        renderAllData();
        guardarProgresoCuenta();
        
        document.getElementById('transmit-btn').style.display = "none";
        const contBtn = document.getElementById('continue-btn');
        if(contBtn) contBtn.style.display = "block";
    }, 600);
};

function renderAllData() {
    // BOTON CAMPAÑA: ocultar si esta completada
    const btnC = document.getElementById('btn-mode-campaña') || document.getElementById('btn-mode-campana');
    if (btnC) {
        btnC.style.display = gameState.campanaCompletada ? "none" : "inline-block";
    }

    // ... renderizado de logros y historial igual que antes ...
    const hContainer = document.getElementById('history-list-container');
    if (hContainer) {
        hContainer.innerHTML = gameState.history.map((h, idx) => `
            <div class="historial-item" onclick="verChatHistorial(${idx}, event)">
                <div><strong>${h.pregunta}</strong> -> ${h.respuesta}</div>
                <button onclick="toggleFavorite(${idx}, event)">★</button>
            </div>
        `).join('');
    }
}

function exportCoreData() {
    // EXPORTACION LIMPIA
    let txt = gameState.history.map(h => `${h.pregunta} -> ${h.respuesta}`).join('\n');
    navigator.clipboard.writeText(txt || "bufer vacio").then(() => alert("copiado sin movidas"));
}

// ==========================================
// RESTO DE FUNCIONES (NO TOCAR)
// ==========================================
function actualizarBotonCuentaUI() {
    const btn = document.getElementById("btn-gestion-cuenta");
    if (!btn) return;
    if (currentUser) { btn.innerHTML = `⚙️ ${currentUser}`; btn.style.color = "#00ffcc"; }
    else { btn.innerHTML = "👤 CREAR CUENTA"; }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (!box) return;
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function nextRound() {
    let q = generarPregunta();
    if (q === null && gameState.campanaCompletada) {
        appendMessage('gugel', "campaña terminada. modo infinito activado.");
        return;
    }
    gameState.currentPregunta = q;
    appendMessage('gugel', gameState.currentPregunta);
    document.getElementById('transmit-btn').style.display = "block";
    document.getElementById('user-input').style.display = "block";
    document.getElementById('user-input').value = "";
}

window.toggleFavorite = function(idx, event) {
    if (event) event.stopPropagation();
    gameState.history[idx].fav = !gameState.history[idx].fav;
    guardarProgresoCuenta();
    renderAllData();
};

window.onload = function() {
    const btn = document.getElementById("btn-gestion-cuenta");
    if (btn) btn.onclick = ejecutarAccionCuenta;
    actualizarBotonCuentaUI();
    renderAllData();
    nextRound();
};
