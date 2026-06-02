// ==========================================
// 1. CONSTANTES, PLANTILLAS Y DICCIONARIOS
// ==========================================
const PLANTILLAS_PREGUNTAS = ["[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"];
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];

const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido", "ok eso responde lo que queria"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "explicate mejor q no me entero de nada"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura", "deja de repetirme lo mismo pesado", "vaya respuesta absurda, eso no tiene nada que ver"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "jaja", "ño", "si", "no", "uwu", "xd"];

const INFINITO_SUJETOS = ["gato", "perro", "pc", "teclado", "router", "internet", "raton", "portatil", "vecino", "coche", "llave", "cafetera", "ventilador", "pantalla", "cable"];
const INFINITO_PREDICADOS = ["mira raro", "quema", "sin luz", "ruido", "calambre", "parpadea", "sin red", "borra", "lento", "pillado", "metalico", "no responde"];

const OPINIONES_BAJA = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)"];
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algorithm tiene un tornillo flojo)"];
const OPINIONES_MEDIA_ALT_A = ["(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores)"];

const MAPA_COHERENCIA = {
    "rubik": ["cubo", "algoritmo", "capa", "giro", "color", "cara", "esquina", "arista", "f2l", "oll", "pll", "cruzar", "girar"],
    "verde": ["medico", "doctor", "comida", "digestión", "bilis", "estomago", "color", "cuerpo", "sintoma"],
    "agosto": ["fiesta", "festivo", "calendario", "celebracion", "españa", "asuncion", "virgen", "vacaciones"],
    "dormir": ["sueño", "cerebro", "cansancio", "alucinaciones", "cansado", "insomnio", "salud", "descanso", "morir"],
    "liquida": ["agua", "estado", "molecula", "h2o", "temperatura", "fisica", "quimica", "fusion"],
    "barranco": ["tierra", "muro", "allanar", "maquinaria", "terreno", "pala", "obra", "pendiente", "desnivel"],
    "tomate": ["fruta", "verdura", "botanica", "planta", "semilla", "ensalada", "origen"],
    "cancion": ["ritmo", "nombre", "titulo", "letra", "artista", "musica", "banda", "spotify", "melodia"],
    "bloqueado": ["perfil", "whatsapp", "chat", "contacto", "red", "mensaje", "visto", "bloqueo", "tlf"],
    "web": ["servidor", "dns", "conexion", "wifi", "router", "enlace", "caido", "host", "navegador", "url"]
};

