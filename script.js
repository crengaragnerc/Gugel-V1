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
    
    // LOGROS NEGATIVOS
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
// 2. SISTEMA MULTICUENTA DE DATOS AISLADOS
// ==========================================
let usuarioActivo = "Invitado";
let baseCuentas = {};
let cuentaInvitadoVolatil = null; 
let esperandoRespuestaDeTurno = true; 
let syncTimeout = null; 
let revisarHistorial = false; 

if (localStorage.getItem('gugel-multiverse-v4')) {
    baseCuentas = JSON.parse(localStorage.getItem('gugel-multiverse-v4'));
    if (baseCuentas["Invitado"]) delete baseCuentas["Invitado"]; 
}

function crearEstructuraVacia() {
    return {
        modo: "campaña",
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
        esperandoInfinito: true
    };
}

function asegurarEstructuraCuenta(nombre) {
    if (nombre === "Invitado") {
        if (!cuentaInvitadoVolatil) {
            cuentaInvitadoVolatil = crearEstructuraVacia();
        }
    } else {
        if (!baseCuentas[nombre]) {
            baseCuentas[nombre] = crearEstructuraVacia();
        } else {
            if (baseCuentas[nombre].esperandoCampana === undefined) baseCuentas[nombre].esperandoCampana = true;
            if (baseCuentas[nombre].esperandoInfinito === undefined) baseCuentas[nombre].esperandoInfinito = true;
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
    if (usuarioActivo === "Invitado") {
        return cuentaInvitadoVolatil;
    }
    return baseCuentas[usuarioActivo];
}

function sincronizarEstadoTurno(c) {
    if (c.modo === "campaña") {
        if (!c.currentPreguntaCampana) {
            if (c.currentPregunta) {
                c.currentPreguntaCampana = c.currentPregunta;
            } else {
                c.currentPreguntaCampana = PREGUNTAS_CAMPANA[c.campanaIndex] || PREGUNTAS_CAMPANA[0];
                c.campanaIndex++;
            }
            c.esperandoCampana = true;
        }
        c.currentPregunta = c.currentPreguntaCampana;
        esperandoRespuestaDeTurno = c.esperandoCampana;
    } else {
        if (!c.currentPreguntaInfinito) {
            c.currentPreguntaInfinito = generarPreguntaInfinita();
            c.esperandoInfinito = true;
        }
        c.currentPregunta = c.currentPreguntaInfinito;
        esperandoRespuestaDeTurno = c.esperandoInfinito;
    }

    if (c.history.length > 0 && c.history[c.history.length - 1].pregunta === c.currentPregunta) {
        esperandoRespuestaDeTurno = false;
        if (c.modo === "campaña") c.esperandoCampana = false;
        else c.esperandoInfinito = false;
    }
}

// ==========================================
// 3. MOTOR DE COHERENCIA Y LOGROS
// ==========================================
function evaluarCoherenciaYSpam(pregunta, respuesta) {
    let resp = respuesta.toLowerCase().trim();
    let preg = pregunta.toLowerCase();

    if (/([abcdefghijklmnopqrstuvwxyz])\1{3,}/.test(resp) || /^[bcdfghjklmnñpqrstvwxyz\s]{5,}$/.test(resp.replace(/[^a-z]/g, ''))) {
        desbloquearLogro("LN1");
        return "CRITICA";
    }
    
    if (resp.includes("fighfd") || resp.includes("fhbifbh") || resp.includes("qwerty") || resp.includes("asdf")) {
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
    if (preg.includes("dormir") && claveEncontrada) desbloquearLogro("L22");
    if (preg.includes("barranco") && claveEncontrada) desbloquearLogro("L23");
    if (preg.includes("cancion") && claveEncontrada) desbloquearLogro("L24");
    if (preg.includes("bloqueado") && claveEncontrada) desbloquearLogro("L25");
    if (preg.includes("web") && claveEncontrada) desbloquearLogro("L26");

    if (resp.length > 60) desbloquearLogro("L15");

    return "OK";
}

function desbloquearLogro(id) {
    let c = getCuenta();
    if (c.logrosDesbloqueados.includes(id)) return;

    c.logrosDesbloqueados.push(id);
    salvarAStorage();

    const lg = BASE_LOGROS.find(l => l.id === id);
    if (lg) {
        generarVentanitaSistema(
            lg.tipo === "positivo" ? "🏆 ¡LOGRO DESBLOQUEADO!" : "⚠️ ALERTA DE LOGRO NEGATIVO",
            `${lg.nombre}: ${lg.desc}`,
            lg.tipo
        );
    }
    actualizarVistaLogrosDOM();
}

function generarPreguntaInfinita() {
    let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
    let s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
    let p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
    return plantilla.replace("[s]", s).replace("[p]", p);
}

// ==========================================
// 4. CONTROLADORES DE JUEGO Y FLUJO TERMINAL
// ==========================================
function seleccionarModoJuego(nuevoModo) {
    let c = getCuenta();
    if (c.modo === nuevoModo) return;

    c.modo = nuevoModo;
    if (nuevoModo === "infinito") {
        desbloquearLogro("L14");
    }
    sincronizarEstadoTurno(c);
    salvarAStorage();
    renderizarTodoEstadoActual();
}

function enviarRespuesta(e) {
    if (e) e.preventDefault();
    if (!esperandoRespuestaDeTurno) return;

    const input = document.getElementById('user-response-input');
    if (!input) return;

    let texto = input.value.trim();
    if (!texto) return;

    let c = getCuenta();
    if (texto === c.lastUserText) {
        desbloquearLogro("LN7");
    }
    c.lastUserText = texto;

    let tipoEval = evaluarCoherenciaYSpam(c.currentPregunta, texto);
    let delta = 0;
    let fraseFeed = "";
    let opinionFeed = "";

    if (tipoEval === "OK") {
        delta = Math.floor(Math.random() * 11) + 10; 
        fraseFeed = FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)];
        opinionFeed = OPINIONES_ALTA[Math.floor(Math.random() * OPINIONES_ALTA.length)];
        
        let ultimosTres = c.history.slice(-2).map(h => h.evaluacion);
        if (ultimosTres.length === 2 && ultimosTres.every(ev => ev === "OK")) {
            desbloquearLogro("L16");
        }
        desbloquearLogro("L01");
    } else if (tipoEval === "RECHAZO") {
        delta = -(Math.floor(Math.random() * 11) + 10); 
        fraseFeed = FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
        opinionFeed = OPINIONES_MEDIA_BAJA[Math.floor(Math.random() * OPINIONES_MEDIA_BAJA.length)];
    } else {
        delta = -(Math.floor(Math.random() * 16) + 15); 
        fraseFeed = FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)];
        opinionFeed = OPINIONES_BAJA[Math.floor(Math.random() * OPINIONES_BAJA.length)];
        desbloquearLogro("LN8");
    }

    c.satisfaction = Math.max(0, Math.min(100, c.satisfaction + delta));

    if (c.satisfaction >= 60) desbloquearLogro("L02");
    if (c.satisfaction >= 80) desbloquearLogro("L03");
    if (c.satisfaction === 100) desbloquearLogro("L04");
    if (c.satisfaction < 20) desbloquearLogro("LN4");
    if (c.satisfaction === 0) desbloquearLogro("LN5");

    c.history.push({
        pregunta: c.currentPregunta,
        respuesta: texto,
        reaccion: fraseFeed,
        opinion: opinionFeed,
        evaluacion: tipoEval,
        fav: false
    });

    if (c.history.filter(h => h.fav).length >= 3) {
        desbloquearLogro("L07");
    }

    if (c.modo === "campaña") {
        c.esperandoCampana = false;
        if (c.campanaIndex >= PREGUNTAS_CAMPANA.length && !c.campañaCompletada) {
            c.campañaCompletada = true;
            desbloquearLogro("L05");
        }
    } else {
        c.esperandoInfinito = false;
    }

    if ((c.history.length + (c.modo === "campaña" ? 0 : 0)) >= 12) {
        desbloquearLogro("L29");
    }

    esperandoRespuestaDeTurno = false;
    input.value = "";
    salvarAStorage();
    renderizarTodoEstadoActual();
}

