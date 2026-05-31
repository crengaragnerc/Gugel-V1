// ==========================================
// 1. CONSTANTES, LISTAS Y LOGROS
// ==========================================
const PLANTILLAS_PREGUNTAS = ["[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"];
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];
const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido", "ok eso responde lo que queria"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "explicate mejor q no me entero de nada"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura", "deja de repetirme lo mismo pesado"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "jaja", "ño", "si", "no"];

const INFINITO_SUJETOS = ["gato", "perro", "pc", "teclado", "router", "internet", "raton", "portatil", "vecino", "coche", "llave", "cafetera", "ventilador", "pantalla", "cable"];
const INFINITO_PREDICADOS = ["mira raro", "quema", "sin luz", "ruido", "calambre", "parpadea", "sin red", "borra", "lento", "pillado", "metalico", "no responde"];

const OPINIONES_BAJA = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)"];
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)"];
const OPINIONES_MEDIA_ALT_A = ["(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores)"];

// ==========================================
// 2. ESTADO GLOBAL
// ==========================================
let gameState = { 
    modo: "campaña",
    campanaIndex: 0, 
    satisfaction: 50,
    history: [], 
    logrosDesbloqueados: [],
    recentReactions: [],
    lastUserText: "",
    totalChars: 0,
    usuario: "Invitado",
    campañaCompletada: false
};

// Carga el estado guardado si existe previamente
if (localStorage.getItem('gugel-save-state')) {
    gameState = JSON.parse(localStorage.getItem('gugel-save-state'));
}

function guardarEstadoEnStorage() {
    localStorage.setItem('gugel-save-state', JSON.stringify(gameState));
}

// ==========================================
// 3. LÓGICA DE PERSONALIDAD Y LOGROS
// ==========================================
function obtenerElementoNoRepetido(lista, historial) {
    let opciones = lista.filter(item => !historial.includes(item));
    if (opciones.length === 0) opciones = lista;
    let item = opciones[Math.floor(Math.random() * opciones.length)];
    historial.push(item);
    if (historial.length > 10) historial.shift();
    return item;
}

function calcularOpinion() {
    let lista = (gameState.satisfaction < 35) ? OPINIONES_BAJA :
                (gameState.satisfaction < 55) ? OPINIONES_MEDIA_BAJA :
                (gameState.satisfaction < 80) ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA;
    return obtenerElementoNoRepetido(lista, gameState.recentReactions);
}

function verificarLogros() {
    if (gameState.history.length >= 5 && !gameState.logrosDesbloqueados.includes("IA con Cafeína")) {
        gameState.logrosDesbloqueados.push("IA con Cafeína");
        alert("¡Logro desbloqueado: IA con Cafeína!");
    }
    if (gameState.satisfaction >= 100 && !gameState.logrosDesbloqueados.includes("Perfeccionista")) {
        gameState.logrosDesbloqueados.push("Perfeccionista");
        alert("¡Logro desbloqueado: Perfeccionista!");
    }
    guardarEstadoEnStorage();
}

// ==========================================
// 4. MOTOR DE JUEGO
// ==========================================
function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (box) {
        const msg = document.createElement('div');
        msg.className = `message ${sender}`;
        msg.innerHTML = `<strong>${sender === 'tú' ? 'TÚ' : 'GUGEL'}:</strong> ${text}`;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;
    }
}