const BASE_LOGROS = [
    { id: "L01", tipo: "positivo", nombre: "Primeros Pasos", desc: "Completaste la primera consulta con éxito." },
    { id: "L02", tipo: "positivo", nombre: "IA Comprensiva", desc: "Alcanzaste el 60% de satisfacción del usuario." },
    { id: "L03", tipo: "positivo", nombre: "Empatía Algorítmica", desc: "Alcanzaste el 80% de satisfacción." },
    { id: "L04", tipo: "positivo", nombre: "Deidad Binaria", desc: "Llegaste al 100% de satisfacción máxima." },
    { id: "L05", tipo: "positivo", merge: true, nombre: "Operador de Élite", desc: "Completaste las 10 preguntas de la Campaña." },
    { id: "L06", tipo: "positivo", nombre: "Guardado Seguro", desc: "Añadiste tu primera consulta a Favoritos." },
    { id: "L07", tipo: "positivo", nombre: "Coleccionista de Estrellas", desc: "Guardaste 3 elementos en Favoritos." },
    { id: "L08", tipo: "positivo", nombre: "Sabor Botánico", desc: "Respondiste coherentemente sobre el enigma del tomate." },
    { id: "L09", tipo: "positivo", nombre: "Speedcuber Teórico", desc: "Le diste una respuesta digna sobre el cubo de Rubik." },
    { id: "L10", tipo: "positivo", nombre: "Ciberseguridad Básica", desc: "Estableciste credenciales con contraseña." },
    { id: "L11", tipo: "positivo", nombre: "Modo Hacker Activo", desc: "Navegaste usando el entorno verde neón." },
    { id: "L12", tipo: "positivo", nombre: "Purista Claro", desc: "Activaste el modo Claro sin quemarte los ojos." },
    { id: "L13", tipo: "positivo", nombre: "Caballero Oscuro", desc: "Configuraste la interfaz en modo Oscuro." },
    { id: "L14", tipo: "positivo", nombre: "Consultor Infatigable", desc: "Entraste al Modo Infinito." },
    { id: "L15", tipo: "positivo", nombre: "Respuesta Detallada", desc: "Escribiste una respuesta de más de 60 caracteres." },
    { id: "L16", tipo: "positivo", nombre: "Lógica Impecable", desc: "Obtuviste 3 respuestas aceptadas tipo 'OK' seguidas." },
    { id: "L17", tipo: "positivo", nombre: "Analista Clínico", desc: "Revisaste el Estado Analítico del sistema." },
    { id: "L18", tipo: "positivo", nombre: "Archivero", desc: "Inspeccionaste el Búfer de logs guardados." },
    { id: "L19", tipo: "positivo", nombre: "Copia de Seguridad", desc: "Copiaste los logs al portapapeles." },
    { id: "L20", tipo: "positivo", nombre: "Exportador de Datos", desc: "Descargaste el archivo físico de sesión." },
    { id: "L21", tipo: "positivo", nombre: "Identidad Protegida", desc: "Cambiaste el nombre de Invitado a un alias único." },
    { id: "L22", tipo: "positivo", nombre: "Insomnio Explicado", desc: "Aclaraste qué pasa si no se duerme en toda la noche." },
    { id: "L23", tipo: "positivo", nombre: "Ingeniería de Caminos", desc: "Diste una solución para el barranco." },
    { id: "L24", tipo: "positivo", nombre: "Musicólogo digital", desc: "Ayudaste a descifrar el 'tan tan tan tann'." },
    { id: "L25", tipo: "positivo", nombre: "Desbloqueador de Redes", desc: "Aclaraste las dudas sobre bloqueos." },
    { id: "L26", tipo: "positivo", nombre: "Soporte de Red", desc: "Solucionaste el fallo de carga de la web." },
    { id: "L27", tipo: "positivo", nombre: "IA de Confianza", desc: "Gugel te tiene guardado en marcadores mentales." },
    { id: "L28", tipo: "positivo", nombre: "Vocabulario Rico", desc: "Evitaste usar palabras repetitivas en tus envíos." },
    { id: "L29", tipo: "positivo", nombre: "Persistencia", desc: "Superaste 12 rounds totales combinadas." },
    { id: "L30", tipo: "positivo", nombre: "Mundo Algodón", desc: "Activaste el reluciente Tema Rosa." },
    { id: "L31", tipo: "positivo", nombre: "Odisea del Espacio", desc: "Estableciste la terminal en órbita con el Modo Espacial." },
    { id: "LN1", tipo: "negativo", nombre: "Aporrea-Teclados", desc: "Enviaste una secuencia incoherente sospechosa de spam." },
    { id: "LN2", tipo: "negativo", nombre: "IA Evasiva", desc: "Respondiste usando términos perezosos o monosílabos evasivos." },
    { id: "LN3", tipo: "negativo", nombre: "Incoherencia Total", desc: "Tu respuesta no tenía absoluta relación con los conceptos buscados." },
    { id: "LN4", tipo: "negativo", nombre: "Hundimiento del Sistema", desc: "La satisfacción del usuario cayó por debajo del 20%." },
    { id: "LN5", tipo: "negativo", nombre: "Cero Absoluto", desc: "Llegaste al 0% de satisfacción total." },
    { id: "LN6", tipo: "negativo", nombre: "Mensaje Efímero", desc: "Escribiste una respuesta ridículamente corta (menos de 4 letras)." },
    { id: "LN7", tipo: "negativo", nombre: "Bucle Repetitivo", desc: "Intentaste enviar exactamente el mismo texto que el turno anterior." },
    { id: "LN8", tipo: "negativo", nombre: "Usuario Furioso", desc: "Recibiste una crítica severa de Gugel por troleo." },
    { id: "LN9", tipo: "negativo", nombre: "Destrucción de Memoria", desc: "Usaste la opción de borrar todo el progreso." },
    { id: "LN10", tipo: "negativo", nombre: "Operador Sospechoso", desc: "Dejaste la contraseña vacía al registrarte." }
];