function clickBotonContinuar() {
    let c = getCuenta();
    if (esperandoRespuestaDeTurno) return;

    if (c.modo === "campaña") {
        c.currentPreguntaCampana = "";
    } else {
        c.currentPreguntaInfinito = "";
    }
    sincronizarEstadoTurno(c);
    salvarAStorage();
    renderizarTodoEstadoActual();
}

// ==========================================
// 5. INTERFAZ VISUAL, DOM Y RENDERIZADO
// ==========================================
function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active-view'));
    document.querySelectorAll('.sub-btn').forEach(b => {
        if(b.id !== 'btn-open-cuenta') b.classList.remove('active');
    });

    const panel = document.getElementById(viewId);
    if (panel) panel.classList.add('active-view');

    if (viewId === 'view-juego') {
        let c = getCuenta();
        if (c.modo === 'campaña') document.getElementById('btn-modo-campaña').classList.add('active');
        else document.getElementById('btn-modo-infinito').classList.add('active');
    } else {
        const btn = document.getElementById(`btn-${viewId}`);
        if (btn) btn.classList.add('active');
    }

    if (viewId === 'view-perfil') desbloquearLogro("L17");
    if (viewId === 'view-historial') desbloquearLogro("L18");
}

function renderizarTodoEstadoActual() {
    let c = getCuenta();
    sincronizarEstadoTurno(c);

    document.getElementById('texto-pregunta').textContent = c.currentPregunta;
    document.getElementById('modo-badge').textContent = `MODO: ${c.modo.toUpperCase()}`;

    if (c.history.length > 0) {
        let ult = c.history[c.history.length - 1];
        document.getElementById('texto-opinion').textContent = ult.opinion;
    } else {
        document.getElementById('texto-opinion').textContent = "(Evaluando comportamiento del operador...)";
    }

    const chatContainer = document.getElementById('chat-logs-render');
    chatContainer.innerHTML = "";

    c.history.forEach((h, index) => {
        let bubbleQ = document.createElement('div');
        bubbleQ.className = "chat-bubble gugel";
        bubbleQ.innerHTML = `<strong>Gugel:</strong> ${h.pregunta}`;
        chatContainer.appendChild(bubbleQ);

        let bubbleA = document.createElement('div');
        bubbleA.className = "chat-bubble operador";
        bubbleA.innerHTML = `<strong>Tú (IA):</strong> ${h.respuesta}`;
        chatContainer.appendChild(bubbleA);

        let bubbleR = document.createElement('div');
        bubbleR.className = "chat-bubble gugel";
        let starClass = h.fav ? "⭐" : "📁";
        bubbleR.innerHTML = `
            <button class="star-fav-btn" onclick="conmutarFavoritoLog(${index})">${starClass}</button>
            <strong>Gugel:</strong> ${h.reaccion}
        `;
        chatContainer.appendChild(bubbleR);
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const btnContinuar = document.getElementById('continue-btn');
    if (!esperandoRespuestaDeTurno) {
        btnContinuar.style.display = "block";
        if (c.modo === 'campaña' && c.campanaIndex >= PREGUNTAS_CAMPANA.length && !c.currentPreguntaCampana) {
            btnContinuar.textContent = "CAMPAÑA COMPLETADA CON ÉXITO";
        } else {
            btnContinuar.textContent = "SIGUIENTE CONSULTA >>";
        }
    } else {
        btnContinuar.style.display = "none";
    }

    document.getElementById('satisfaction-value').textContent = `${c.satisfaction}%`;
    document.getElementById('satisfaction-bar').style.width = `${c.satisfaction}%`;
    document.getElementById('total-queries-value').textContent = c.history.length;

    document.getElementById('sidebar-user-display').textContent = usuarioActivo;

    actualizarVistaLogrosDOM();
    actualizarVistaHistorialDOM();
}

function conmutarFavoritoLog(index) {
    let c = getCuenta();
    if (!c.history[index]) return;

    c.history[index].fav = !c.history[index].fav;
    if (c.history[index].fav) {
        desbloquearLogro("L06");
    }
    salvarAStorage();
    renderizarTodoEstadoActual();
}

function cambiarTemaPantalla(tema) {
    document.body.className = tema;
    localStorage.setItem('gugel-tema', tema);

    if (tema === 'modo-hacker') desbloquearLogro("L11");
    if (tema === 'modo-claro') desbloquearLogro("L12");
    if (tema === 'modo-oscuro') desbloquearLogro("L13");
    if (tema === 'modo-rosa') desbloquearLogro("L30");
    if (tema === 'modo-espacial') desbloquearLogro("L31");
}

// ==========================================
// 6. GESTIÓN DE MODALES, EXPORTACIONES Y CUENTAS
// ==========================================
function abrirModalCuenta() {
    document.getElementById('modal-cuenta-sistema').style.display = 'flex';
    document.getElementById('panel-user-status').textContent = usuarioActivo;
    document.getElementById('account-username').value = usuarioActivo === 'Invitado' ? '' : usuarioActivo;
    document.getElementById('account-password').value = "";
}

function cerrarModalCuenta() {
    document.getElementById('modal-cuenta-sistema').style.display = 'none';
}

function guardarNombreCuenta() {
    let userIn = document.getElementById('account-username').value.trim();
    let passIn = document.getElementById('account-password').value;

    if (!userIn || userIn === "Invitado") {
        generarVentanitaSistema("❌ IDENTIDAD RECHAZADA", "Elige un alias de operador válido.", "negativo");
        return;
    }

    if (!passIn) {
        desbloquearLogro("LN10");
    } else {
        desbloquearLogro("L10");
    }

    if (baseCuentas[userIn]) {
        if (baseCuentas[userIn].password && baseCuentas[userIn].password !== passIn) {
            generarVentanitaSistema("❌ ACCESO DENEGADO", "Contraseña de terminal incorrecta.", "negativo");
            return;
        }
    }

    usuarioActivo = userIn;
    asegurarEstructuraCuenta(usuarioActivo);
    if (passIn) {
        baseCuentas[usuarioActivo].password = passIn;
    }

    desbloquearLogro("L21");
    salvarAStorage();
    cerrarModalCuenta();
    renderizarTodoEstadoActual();
    generarVentanitaSistema("⚙️ NÚCLEO VINCULADO", `Sesión establecida como: ${usuarioActivo}`, "positivo");
}

function reiniciarProgresoCompleto() {
    desbloquearLogro("LN9");
    if (usuarioActivo === "Invitado") {
        cuentaInvitadoVolatil = crearEstructuraVacia();
    } else {
        baseCuentas[usuarioActivo] = crearEstructuraVacia();
        salvarAStorage();
    }
    renderizarTodoEstadoActual();
    switchView('view-juego');
}

function exportCoreData() {
    let c = getCuenta();
    let texto = c.history.map(h => `Q: ${h.pregunta}\nA: ${h.respuesta}\nEVAL: ${h.evaluacion}`).join('\n\n');
    navigator.clipboard.writeText(texto || "Búfer vacío.");
    desbloquearLogro("L19");
}

function exportarHistorialCompleto() {
    let c = getCuenta();
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(c, null, 4));
    let dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `gugel_core_${usuarioActivo}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    desbloquearLogro("L20");
}

// ==========================================
// 7. ACTUALIZACIÓN DEL DOM ADICIONAL
// ==========================================
function actualizarVistaLogrosDOM() {
    let c = getCuenta();
    document.getElementById('logros-count').textContent = c.logrosDesbloqueados.length;

    const container = document.getElementById('logros-container');
    if (!container) return;

    container.innerHTML = BASE_LOGROS.map(l => {
        let descbloqueado = c.logrosDesbloqueados.includes(l.id);
        let opacity = descbloqueado ? 1 : 0.35;
        let border = descbloqueado ? (l.tipo === 'positivo' ? 'border-left:4px solid var(--accent-color)' : 'border-left:4px solid var(--negative-color)') : 'border-left:4px solid gray';
        return `
            <div class="item-logro" style="opacity: ${opacity}; ${border}">
                <strong>${descbloqueado ? '✅' : '🔒'} ${l.nombre}</strong> [${l.id}]<br>
                <span style="font-size:0.85rem; color:var(--text-muted);">${l.desc}</span>
            </div>
        `;
    }).join('');
}

function renderFavorites() {
    let c = getCuenta();
    const favContainer = document.getElementById('favorites-list-container');
    if (!favContainer) return;

    let favs = c.history.filter(h => h.fav);
    if (favs.length === 0) {
        favContainer.innerHTML = "<p style='color:var(--text-muted); font-size:0.9rem;'>No hay marcadores favoritos.</p>";
    } else {
        favContainer.innerHTML = favs.map(h => `
            <div class="log-item-card" style="border-left: 3px solid gold;">
                <div class="log-item-info">
                    <strong>Q:</strong> ${h.pregunta}<br>
                    <span style="font-size:0.85rem; color:var(--text-muted);">Resp: ${h.respuesta}</span>
                </div>
            </div>
        `).join('');
    }
}

function cargarChatHistorico(index) {
    let c = getCuenta();
    let h = c.history[index];
    if (!h) return;
    
    if (!esperandoRespuestaDeTurno) {
        generarVentanitaSistema("📁 VISTA LOGS", "Cargando consulta del búfer al editor.", "positivo");
        const input = document.getElementById('user-response-input');
        if (input) input.value = h.respuesta;
        switchView('view-juego');
    }
}

function actualizarVistaHistorialDOM() {
    let c = getCuenta();
    const container = document.getElementById('history-list-container');
    if (!container) return;

    if (c.history.length === 0) {
        container.innerHTML = "<p style='color:var(--text-muted);'>Búfer de logs vacío.</p>";
    } else {
        container.innerHTML = c.history.map((h, index) => `
            <div class="log-item-card" onclick="cargarChatHistorico(${index})">
                <div class="log-item-info">
                    <strong>Q:</strong> ${h.pregunta}<br>
                    <span style="font-size:0.85rem; color:var(--text-muted);">Resp: ${h.respuesta}</span>
                </div>
            </div>
        `).join('');
    }
    
    renderFavorites();
}

// ==========================================
// 8. NOTIFICACIONES INTERNAS FLOTANTES (TOASTS)
// ==========================================
function generarVentanitaSistema(titulo, mensaje, claseTipo = "positivo") {
    const contenedor = document.getElementById('notificaciones-sistema');
    if (!contenedor) return;

    const nuevaVentanita = document.createElement('div');
    nuevaVentanita.className = `ventanita-notificacion-flotante ${claseTipo}`;

    nuevaVentanita.innerHTML = `
        <div class="toast-titulo">${titulo}</div>
        <div class="toast-cuerpo">${mensaje}</div>
    `;

    contenedor.appendChild(nuevaVentanita);

    // Reducido el tiempo de espera de 4000 a 2000 milisegundos (2 segundos)
    setTimeout(() => {
        nuevaVentanita.classList.add('salida-toast');
        nuevaVentanita.addEventListener('transitionend', () => {
            nuevaVentanita.remove();
        });
    }, 2000);
}

function disparoLogroPrueba() {
    generarVentanitaSistema(
        "🏆 ¡LOGRO DESBLOQUEADO!",
        "Pensamiento Artificial: Has procesado una petición en menos de 0.5 segundos.",
        "positivo"
    );
}

function disparoOperadorPrueba() {
    generarVentanitaSistema(
        "⚙️ GESTIÓN DE CUENTA",
        "Cuenta de operador vinculada correctamente al núcleo del simulador.",
        "positivo"
    );
}

// ==========================================
// 9. EVENTO INICIAL DE CARGA
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('gugel-tema') || 'modo-hacker';
    document.body.className = temaGuardado;
    const s = document.getElementById('theme-select');
    if (s) s.value = temaGuardado;
    
    let c = getCuenta();
    sincronizarEstadoTurno(c);
    
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', enviarRespuesta);
    }
    
    renderizarTodoEstadoActual();
});