function renderAllData() {
    // Control de visibilidad del botón campaña / infinito
    const btnCamp = document.getElementById('btn-mode-campaña');
    const btnInf = document.getElementById('btn-mode-infinito');
    
    if (gameState.campañaCompletada) {
        if (btnCamp) btnCamp.style.display = 'none';
        if (btnInf) btnInf.style.display = 'block';
    } else {
        if (btnCamp) btnCamp.style.display = 'block';
        if (btnInf) btnInf.style.display = 'none'; // Oculto hasta que acabe la campaña si así se prefiere
    }

    // Historial panel
    const histContainer = document.getElementById('history-list-container');
    if (histContainer) {
        histContainer.innerHTML = gameState.history.map(h => 
            `<div style="margin-bottom:10px; border-bottom:1px dashed var(--bubble-border); padding-bottom:5px;">
                <strong>CONSULTA:</strong> ${h.pregunta}<br>
                <strong>RESPUESTA:</strong> ${h.respuesta}<br>
                <strong>REACCIÓN:</strong> ${h.reaccion}
            </div>`
        ).join('');
    }
    
    // Perfil panel
    const userEl = document.getElementById('prof-usuario');
    if (userEl) userEl.innerText = gameState.usuario;

    const opEl = document.getElementById('prof-opinion');
    if (opEl) opEl.innerText = calcularOpinion();
    
    const satEl = document.getElementById('prof-satisfaction');
    if (satEl) satEl.innerText = `${gameState.satisfaction}%`;
    
    const cycEl = document.getElementById('prof-cycles');
    if (cycEl) cycEl.innerText = gameState.history.length;
    
    const chEl = document.getElementById('prof-chars');
    if (chEl) chEl.innerText = gameState.totalChars;

    // Logros panel
    const logEl = document.getElementById('logros-count');
    if (logEl) logEl.innerText = gameState.logrosDesbloqueados.length;
    
    const logContainer = document.getElementById('logros-container');
    if (logContainer) {
        logContainer.innerHTML = gameState.logrosDesbloqueados.length > 0 
            ? gameState.logrosDesbloqueados.map(l => `<div class="message gugel">🏆 <strong>${l}</strong> - Registro asignado al núcleo.</div>`).join('')
            : "<div>Ningún logro desbloqueado todavía.</div>";
    }
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim();
    if (!userText || input.disabled) return;
    
    let textProcesado = userText.toLowerCase();
    appendMessage('tú', userText);
    
    gameState.totalChars += userText.length;
    input.style.display = "none";
    document.getElementById('transmit-btn').style.display = "none";

    let tipo = "OK";
    
    // Control Anti-Spam
    if (textProcesado === gameState.lastUserText) {
        tipo = "CRITICA";
    } else if (EVASIVAS.includes(textProcesado)) {
        tipo = "CRITICA";
    } else if (userText.length <= 15) {
        tipo = "RECHAZO";
    }

    gameState.lastUserText = textProcesado;

    let reaccion = tipo === "CRITICA" ? obtenerElementoNoRepetido(FRASES_CRITICAS, gameState.recentReactions) :
                   tipo === "RECHAZO" ? obtenerElementoNoRepetido(FRASES_RECHAZO, gameState.recentReactions) :
                   obtenerElementoNoRepetido(FRASES_OK, gameState.recentReactions);

    if (tipo === "OK") {
        gameState.satisfaction += 10;
    } else {
        gameState.satisfaction -= 15;
    }
    
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction));

    setTimeout(() => {
        appendMessage('gugel', reaccion);
        
        gameState.history.push({ 
            pregunta: gameState.currentPregunta, 
            respuesta: userText, 
            reaccion: reaccion 
        });

        if (gameState.modo === "campaña" && gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campañaCompletada = true;
            gameState.modo = "infinito";
            alert("¡Has terminado las 10 preguntas de la campaña! El sistema conmuta al modo infinito.");
        }

        verificarLogros();
        renderAllData();
        document.getElementById('continue-btn').style.display = "block";
    }, 500);
};

function generarPreguntaInfinita() {
    let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
    let sujeto = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
    let predicado = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
    return plantilla.replace("[s]", sujeto).replace("[p]", predicado);
}

function nextRound() {
    document.getElementById('chat-messages').innerHTML = "";
    document.getElementById('continue-btn').style.display = "none";
    
    if (gameState.campañaCompletada) {
        gameState.modo = "infinito";
    }

    if (gameState.modo === "campaña") {
        gameState.currentPregunta = PREGUNTAS_CAMPANA[gameState.campanaIndex];
        gameState.campanaIndex++;
    } else {
        gameState.currentPregunta = generarPreguntaInfinita();
    }
    
    appendMessage('gugel', gameState.currentPregunta);
    
    const input = document.getElementById('user-input');
    input.value = "";
    input.style.display = "block";
    input.disabled = true;
    input.placeholder = "Procesando núcleo...";
    
    const tBtn = document.getElementById('transmit-btn');
    tBtn.style.display = "block";
    tBtn.disabled = true;

    setTimeout(() => {
        input.disabled = false;
        tBtn.disabled = false;
        input.placeholder = "Introduce tu respuesta...";
        input.focus();
    }, 2000);
}

