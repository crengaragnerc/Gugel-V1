// ==========================================
// 1. CONSTANTES, LISTAS Y LOGROS
// ==========================================
const PLANTILLAS_PREGUNTAS = ["[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"];
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];
const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido", "ok eso responde lo que queria"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "explicate mejor q no me entero de nada"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "jaja", "ño", "si", "no"];

const OPINIONES_BAJA = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)"];
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)"];
const OPINIONES_MEDIA_ALT_A = ["(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores)"];

// ==========================================
// 2. ESTADO GLOBAL
// ==========================================
let gameState = { 
    campanaIndex: 0, 
    satisfaction: 50,
    history: [], 
    logrosDesbloqueados: [],
    recentReactions: [] 
};

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
    let lista = (gameState.satisfaction < 30) ? OPINIONES_BAJA :
                (gameState.satisfaction < 60) ? OPINIONES_MEDIA_BAJA :
                (gameState.satisfaction < 85) ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA;
    return obtenerElementoNoRepetido(lista, gameState.recentReactions);
}

// Corregido: Inicialización del tema guardado al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('gugel-tema') || 'modo-hacker';
    document.body.className = temaGuardado;
    const select = document.getElementById('theme-select');
    if (select) select.value = temaGuardado;
});

function verificarLogros() {
    if (gameState.history.length >= 5 && !gameState.logrosDesbloqueados.includes("IA con Cafeína")) {
        gameState.logrosDesbloqueados.push("IA con Cafeína");
        alert("¡Logro desbloqueado: IA con Cafeína!");
    }
}

// ==========================================
// 4. MOTOR DE JUEGO (REFORZADO)
// ==========================================
function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (box) {
        const msg = document.createElement('div');
        msg.className = `message ${sender}`;
        msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;
    }
    gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: text });
}

function renderAllData() {
    // Historial
    const histContainer = document.getElementById('history-list-container');
    if (histContainer) {
        histContainer.innerHTML = gameState.history.map(h => `<div><strong>${h.pregunta}:</strong> ${h.respuesta}</div>`).join('');
    }
    // Opinión en perfil
    const opEl = document.getElementById('prof-opinion');
    if (opEl) opEl.innerText = calcularOpinion();
    // Logros
    const logEl = document.getElementById('logros-count');
    if (logEl) logEl.innerText = gameState.logrosDesbloqueados.length;
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    
    appendMessage('tú', userText);
    input.style.display = "none";
    document.getElementById('transmit-btn').style.display = "none";

    let tipo = EVASIVAS.includes(userText) ? "CRITICA" : (userText.length <= 15 ? "RECHAZO" : "OK");
    let reaccion = tipo === "CRITICA" ? obtenerElementoNoRepetido(FRASES_CRITICAS, gameState.recentReactions) :
                   tipo === "RECHAZO" ? obtenerElementoNoRepetido(FRASES_RECHAZO, gameState.recentReactions) :
                   obtenerElementoNoRepetido(FRASES_OK, gameState.recentReactions);

    gameState.satisfaction += (tipo === "OK" ? 5 : -10);

    setTimeout(() => {
        appendMessage('gugel', reaccion); // Respuesta limpia en chat
        verificarLogros();
        renderAllData(); // Esto actualiza el perfil y los logros en los paneles
        document.getElementById('continue-btn').style.display = "block";
    }, 500);
};

function nextRound() {
    document.getElementById('chat-messages').innerHTML = "";
    document.getElementById('continue-btn').style.display = "none";
    gameState.currentPregunta = PREGUNTAS_CAMPANA[gameState.campanaIndex++ % PREGUNTAS_CAMPANA.length];
    appendMessage('gugel', gameState.currentPregunta);
    
    const input = document.getElementById('user-input');
    input.style.display = "block";
    input.disabled = true;
    input.placeholder = "Procesando...";
    document.getElementById('transmit-btn').style.display = "block";
    document.getElementById('transmit-btn').disabled = true;

    setTimeout(() => {
        input.disabled = false;
        document.getElementById('transmit-btn').disabled = false;
        input.placeholder = "Introduce tu respuesta...";
    }, 5000);
}

document.getElementById('continue-btn').onclick = nextRound;
window.onload = nextRound;

// ==========================================
// 5. NUEVAS FUNCIONES DE ARREGLO DE BUGS
// ==========================================

// Corregido: Añadida función para cambiar temas mediante el select y guardar la preferencia
function cambiarTema(nuevoTema) {
    document.body.className = nuevoTema;
    localStorage.setItem('gugel-tema', nuevoTema);
}

// Corregido: Añadida función cicloTema para el botón "CAMBIAR TEMA" de la sección 🎨 TEMA
function cicloTema() {
    const temas = ["modo-hacker", "modo-claro", "modo-oscuro"];
    let actual = document.body.className;
    let siguienteIndex = (temas.indexOf(actual) + 1) % temas.length;
    if (siguienteIndex === -1 || siguienteIndex === undefined) siguienteIndex = 0;
    let nuevoTema = temas[siguienteIndex];
    
    cambiarTema(nuevoTema);
    
    const select = document.getElementById('theme-select');
    if (select) select.value = nuevoTema;
}

// Corregido: Añadida función para manejar el cambio entre paneles (perfil, logros, historial) y volver al chat
function switchView(viewId) {
    // Si pulsas sobre el panel que ya está activo, volvemos a la pantalla del chat
    const panelObjetivo = document.getElementById(viewId);
    if (panelObjetivo && panelObjetivo.classList.contains('active')) {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('view-chat').classList.add('active');
    } else {
        // En caso contrario cambiamos al panel seleccionado
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        if (panelObjetivo) panelObjetivo.classList.add('active');
    }
}

// Corregido: Añadida función para cambiar los modos de juego en el menú izquierdo
function cambiarModoEstrategia(modo) {
    // Quitar estado activo de los botones de modo
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    
    // Activar el botón correspondiente
    const btnActivo = document.getElementById(`btn-mode-${modo}`);
    if (btnActivo) btnActivo.classList.add('active');
    
    // Al cambiar de modo de juego forzamos el regreso a la ventana del chat
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
}