// ==========================================
// 2. SISTEMA MULTICUENTA Y ESTADOS
// ==========================================
let usuarioActivo = "Invitado";
let baseCuentas = {};
let cuentaInvitadoVolatil = null;
let esperandoRespuestaDeTurno = true;
let syncTimeout = null;
let revisandoHistorial = false;

// VARIABLES DE TEMPORIZADORES REALES
let globalSeconds = 0;
let querySeconds = 0;
let globalTimerInterval = null;
let queryTimerInterval = null;

if (localStorage.getItem('gugel-multiverse-v4')) {
    baseCuentas = JSON.parse(localStorage.getItem('gugel-multiverse-v4'));
    if (baseCuentas["Invitado"]) delete baseCuentas["Invitado"];
}

function crearEstructuraVacia() {
    return {
        modo: "infinito",
        campanaIndex: 0,
        satisfaction: 50,
        history: [],
        favorites: [],
        logrosDesbloqueados: [],
        recentReactions: [],
        lastUserText: "",
        password: "",
        campañaCompletada: false,
        currentPregunta: "",
        currentPreguntaCampana: "",
        currentPreguntaInfinito: "",
        esperandoCampana: true,
        esperandoInfinito: true,
        consecutiveOks: 0
    };
}

function asegurarEstructuraCuenta(nombre) {
    if (nombre === "Invitado") {
        if (!cuentaInvitadoVolatil) cuentaInvitadoVolatil = crearEstructuraVacia();
    } else {
        if (!baseCuentas[nombre]) {
            baseCuentas[nombre] = crearEstructuraVacia();
        } else {
            if (baseCuentas[nombre].esperandoCampana === undefined) baseCuentas[nombre].esperandoCampana = true;
            if (baseCuentas[nombre].esperandoInfinito === undefined) baseCuentas[nombre].esperandoInfinito = true;
            if (baseCuentas[nombre].consecutiveOks === undefined) baseCuentas[nombre].consecutiveOks = 0;
            if (baseCuentas[nombre].campañaCompletada === undefined) {
                baseCuentas[nombre].campañaCompletada = baseCuentas[nombre].campaignCompletada || false;
            }
        }
    }
}

asegurarEstructuraCuenta(usuarioActivo);

function salvarAStorage() {
    if (usuarioActivo !== "Invitado") {
        localStorage.setItem('gugel-multiverse-v4', JSON.stringify(baseCuentas));
    }
}

function getCuenta() {
    return usuarioActivo === "Invitado" ? cuentaInvitadoVolatil : baseCuentas[usuarioActivo];
}

// ==========================================
// 3. NÚCLEO DE TIEMPO (CRONÓMETROS ACTIVOS)
// ==========================================
function iniciarCronometros() {
    if (globalTimerInterval) clearInterval(globalTimerInterval);
    globalTimerInterval = setInterval(() => {
        globalSeconds++;
        let mins = String(Math.floor(globalSeconds / 60)).padStart(2, '0');
        let secs = String(globalSeconds % 60).padStart(2, '0');
        const el = document.getElementById('timer-global-val');
        if (el) el.innerText = `${mins}:${secs}`;
    }, 1000);

    resetQueryTimer();
}

function resetQueryTimer() {
    querySeconds = 0;
    const el = document.getElementById('timer-consulta-val');
    if (el) el.innerText = "0s";

    if (queryTimerInterval) clearInterval(queryTimerInterval);
    queryTimerInterval = setInterval(() => {
        querySeconds++;
        const elInner = document.getElementById('timer-consulta-val');
        if (elInner) elInner.innerText = `${querySeconds}s`;
    }, 1000);
}

function detenerQueryTimer() {
    if (queryTimerInterval) clearInterval(queryTimerInterval);
}