// ==========================================
// 5. NAVEGACIÓN Y CONFIGURACIÓN
// ==========================================
function cambiarTema(nuevoTema) {
    document.body.className = nuevoTema;
    localStorage.setItem('gugel-tema', nuevoTema);
}

function switchView(viewId) {
    const panelObjetivo = document.getElementById(viewId);
    
    // Desactivar todos los botones de subpaneles de estilos para mantener limpieza visual
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    if (panelObjetivo && panelObjetivo.classList.contains('active')) {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('view-chat').classList.add('active');
    } else {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        if (panelObjetivo) {
            panelObjetivo.classList.add('active');
            const btnPulsado = document.getElementById(`btn-${viewId}`);
            if (btnPulsado) btnPulsado.classList.add('active');
        }
    }
    renderAllData();
}

function cambiarModoEstrategia(modo) {
    if (modo === "campaña" && gameState.campañaCompletada) return;
    
    gameState.modo = modo;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    
    const btnActivo = document.getElementById(`btn-mode-${modo}`);
    if (btnActivo) btnActivo.classList.add('active');
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    
    nextRound();
}

// ==========================================
// 6. GESTIÓN DE CUENTA
// ==========================================
function abrirModalCuenta() {
    document.getElementById('account-modal').classList.add('active');
    document.getElementById('modal-user-status').innerText = gameState.usuario;
    document.getElementById('account-username').value = gameState.usuario === "Invitado" ? "" : gameState.usuario;
}

function cerrarModalCuenta() {
    document.getElementById('account-modal').classList.remove('active');
}

function guardarNombreCuenta() {
    const inputNombre = document.getElementById('account-username').value.trim();
    gameState.usuario = inputNombre !== "" ? inputNombre : "Invitado";
    guardarEstadoEnStorage();
    renderAllData();
    cerrarModalCuenta();
    alert(`Sesión activa como: ${gameState.usuario}`);
}

function resetearProgresoJuego() {
    if (confirm("¿Destruir el búfer completo y restaurar parámetros iniciales?")) {
        localStorage.removeItem('gugel-save-state');
        gameState = { 
            modo: "campaña",
            campanaIndex: 0, 
            satisfaction: 50,
            history: [], 
            logrosDesbloqueados: [],
            recentReactions: [],
            lastUserText: "",
            totalChars: 0,
            usuario: "Invitado",
            campañaCompletada: false
        };
        guardarEstadoEnStorage();
        renderAllData();
        cerrarModalCuenta();
        nextRound();
    }
}

// ==========================================
// 7. EXPORTACIÓN DE LOGS
// ==========================================
function exportCoreData() {
    if (gameState.history.length === 0) {
        alert("Búfer vacío.");
        return;
    }
    let textoLog = gameState.history.map((h, i) => 
        `LOG #${i + 1}\nConsulta: ${h.pregunta}\nRespuesta: ${h.respuesta}\nReacción: ${h.reaccion}\n---`
    ).join('\n');
    
    navigator.clipboard.writeText(textoLog).then(() => {
        alert("Copiado en portapapeles.");
    });
}

function exportarHistorialCompleto() {
    if (gameState.history.length === 0) {
        alert("Búfer vacío.");
        return;
    }
    let textoLog = `=== GUGEL CORE LOGGER ===\nOperador: ${gameState.usuario}\nSatisfacción: ${gameState.satisfaction}%\n\n`;
    textoLog += gameState.history.map((h, i) => `[${i + 1}] Q: ${h.pregunta} | A: ${h.respuesta} | R: ${h.reaccion}`).join('\n');

    const blob = new Blob([textoLog], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gugel_core_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Inicialización de la sesión
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('gugel-tema') || 'modo-hacker';
    document.body.className = temaGuardado;
    const select = document.getElementById('theme-select');
    if (select) select.value = temaGuardado;
    
    if (gameState.campañaCompletada) {
        gameState.modo = "infinito";
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        const btnInf = document.getElementById('btn-mode-infinito');
        if (btnInf) btnInf.classList.add('active');
    }

    nextRound();
    renderAllData();
});
