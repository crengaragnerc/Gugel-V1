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
    { id: "L05", tipo: "positivo", nombre: "Operador de Élite", desc: "Completaste las 10 preguntas de la Campaña." },
    { id: "L06", tipo: "positivo", nombre: "Guardado Seguro", desc: "Añadiste tu primera consulta a Favoritos." },
    { id: "L07", tipo: "positivo", nombre: "Coleccionista de Estrellas", desc: "Guardaste 3 elementos en Favoritos." },
    { id: "L08", tipo: "positivo", nombre: "Sabor Botánico", desc: "Respondiste coherentemente sobre el enigma del tomate." },
    { id: "L09", tipo: "positivo", nombre: "Speedcuber Teórico", desc: "Le diste una respuesta digna sobre el cubo de Rubik." },
    { id: "L10", tipo: "positivo", nombre: "Ciberseguridad Básica", desc: "Establebiste credenciales con contraseña." },
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
    { id: "LN1", tipo: "negativo", nombre: "Aporrea-Teclados", desc: "Enviaste una secuencia incoherente." },
    { id: "LN2", tipo: "negativo", nombre: "IA Evasiva", desc: "Respondiste usando términos perezosos." },
    { id: "LN3", tipo: "negativo", nombre: "Incoherencia Total", desc: "Tu respuesta no tenía relación con los conceptos." },
    { id: "LN4", tipo: "negativo", nombre: "Hundimiento del Sistema", desc: "Satisfacción por debajo del 20%." },
    { id: "LN5", tipo: "negativo", nombre: "Cero Absoluto", desc: "Llegaste al 0% de satisfacción total." },
    { id: "LN6", tipo: "negativo", nombre: "Mensaje Efímero", desc: "Escribiste menos de 4 letras." },
    { id: "LN7", tipo: "negativo", nombre: "Bucle Repetitivo", desc: "Intentaste enviar el mismo texto." },
    { id: "LN8", tipo: "negativo", nombre: "Usuario Furioso", desc: "Recibiste una crítica severa." },
    { id: "LN9", tipo: "negativo", nombre: "Destrucción de Memoria", desc: "Usaste la opción de borrar todo." },
    { id: "LN10", tipo: "negativo", nombre: "Operador Sospechoso", desc: "Dejaste la contraseña vacía." }
];

// ==========================================
// 2. SISTEMA DE DATOS Y ESTADO
// ==========================================
let usuarioActivo = "Invitado";
let baseCuentas = JSON.parse(localStorage.getItem('gugel-multiverse-v4')) || {};
let cuentaInvitadoVolatil = null; 
let esperandoRespuestaDeTurno = true; 

function crearEstructuraVacia() {
    return { modo: "campaña", campanaIndex: 0, satisfaction: 50, history: [], logrosDesbloqueados: [], campanaIndex: 0, currentPregunta: "", currentPreguntaCampana: "", currentPreguntaInfinito: "", esperandoCampana: true, esperandoInfinito: true };
}

function getCuenta() {
    if (usuarioActivo === "Invitado") {
        if (!cuentaInvitadoVolatil) cuentaInvitadoVolatil = crearEstructuraVacia();
        return cuentaInvitadoVolatil;
    }
    if (!baseCuentas[usuarioActivo]) baseCuentas[usuarioActivo] = crearEstructuraVacia();
    return baseCuentas[usuarioActivo];
}

function salvarAStorage() {
    if (usuarioActivo !== "Invitado") localStorage.setItem('gugel-multiverse-v4', JSON.stringify(baseCuentas));
}

// ==========================================
// 3. MOTOR DE LÓGICA Y COHERENCIA
// ==========================================
function evaluarCoherenciaYSpam(pregunta, respuesta) {
    let resp = respuesta.toLowerCase().trim();
    let preg = pregunta.toLowerCase();

    if (resp.length < 4) return "RECHAZO";
    
    let claveEncontrada = false;
    let tieneDiccionario = false;
    for (let palabraClave in MAPA_COHERENCIA) {
        if (preg.includes(palabraClave)) {
            tieneDiccionario = true;
            let sinonimos = MAPA_COHERENCIA[palabraClave];
            if (resp.includes(palabraClave) || sinonimos.some(s => resp.includes(s))) claveEncontrada = true;
        }
    }
    return (tieneDiccionario && !claveEncontrada) ? "RECHAZO" : "OK";
}

function generarPreguntaInfinita() {
    let p = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
    return p.replace("[s]", INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)]).replace("[p]", INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)]);
}

// ==========================================
// 4. INTERFAZ Y RENDERIZADO
// ==========================================
function renderizarTodoEstadoActual() {
    let c = getCuenta();
    // Actualizar pregunta
    if (!c.currentPregunta) c.currentPregunta = (c.modo === "campaña") ? PREGUNTAS_CAMPANA[c.campanaIndex || 0] : generarPreguntaInfinita();
    document.getElementById('texto-pregunta').textContent = c.currentPregunta;
    
    // Actualizar barras
    document.getElementById('satisfaction-value').textContent = `${c.satisfaction}%`;
    document.getElementById('satisfaction-bar').style.width = `${c.satisfaction}%`;
    document.getElementById('logros-count').textContent = c.logrosDesbloqueados.length;

    // Renderizar Chats
    const container = document.getElementById('chat-logs-render');
    container.innerHTML = "";
    c.history.forEach(h => {
        let q = document.createElement('div'); q.className = "chat-bubble gugel"; q.textContent = "Gugel: " + h.pregunta;
        let a = document.createElement('div'); a.className = "chat-bubble operador"; a.textContent = "Tú: " + h.respuesta;
        container.appendChild(q); container.appendChild(a);
    });
}

function enviarRespuesta(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('user-response-input');
    let texto = input.value.trim();
    if (!texto) return;

    let c = getCuenta();
    c.history.push({ pregunta: c.currentPregunta, respuesta: texto });
    
    // Lógica de avance
    if (c.modo === "campaña") c.campanaIndex++;
    c.currentPregunta = ""; // Resetear para que genere la siguiente
    
    input.value = "";
    salvarAStorage();
    renderizarTodoEstadoActual();
}

// ==========================================
// 5. INICIALIZACIÓN
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('chat-form').addEventListener('submit', enviarRespuesta);
    renderizarTodoEstadoActual();
});

function seleccionarModoJuego(modo) { getCuenta().modo = modo; getCuenta().currentPregunta = ""; renderizarTodoEstadoActual(); }
function switchView(id) { document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active-view')); document.getElementById(id).classList.add('active-view'); }
function abrirModalCuenta() { document.getElementById('modal-cuenta-sistema').style.display = 'flex'; }
function cerrarModalCuenta() { document.getElementById('modal-cuenta-sistema').style.display = 'none'; }
function reiniciarProgresoCompleto() { if(confirm("¿Seguro?")) { if(usuarioActivo === "Invitado") cuentaInvitadoVolatil = crearEstructuraVacia(); else baseCuentas[usuarioActivo] = crearEstructuraVacia(); salvarAStorage(); renderizarTodoEstadoActual(); } }
function cambiarTemaPantalla(tema) { document.body.className = tema; localStorage.setItem('gugel-tema', tema); }
function guardarNombreCuenta() { usuarioActivo = document.getElementById('account-username').value; cerrarModalCuenta(); renderizarTodoEstadoActual(); }
function clickBotonContinuar() { renderizarTodoEstadoActual(); }