// ==========================================
// 4. MOTOR DE COHERENCIA Y LOGROS
// ==========================================
function evaluarCoherenciaYSpam(pregunta, respuesta) {
    let resp = respuesta.toLowerCase().trim();
    let preg = pregunta.toLowerCase();

    if (/([abcdefghijklmnopqrstuvwxyz])\1{3,}/.test(resp) || /^[bcdfghjklmnñpqrstvwxyz\s]{5,}$/.test(resp.replace(/[^a-z]/g, ''))) {
        desbloquearLogro("LN1");
        return "CRITICA";
    }

    if (EVASIVAS.includes(resp) || resp.length < 4) {
        if (resp.length < 4) desbloquearLogro("LN6");
        desbloquearLogro("LN2");
        return "RECHAZO";
    }

    let claveEncontrada = false;
    let tieneDiccionario = false;

    for (let palabraClave in MAPA_COHERENCIA) {
        if (preg.includes(palabraClave)) {
            tieneDiccionario = true;
            let sinonimos = MAPA_COHERENCIA[palabraClave];
            if (resp.includes(palabraClave) || sinonimos.some(s => resp.includes(s))) {
                claveEncontrada = true;
            }
        }
    }

    if (tieneDiccionario && !claveEncontrada) {
        desbloquearLogro("LN3");
        return "RECHAZO";
    }

    if (preg.includes("rubik") && claveEncontrada) desbloquearLogro("L09");
    if (preg.includes("tomate") && claveEncontrada) desbloquearLogro("L08");
    return "OK";
}

function desbloquearLogro(id) {
    let c = getCuenta();
    if (!c.logrosDesbloqueados.includes(id)) {
        c.logrosDesbloqueados.push(id);
        const logro = BASE_LOGROS.find(l => l.id === id);
        if (logro) {
            generarVentanitaSistema(
                logro.tipo === 'negativo' ? "⚠️ LOGRO NEGATIVO" : "🏆 ¡LOGRO DESBLOQUEADO!",
                `[${usuarioActivo}] ${logro.nombre.toUpperCase()}: ${logro.desc}`,
                logro.tipo
            );
        }
        salvarAStorage();
    }
}

function verificarLogrosDeEstado() {
    let c = getCuenta();
    if (c.history.length === 1) desbloquearLogro("L01");
    if (c.satisfaction >= 60) desbloquearLogro("L02");
    if (c.satisfaction >= 80) desbloquearLogro("L03");
    if (c.satisfaction >= 100) desbloquearLogro("L04");
}

// ==========================================
// 5. RENDERIZACIÓN Y PANELES (SWITCHVIEW)
// ==========================================
function switchView(viewId) {
    revisandoHistorial = false;
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    const panelObjetivo = document.getElementById(viewId);
    if (panelObjetivo) {
        panelObjetivo.classList.add('active');
        const btnPulsado = document.getElementById(`btn-${viewId}`);
        if (btnPulsado) btnPulsado.classList.add('active');
        
        if (viewId === "view-perfil") desbloquearLogro("L17");
        if (viewId === "view-historial") desbloquearLogro("L18");
    }
    renderAllData();
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (!box) return;
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    let etiqueta = sender === 'gugel' ? 'IA' : 'Usuario';
    msg.innerHTML = `<strong>${etiqueta}:</strong> ${text}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function renderChatActual() {
    let c = getCuenta();
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    chatMessages.innerHTML = "";

    if (esperandoRespuestaDeTurno) {
        if (!c.currentPregunta) {
            c.currentPregunta = c.modo === "campaña" ? PREGUNTAS_CAMPANA[c.campanaIndex] : generarPreguntaInfinita();
        }
        appendMessage('usuario', c.currentPregunta);
        const input = document.getElementById('user-input');
        input.value = "";
        input.style.display = "block";
        input.disabled = false;
        document.getElementById('transmit-btn').style.display = "block";
        document.getElementById('chat-actions-bar').style.display = "none";
        document.getElementById('continue-btn').style.display = "none";
    } else {
        let lastLog = c.history[c.history.length - 1];
        if (lastLog) {
            appendMessage('usuario', lastLog.pregunta);
            appendMessage('gugel', lastLog.respuesta);
            appendMessage('usuario', lastLog.reaccion);
        }
        document.getElementById('user-input').style.display = "none";
        document.getElementById('transmit-btn').style.display = "none";
        document.getElementById('chat-actions-bar').style.display = "block";
        document.getElementById('continue-btn').style.display = "block";
    }
}

function renderAllData() {
    let c = getCuenta();
    document.getElementById('sidebar-user-display').innerText = usuarioActivo;
    document.getElementById('prof-usuario').innerText = usuarioActivo;
    document.getElementById('prof-satisfaction').innerText = `${c.satisfaction}%`;

    let opcionesOpiniones = c.satisfaction < 35 ? OPINIONES_BAJA : c.satisfaction < 55 ? OPINIONES_MEDIA_BAJA : c.satisfaction < 80 ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA;
    document.getElementById('prof-opinion').innerText = opcionesOpiniones[Math.floor(Math.random() * opcionesOpiniones.length)];

    const histContainer = document.getElementById('history-list-container');
    if (histContainer) {
        if (c.history.length === 0) {
            histContainer.innerHTML = "<p style='color:var(--text-muted);'>Búfer de logs vacío.</p>";
        } else {
            histContainer.innerHTML = c.history.map((h, index) => `
                <div class="log-item-card">
                    <strong>Q:</strong> ${h.pregunta}<br>
                    <span style="color:var(--accent-color)"><strong>A:</strong> ${h.respuesta}</span>
                </div>
            `).join('');
        }
    }

    const favContainer = document.getElementById('favorites-list-container');
    if (favContainer) {
        favContainer.innerHTML = c.favorites.length === 0 ? "<p style='color:var(--text-muted);'>No hay marcadores.</p>" : c.favorites.map(f => `<div>⭐ ${f.pregunta} -> ${f.respuesta}</div>`).join('');
    }
}

// ==========================================
// 6. GESTIÓN DE VENTANAS EMERGENTES (MODALES)
// ==========================================
function abrirModalCuenta() {
    let c = getCuenta();
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('modal-cuenta-operador').classList.add('active');
    document.getElementById('account-username').value = usuarioActivo === "Invitado" ? "" : usuarioActivo;
    document.getElementById('account-password').value = c.password || "";
}

function cerrarModalCuenta() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.getElementById('modal-cuenta-operador').classList.remove('active');
}

function guardarNombreCuenta() {
    let nuevoUsuario = document.getElementById('account-username').value.trim();
    let nuevaPassword = document.getElementById('account-password').value;

    if (!nuevoUsuario) return;

    usuarioActivo = nuevoUsuario;
    asegurarEstructuraCuenta(usuarioActivo);
    let c = getCuenta();
    c.password = nuevaPassword;

    desbloquearLogro(nuevaPassword === "" ? "LN10" : "L10");
    if (nuevoUsuario !== "Invitado") desbloquearLogro("L21");

    salvarAStorage();
    cerrarModalCuenta();
    switchView('view-chat');
}

function abrirModalLogros() {
    let c = getCuenta();
    const container = document.getElementById('logros-container');
    container.innerHTML = "";

    BASE_LOGROS.forEach(l => {
        const obtenido = c.logrosDesbloqueados.includes(l.id);
        const div = document.createElement('div');
        div.className = `item-logro-alert ${l.tipo}`;
        div.innerHTML = `<strong>${obtenido ? '✅' : '🔒'} ${l.nombre}</strong> - ${l.desc}`;
        container.appendChild(div);
    });

    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('modal-logros-sistema').classList.add('active');
}

function cerrarModalLogros() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.getElementById('modal-logros-sistema').classList.remove('active');
}

function cerrarTodosLosModales() {
    cerrarModalCuenta();
    cerrarModalLogros();
}

// ==========================================
// 7. FLUJO DE RONDAS Y LÓGICA COMÚN
// ==========================================
function seleccionarModoJuego(modo) {
    let c = getCuenta();
    c.modo = modo;
    if (modo === "infinito") desbloquearLogro("L14");
    
    switchView('view-chat');
    
    document.querySelectorAll('.menu-section:first-child .sub-btn').forEach(b => b.classList.remove('active'));
    if (modo === 'infinito') {
        document.getElementById('btn-mode-infinito').classList.add('active');
    } else {
        document.getElementById('btn-mode-campana').classList.add('active');
    }
    
    if (modo === "campaña" && !PREGUNTAS_CAMPANA.includes(c.currentPregunta)) {
        nextRound();
    } else if (modo === "infinito" && PREGUNTAS_CAMPANA.includes(c.currentPregunta)) {
        nextRound();
    } else if (!c.currentPregunta) {
        nextRound();
    } else {
        renderChatActual();
    }
}

function generarPreguntaInfinita() {
    let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
    let sujeto = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
    let predicado = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
    return plantilla.replace("[s]", sujeto).replace("[p]", predicado);
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    let c = getCuenta();
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    detenerQueryTimer();
    appendMessage('gugel', text);

    let tipo = evaluarCoherenciaYSpam(c.currentPregunta, text);
    let reaccion = tipo === "CRITICA" ? FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)] : tipo === "RECHAZO" ? FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)] : FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)];

    if (tipo === "CRITICA") c.satisfaction -= 20;
    else if (tipo === "RECHAZO") c.satisfaction -= 15;
    else {
        c.satisfaction += 10;
        if (text.length > 60) desbloquearLogro("L15");
        c.consecutiveOks = (c.consecutiveOks || 0) + 1;
        if (c.consecutiveOks >= 3) desbloquearLogro("L16");
    }
    
    if (tipo !== "OK") {
        c.consecutiveOks = 0;
    }

    c.satisfaction = Math.max(0, Math.min(100, c.satisfaction));

    if (c.modo === "campaña") {
        c.campanaIndex++;
        if (c.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            desbloquearLogro("L05");
            c.campañaCompletada = true;
        }
    }

    setTimeout(() => {
        appendMessage('usuario', reaccion);
        c.history.push({ pregunta: c.currentPregunta, respuesta: text, reaccion: reaccion });
        esperandoRespuestaDeTurno = false;
        verificarLogrosDeEstado();
        salvarAStorage();
        renderChatActual();
        renderAllData();
    }, 600);
};

function nextRound() {
    let c = getCuenta();
    if (c.modo === "campaña") {
        if (c.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            c.campanaIndex = 0;
        }
        c.currentPregunta = PREGUNTAS_CAMPANA[c.campanaIndex];
    } else {
        c.currentPregunta = generarPreguntaInfinita();
    }
    esperandoRespuestaDeTurno = true;
    resetQueryTimer();
    renderChatActual();
}

function clickBotonContinuar() {
    nextRound();
}

function cambiarTema(tema) {
    document.body.className = tema;
    localStorage.setItem('gugel-tema', tema);
    if (tema === "modo-hacker") desbloquearLogro("L11");
    if (tema === "modo-claro") desbloquearLogro("L12");
    if (tema === "modo-oscuro") desbloquearLogro("L13");
    if (tema === "modo-rosa") desbloquearLogro("L30");
    if (tema === "modo-espacial") desbloquearLogro("L31");
}

function generarVentanitaSistema(titulo, mensaje, tipo) {
    const contenedor = document.getElementById('contenedor-notificaciones-sistema');
    if (!contenedor) return;
    const div = document.createElement('div');
    div.className = `ventanita-notificacion-flotante ${tipo}`;
    div.innerHTML = `<strong>${titulo}</strong><br>${mensaje}`;
    contenedor.appendChild(div);
    setTimeout(() => div.remove(), 4000);
}

window.addEventListener('DOMContentLoaded', () => {
    const tema = localStorage.getItem('gugel-tema') || 'modo-hacker';
    cambiarTema(tema);
    document.getElementById('theme-select').value = tema;
    iniciarCronometros();
    
    let c = getCuenta();
    seleccionarModoJuego(c.modo || 'infinito');
});
