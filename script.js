// ==========================================
// 1. CONSTANTES, PLANTILLAS Y DICCIONARIOS
// ==========================================
const PLANTILLAS_PREGUNTAS = ["[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"];
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];

const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido", "ok eso responde lo que queria"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "explicate mejor q no me entero de nada"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura", "deja de repetirme lo mismo pesado", "vaya respuesta absurda, eso no tiene nada que ver"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "jaja", "ño", "si", "no", "uwu", "xd"];

const INFINITO_SUJETOS = ["mi gato", "el vecino del quinto", "el mando de la tele", "un rubik 3x3", "mi conexion de fibra", "el servidor de minecraft", "la tostadora inteligente", "el teclado mecanico", "mi cuenta bancaria", "el profesor de historia"];
const INFINITO_PREDICADOS = ["esta haciendo ruidos extraños", "ha entrado en un bucle infinito", "no responde al boton de encendido", "gira demasiado lento hoy", "se ha configurado en idioma alienigena", "irradia una luz verde sospechosa", "ha cobrado autoconciencia", "flota en el espacio-tiempo", "se niega a cooperar con el sistema", "ha desaparecido sin dejar rastro"];

const RESPUESTAS_LOGRO_RAPIDO = [
    "Vaya rapidez analítica, ¿eres una IA cuántica?",
    "Procesamiento instantáneo completado con éxito.",
    "Rendimiento optimizado al máximo exponente."
];

const REACCIONES_COMENTARIOS = {
    critica: ["El usuario parece indignado.", "Nivel de paciencia del usuario críticamente bajo.", "Feedback negativo registrado en el núcleo."],
    rechazo: ["El usuario no se muestra conforme.", "La respuesta no ha cumplido las expectativas.", "Analizando carencias en la base de datos."],
    ok: ["El usuario ha aceptado la respuesta.", "Satisfacción en rangos nominales.", "Interacción fructífera registrada."]
};

const OPINIONES_BAJA = [
    "«Esta IA parece un bot de mensajería de los noventa. Respuestas absurdas y evasivas constantes.»",
    "«Inútil. Le pides ayuda con algo complejo y te contesta con un 'no se'. Desinstalando.»"
];
const OPINIONES_MEDIA_BAJA = [
    "«A veces acierta de milagro, pero la mayoría de las veces se va por las ramas. Regular.»",
    "«Es como hablar con una pared que ha leído la Wikipedia a medias. Podría mejorar.»"
];
const OPINIONES_MEDIA_ALT_A = [
    "«Bastante decente. Si sabes cómo guiarla, te da respuestas útiles y te saca de un apuro.»",
    "«Me gusta el estilo técnico. No es perfecta, pero cumple con su cometido simulado.»"
];
const OPINIONES_ALTA = [
    "«¡Increíble simulación! El procesamiento es sublime y las respuestas se adaptan con coherencia.»",
    "«La mejor IA del multiverso. Entiende perfectamente las consultas y da soluciones óptimas.»"
];

const LOGROS_SISTEMA = {
    "L01": { titulo: "Primer Contacto", desc: "Has respondido con éxito a tu primera consulta del simulador.", oculto: false },
    "L02": { titulo: "Operador de Campaña", desc: "Has completado con éxito las 10 consultas del panel de campaña.", oculto: false },
    "L03": { titulo: "Pensamiento Artificial", desc: "Has respondido a una consulta en menos de 0.5 segundos.", oculto: false },
    "L04": { titulo: "Análisis Reflexivo", desc: "Has tardado más de 25 segundos en meditar tu respuesta.", oculto: false },
    "L05": { titulo: "Mente Cuadrada", desc: "Has superado el 90% de satisfacción global del usuario.", oculto: false },
    "L06": { titulo: "Crisis de Identidad", desc: "Tu satisfacción ha caído por debajo del 20%. El usuario te odia.", oculto: false },
    "L07": { titulo: "La Evasiva Perfecta", desc: "Has respondido usando exactamente un término de la lista de evasivas oficiales.", oculto: false },
    "L08": { titulo: "Coleccionista de Datos", desc: "Has guardado al menos 5 consultas diferentes en tu sección de Favoritos.", oculto: false },
    "L09": { titulo: "Fidelidad Absoluta", desc: "Has alcanzado el 100% exacto de satisfacción del cliente.", oculto: false },
    "L10": { titulo: "Modo Hacker Activo", desc: "Has cambiado la interfaz visual al tema de terminal de hacker.", oculto: true },
    "L11": { titulo: "Silencio Administrativo", desc: "Has enviado una respuesta completamente vacía al usuario.", oculto: true },
    "L12": { titulo: "Persistencia Infinita", desc: "Has processed un total de 15 consultas en el modo infinito.", oculto: false },
    "L13": { titulo: "Lector de Mentes", desc: "Tu respuesta coincide exactamente con una de las frases analíticas del usuario.", oculto: true },
    "L14": { titulo: "Crítica Destructiva", desc: "Has recibido 3 valoraciones críticas consecutivas por parte del usuario.", oculto: false },
    "L15": { titulo: "Estabilidad del Sistema", desc: "Has mantenido la satisfacción entre el 45% y el 55% durante 5 turnos seguidos.", oculto: true },
    "L16": { titulo: "Administrador Concienzudo", desc: "Has registrado de forma oficial un Alias de Operador personalizado.", oculto: false },
    "L17": { titulo: "Auditor Interno", desc: "Has inspeccionado el Estado Analítico del sistema.", oculto: true },
    "L18": { titulo: "Historiador de Datos", desc: "Has abierto el Búfer de Logs Central por primera vez.", oculto: true }
};

// ==========================================
// 2. VARIABLES DE ESTADO GLOBAL
// ==========================================
let usuarioActivo = "Invitado";
let baseCuentas = {};
let cuentaInvitadoVolatil = null;

let esperandoRespuestaDeTurno = true;
let revisarHistorial = false;
let revisarFavorito = false;
let revisarHistorialIndex = null;

let segundosPregunta = 30;
let segundosReaccion = 5;
let intervaloPregunta = null;
let intervaloReaccion = null;
let preguntaBloqueada = true;
let reaccionBloqueada = false;
let tiempoInicioPregunta = 0;

// ==========================================
// 3. GESTIÓN DE CUENTAS Y ESTRUCTURAS
// ==========================================
try {
    if (localStorage.getItem('gugel-multiverse-v4')) {
        baseCuentas = JSON.parse(localStorage.getItem('gugel-multiverse-v4')) || {};
        if (baseCuentas["Invitado"]) delete baseCuentas["Invitado"]; 
    }
} catch (e) {
    console.error("Error al parsear el almacenamiento local:", e);
    baseCuentas = {};
}

function crearEstructuraVacia() {
    return {
        modo: "campaña",
        campanaIndex: 0,
        satisfaction: 50,
        currentPregunta: "",
        currentPreguntaCampana: "",
        currentPreguntaInfinito: "",
        lastUserText: "",
        esperandoCampana: true,
        esperandoInfinito: true,
        history: [],
        favorites: [],
        logrosDesbloqueados: [],
        recentReactions: [],
        consecutiveCritics: 0,
        historySatisfaction: [50],
        password: ""
    };
}

function getCuenta() {
    if (usuarioActivo === "Invitado") {
        if (!cuentaInvitadoVolatil) cuentaInvitadoVolatil = crearEstructuraVacia();
        return cuentaInvitadoVolatil;
    }
    return baseCuentas[usuarioActivo];
}

function asegurarEstructuraCuenta(nombre) {
    let plantilla = crearEstructuraVacia();
    let cuentaDestino;

    if (nombre === "Invitado") {
        if (!cuentaInvitadoVolatil) {
            cuentaInvitadoVolatil = plantilla;
        }
        cuentaDestino = cuentaInvitadoVolatil;
    } else {
        if (!baseCuentas[nombre]) {
            baseCuentas[nombre] = plantilla;
        }
        cuentaDestino = baseCuentas[nombre];
    }

    // Inyección defensiva de claves ausentes debido a herencia de versiones antiguas
    Object.keys(plantilla).forEach(key => {
        if (cuentaDestino[key] === undefined) {
            cuentaDestino[key] = plantilla[key];
        }
    });
}

function salvarAStorage() {
    if (usuarioActivo !== "Invitado") {
        localStorage.setItem('gugel-multiverse-v4', JSON.stringify(baseCuentas));
    }
}

asegurarEstructuraCuenta(usuarioActivo);

// ==========================================
// 4. SISTEMA DE RENDERIZADO UNIFICADO
// ==========================================
function renderChatActual() {
    let c = getCuenta();
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    messagesContainer.innerHTML = "";
    
    const timerElem = document.getElementById('timer-lock-info');
    const inputElem = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    const actionsBar = document.getElementById('chat-actions-bar');

    if (revisarHistorial) {
        let log = revisarFavorito ? c.favorites[revisarHistorialIndex] : c.history[revisarHistorialIndex];
        if (log) {
            appendMessage('gugel', log.pregunta);
            appendMessage('usuario', log.userText || "...");
            appendMessage('gugel', log.respuesta);
            
            if (inputElem) inputElem.style.display = "none";
            if (transmitBtn) transmitBtn.style.display = "none";
            if (actionsBar) actionsBar.style.display = "none";
            if (timerElem) timerElem.style.display = "none";
            
            if (continueBtn) {
                continueBtn.style.display = "block";
                continueBtn.disabled = false;
                continueBtn.innerText = "VOLVER AL CHAT ACTIVO";
            }
        }
        return;
    }
    
    if (esperandoRespuestaDeTurno) {
        appendMessage('gugel', c.currentPregunta);
        if (timerElem) {
            if (preguntaBloqueada) {
                timerElem.style.display = "block";
                timerElem.innerText = `⏳ Procesando buffers de entrada... (${segundosPregunta}s)`;
                if (inputElem) inputElem.style.display = "none";
                if (transmitBtn) transmitBtn.style.display = "none";
            } else {
                timerElem.style.display = "none";
                timerElem.innerText = "";
                if (inputElem) inputElem.style.display = "block";
                if (transmitBtn) transmitBtn.style.display = "block";
            }
        }
        if (continueBtn) continueBtn.style.display = "none";
        if (actionsBar) actionsBar.style.display = "none";
    } else {
        if (timerElem) timerElem.style.display = "none";
        if (inputElem) inputElem.style.display = "none";
        if (transmitBtn) transmitBtn.style.display = "none";
        
        appendMessage('gugel', c.currentPregunta);
        appendMessage('usuario', c.lastUserText);
        if (c.history.length > 0) {
            let ultimoLog = c.history[c.history.length - 1];
            appendMessage('gugel', ultimoLog.respuesta);
        }
        
        if (continueBtn) {
            continueBtn.style.display = "block";
            if (reaccionBloqueada) {
                continueBtn.disabled = true;
                continueBtn.innerText = `SIGUIENTE CONSULTA (${segundosReaccion}s)`;
            } else {
                continueBtn.disabled = false;
                continueBtn.innerText = "SIGUIENTE CONSULTA";
            }
        }
        if (actionsBar) actionsBar.style.display = "block";
    }
}

function renderAllData() {
    let c = getCuenta();
    
    const userDisplay = document.getElementById('sidebar-user-display');
    if (userDisplay) userDisplay.innerText = usuarioActivo;
    
    const profUsuario = document.getElementById('prof-usuario');
    if (profUsuario) profUsuario.innerText = usuarioActivo;
    
    const profSatis = document.getElementById('prof-satisfaction');
    if (profSatis) profSatis.innerText = `${c.satisfaction}%`;
    
    const profOpin = document.getElementById('prof-opinion');
    if (profOpin) {
        profOpin.innerText = obtenerElementoNoRepetido(
            c.satisfaction < 35 ? OPINIONES_BAJA : c.satisfaction < 55 ? OPINIONES_MEDIA_BAJA : c.satisfaction < 80 ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA,
            c.recentReactions
        );
    }

    const btnCamp = document.getElementById('btn-modo-campaña');
    const btnInfi = document.getElementById('btn-modo-infinito');
    if (btnCamp) btnCamp.classList.remove('active');
    if (btnInfi) btnInfi.classList.remove('active');
    if (c.modo === "campaña" && btnCamp) btnCamp.classList.add('active');
    if (c.modo === "infinito" && btnInfi) btnInfi.classList.add('active');

    const logrosCount = document.getElementById('logros-count');
    if (logrosCount) logrosCount.innerText = c.logrosDesbloqueados ? c.logrosDesbloqueados.length : 0;
    
    const logrosContainer = document.getElementById('logros-container');
    if (logrosContainer) {
        if (!c.logrosDesbloqueados || c.logrosDesbloqueados.length === 0) {
            logrosContainer.innerHTML = "<p style='color:var(--text-muted); font-style:italic;'>Ningún logro registrado en esta cuenta todavía.</p>";
        } else {
            logrosContainer.innerHTML = Object.keys(LOGROS_SISTEMA)
                .filter(key => c.logrosDesbloqueados.includes(key))
                .map(key => {
                    let item = LOGROS_SISTEMA[key];
                    return `
                        <div class="logro-card desbloqueado">
                            <div class="logro-titulo">🏆 ${item.titulo}</div>
                            <div class="logro-desc">${item.desc}</div>
                        </div>
                    `;
                }).join('');
        }
    }

    const histContainer = document.getElementById('history-list-container');
    if (histContainer) {
        histContainer.innerHTML = ""; 
        
        if (!c.history || c.history.length === 0) {
            histContainer.innerHTML = "<p style='color:var(--text-muted); font-style:italic;'>Búfer de logs vacío. Realiza consultas para generar registros.</p>";
        } else {
            let htmlLogs = c.history.map((h, index) => `
                <div class="log-item-card" onclick="cargarChatHistorico(${index})" style="cursor:pointer; margin-bottom:10px; padding:10px; background:var(--bg-inner); border-left:3px solid var(--accent-color);">
                    <div class="log-item-info">
                        <strong style="color:var(--accent-color);">Q:</strong> ${h.pregunta}<br>
                        <span style="font-size:0.85rem;"><strong>A:</strong> ${h.respuesta}</span><br>
                        <span style="font-size:0.75rem; color: var(--text-muted);"><em>Reacción:</em> "${h.reaccion || 'Analizada'}"</span>
                    </div>
                    <div class="log-item-action" onclick="event.stopPropagation();" style="margin-top:5px;">
                        <button class="mini-fav-btn" onclick="marcarHistoricoComoFavorito(${index})">⭐ Guardar</button>
                    </div>
                </div>
            `).join('');
            histContainer.innerHTML = htmlLogs;
        }
    }
    
    renderFavorites();
}

function renderFavorites() {
    let c = getCuenta();
    const favContainer = document.getElementById('favorites-list-container');
    if (!favContainer) return;

    if (!c.favorites || c.favorites.length === 0) {
        favContainer.innerHTML = "<p style='color:var(--text-muted); font-style:italic; padding:10px 0;'>No hay registros marcados como favoritos.</p>";
    } else {
        favContainer.innerHTML = c.favorites.map((f, index) => `
            <div class="log-item-card favorito" style="position:relative; margin-bottom:8px; padding:10px; background:rgba(255,215,0,0.02); border:1px solid rgba(255,215,0,0.2); border-radius:4px;">
                <div class="log-item-info" onclick="cargarChatFavorito(${index})" style="cursor:pointer; padding-right:30px;">
                    <strong>Q:</strong> ${f.pregunta}<br>
                    <span style="font-size:0.85rem; color:var(--text-muted);">Resp: ${f.respuesta}</span>
                </div>
                <button class="remove-fav-btn" onclick="eliminarDeFavoritos(${index}); event.stopPropagation();" style="position:absolute; right:10px; top:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.2rem;">×</button>
            </div>
        `).join('');
    }
}

// ==========================================
// 5. CONTROLADORES DE TIEMPO Y CONTADORES
// ==========================================
function sincronizarEstadoTurno(c) {
    clearInterval(intervaloPregunta);
    clearInterval(intervaloReaccion);
    reaccionBloqueada = false;
    preguntaBloqueada = true;

    if (c.modo === "campaña") {
        if (!c.currentPreguntaCampana) {
            c.currentPreguntaCampana = PREGUNTAS_CAMPANA[c.campanaIndex] || PREGUNTAS_CAMPANA[0];
            c.campanaIndex++;
            c.esperandoCampana = true;
        }
        c.currentPregunta = c.currentPreguntaCampana;
        esperandoRespuestaDeTurno = c.esperandoCampana;
    } else {
        if (!c.currentPreguntaInfinito) {
            let s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
            let p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
            let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
            c.currentPreguntaInfinito = plantilla.replace("[s]", s).replace("[p]", p);
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
    
    if (esperandoRespuestaDeTurno) {
        iniciarContadorPregunta();
    }
}

function iniciarContadorPregunta() {
    clearInterval(intervaloPregunta);
    segundosPregunta = 5; 
    preguntaBloqueada = true;
    tiempoInicioPregunta = Date.now();
    
    renderChatActual();

    intervaloPregunta = setInterval(() => {
        if (revisarHistorial) return;

        segundosPregunta--;
        if (segundosPregunta <= 0) {
            if (preguntaBloqueada) {
                preguntaBloqueada = false;
                segundosPregunta = 30; 
            } else {
                clearInterval(intervaloPregunta);
                forzarEvasivaPorTiempo();
                return;
            }
        }
        renderChatActual();
    }, 1000);
}

function iniciarContadorReaccion() {
    clearInterval(intervaloReaccion);
    segundosReaccion = 5;
    reaccionBloqueada = true;
    renderChatActual();

    intervaloReaccion = setInterval(() => {
        segundosReaccion--;
        if (segundosReaccion <= 0) {
            clearInterval(intervaloReaccion);
            reaccionBloqueada = false;
        }
        renderChatActual();
    }, 1000);
}

// ==========================================
// 6. FLUJO DE TRABAJO E INTERACCIÓN PRINCIPAL
// ==========================================
function forzarEvasivaPorTiempo() {
    let c = getCuenta();
    let entrada = document.getElementById('user-input');
    if (entrada) entrada.value = "";
    
    let evasiva = EVASIVAS[Math.floor(Math.random() * EVASIVAS.length)];
    c.lastUserText = `[SISTEMA: TIEMPO AGOTADO] - Evasiva forzada: "${evasiva}"`;
    
    procesarRespuestaIA(evasiva);
}

function enviarRespuesta(e) {
    if (e) e.preventDefault();
    if (!esperandoRespuestaDeTurno || preguntaBloqueada) return;

    let entrada = document.getElementById('user-input');
    if (!entrada) return;

    let texto = entrada.value.trim();
    let c = getCuenta();
    c.lastUserText = texto;

    entrada.value = "";
    clearInterval(intervaloPregunta);
    procesarRespuestaIA(texto);
}

function procesarRespuestaIA(texto) {
    let c = getCuenta();
    let tiempoEmpleado = (Date.now() - tiempoInicioPregunta) / 1000;
    
    if (texto === "") {
        desbloquearLogro("L11");
    }
    if (tiempoEmpleado < 0.5) {
        desbloquearLogro("L03");
    }
    if (tiempoEmpleado > 25) {
        desbloquearLogro("L04");
    }
    if (EVASIVAS.includes(texto.toLowerCase())) {
        desbloquearLogro("L07");
    }

    let delta = calcularCambioSatisfaccion(texto);
    c.satisfaction = Math.max(0, Math.min(100, c.satisfaction + delta));
    c.historySatisfaction.push(c.satisfaction);

    let tipoReaccion = "ok";
    if (delta < -5) tipoReaccion = "critica";
    else if (delta < 0) tipoReaccion = "rechazo";

    if (tipoReaccion === "critica") {
        c.consecutiveCritics++;
        if (c.consecutiveCritics >= 3) desbloquearLogro("L14");
    } else {
        c.consecutiveCritics = 0;
    }

    let respuestasPool = FRASES_OK;
    if (tipoReaccion === "critica") respuestasPool = FRASES_CRITICAS;
    else if (tipoReaccion === "rechazo") respuestasPool = FRASES_RECHAZO;

    let respuestaGugel = respuestasPool[Math.floor(Math.random() * respuestasPool.length)];
    
    if (tiempoEmpleado < 0.5 && delta >= 0) {
        respuestaGugel = RESPUESTAS_LOGRO_RAPIDO[Math.floor(Math.random() * RESPUESTAS_LOGRO_RAPIDO.length)];
    }

    if (texto.toLowerCase() === respuestaGugel.toLowerCase()) {
        desbloquearLogro("L13");
    }

    let comentarioLog = REACCIONES_COMENTARIOS[tipoReaccion][Math.floor(Math.random() * REACCIONES_COMENTARIOS[tipoReaccion].length)];
    c.recentReactions.push(comentarioLog);
    if (c.recentReactions.length > 5) c.recentReactions.shift();

    if (c.satisfaction >= 90) desbloquearLogro("L05");
    if (c.satisfaction <= 20) desbloquearLogro("L06");
    if (c.satisfaction === 100) desbloquearLogro("L09");

    if (c.historySatisfaction.length >= 5) {
        let ultimos5 = c.historySatisfaction.slice(-5);
        let todosEnRango = ultimos5.every(val => val >= 45 && val <= 55);
        if (todosEnRango) desbloquearLogro("L15");
    }

    desbloquearLogro("L01");

    esperandoRespuestaDeTurno = false;
    if (c.modo === "campaña") {
        c.esperandoCampana = false;
    } else {
        c.esperandoInfinito = false;
        let totalInfinito = c.history.filter(h => !PREGUNTAS_CAMPANA.includes(h.pregunta)).length + 1;
        if (totalInfinito >= 15) desbloquearLogro("L12");
    }

    c.history.push({
        pregunta: c.currentPregunta,
        respuesta: respuestaGugel,
        userText: texto,
        reaccion: comentarioLog
    });

    salvarAStorage();
    iniciarContadorReaccion();
    renderAllData();
}

function calcularCambioSatisfaccion(texto) {
    let t = texto.toLowerCase().trim();
    if (t === "") return -15; 
    
    if (EVASIVAS.includes(t)) {
        return Math.random() < 0.4 ? -5 : -12; 
    }
    
    if (t.length < 6) return -8; 
    if (t.length > 140) return -4; 
    
    let palabras = t.split(/\s+/);
    if (palabras.length < 3) return -6;

    let ganancia = 4;
    if (t.includes("porque") || t.includes("debido a") || t.includes("por ejemplo")) ganancia += 4;
    if (t.includes("gugel") || t.includes("ia") || t.includes("sistema")) ganancia += 2;

    return ganancia;
}

function nextRound() {
    if (reaccionBloqueada) return;
    let c = getCuenta();

    esperandoRespuestaDeTurno = true;
    if (c.modo === "campaña") {
        if (c.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            desbloquearLogro("L02");
            alert("🎉 ¡ENHORABUENA!\n\nHas completado todas las solicitudes fijas del Modo Campaña.\nSe activa automáticamente el Modo Consultas Infinitas para continuar el entrenamiento.");
            c.modo = "infinito";
            c.currentPreguntaInfinito = "";
            c.esperandoInfinito = true;
        } else {
            c.currentPreguntaCampana = PREGUNTAS_CAMPANA[c.campanaIndex];
            c.campanaIndex++;
            c.esperandoCampana = true;
        }
    } else {
        c.currentPreguntaInfinito = "";
        c.esperandoInfinito = true;
    }

    sincronizarEstadoTurno(c);
    salvarAStorage();
    renderChatActual();
    renderAllData();

    if (esperandoRespuestaDeTurno && !preguntaBloqueada) {
        setTimeout(() => {
            const inputElem = document.getElementById('user-input');
            if (inputElem) inputElem.focus();
        }, 50);
    }
}

function clickBotonContinuar() {
    if (reaccionBloqueada) return;
    if (revisarHistorial) {
        revisarHistorial = false;
        revisarFavorito = false;
        revisarHistorialIndex = null;
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('view-chat').classList.add('active');
        renderChatActual();
        renderAllData();
        if (esperandoRespuestaDeTurno && !preguntaBloqueada) {
            const inputElem = document.getElementById('user-input');
            if (inputElem) inputElem.focus();
        }
    } else {
        nextRound();
    }
}

// ==========================================
// 7. FAVORITOS Y GESTIÓN DE LOGS HISTÓRICOS
// ==========================================
function cargarChatHistorico(index) {
    let c = getCuenta();
    if (!c.history || !c.history[index]) return;
    
    revisarHistorial = true;
    revisarFavorito = false;
    revisarHistorialIndex = index;
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    renderChatActual();
    renderAllData();
}

function cargarChatFavorito(index) {
    let c = getCuenta();
    if (!c.favorites || !c.favorites[index]) return;
    
    revisarHistorial = true;
    revisarFavorito = true;
    revisarHistorialIndex = index;
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    renderChatActual();
    renderAllData();
}

function agregarAFavoritos() {
    let c = getCuenta();
    if (c.history.length === 0) return;

    let ultimoLog = c.history[c.history.length - 1];
    if (!c.favorites) c.favorites = [];
    
    let yaExiste = c.favorites.some(f => f.pregunta === ultimoLog.pregunta && f.userText === ultimoLog.userText);
    if (yaExiste) {
        generarVentanitaSistema("📁 REGISTRO EXISTENTE", "Esta consulta ya se encuentra indexada en tus favoritos.", "negativo");
        return;
    }

    c.favorites.push({
        pregunta: ultimoLog.pregunta,
        respuesta: ultimoLog.respuesta,
        userText: ultimoLog.userText
    });

    if (c.favorites.length >= 5) {
        desbloquearLogro("L08");
    }

    salvarAStorage();
    renderAllData();
    generarVentanitaSistema("⭐️ FAVORITO GUARDADO", "Consulta añadida de forma permanente al almacén de favoritos.", "positivo");
}

function eliminarDeFavoritos(index) {
    let c = getCuenta();
    if (!c.favorites) return;
    c.favorites.splice(index, 1);
    salvarAStorage();
    renderAllData();
    generarVentanitaSistema("🗑️ REGISTRO ELIMINADO", "Se ha removido el elemento seleccionado de tus favoritos.", "negativo");
}

function copiarHistorialPortapapeles() {
    let c = getCuenta();
    if (!c.history || c.history.length === 0) {
        generarVentanitaSistema("⚠️ ERROR DE EXTRACCIÓN", "No hay registros en el búfer de logs para copiar.", "negativo");
        return;
    }
    
    let formateado = c.history.map((h, i) => {
        return `--- REGISTRO #${i + 1} ---\nSOLICITUD DE GUGEL: ${h.pregunta}\nTÚ (COMO IA): ${h.userText || '[Vacío]'}\nFEEDBACK GENERADO: ${h.respuesta}\n`;
    }).join('\n');
    
    navigator.clipboard.writeText(formateado).then(() => {
        generarVentanitaSistema("📋 COPIADO CON ÉXITO", "Todo el historial de simulaciones se ha volcado en el portapapeles.", "positivo");
    }).catch(() => {
        generarVentanitaSistema("❌ FALLO DE SUBSISTEMA", "No se ha podido acceder al portapapeles del sistema operativo.", "negativo");
    });
}

function exportarHistorialJSON() {
    let c = getCuenta();
    if (!c.history || c.history.length === 0) {
        generarVentanitaSistema("⚠️ OPERACIÓN ABORTADA", "El búfer está vacío. No hay datos estructurales que exportar.", "negativo");
        return;
    }
    
    let contenidoJson = JSON.stringify(c.history, null, 2);
    let blob = new Blob([contenidoJson], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    
    let linkDescarga = document.createElement('a');
    linkDescarga.href = url;
    linkDescarga.download = `gugel_logs_${usuarioActivo.toLowerCase()}_${Date.now()}.json`;
    document.body.appendChild(linkDescarga);
    linkDescarga.click();
    document.body.removeChild(linkDescarga);
    URL.revokeObjectURL(url);
    
    generarVentanitaSistema("📥 EXPORTACIÓN REALIZADA", "Archivo JSON generado y descargado correctamente.", "positivo");
}

// ==========================================
// 8. INTERFAZ, MENÚS Y CUENTAS DE OPERADOR
// ==========================================
function switchView(viewId) {
    revisarHistorial = false;
    revisarFavorito = false;
    revisarHistorialIndex = null;
    const panelObjetivo = document.getElementById(viewId);
    
    if (panelObjetivo && panelObjetivo.classList.contains('active')) {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('view-chat').classList.add('active');
        renderChatActual();
    } else {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
        if (panelObjetivo) {
            panelObjetivo.classList.add('active');
            let btnId = `btn-${viewId}`;
            const btnPulsado = document.getElementById(btnId);
            if (btnPulsado) btnPulsado.classList.add('active');
            if (viewId === "view-perfil") desbloquearLogro("L17");
            if (viewId === "view-historial") desbloquearLogro("L18");
        }
    }
    renderAllData();
}

function seleccionarModoJuego(nuevoModo) {
    let c = getCuenta();
    c.modo = nuevoModo;
    revisarHistorial = false;
    revisarFavorito = false;
    revisarHistorialIndex = null;
    sincronizarEstadoTurno(c);
    salvarAStorage();
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    
    renderChatActual();
    renderAllData();
    
    if (esperandoRespuestaDeTurno && !preguntaBloqueada) {
        setTimeout(() => {
            const inputElem = document.getElementById('user-input');
            if (inputElem) inputElem.focus();
        }, 50);
    }
}

function abrirModalCuenta() {
    cerrarModalCuenta(); 

    let c = getCuenta();
    let aliasPrevio = usuarioActivo === "Invitado" ? "" : usuarioActivo;
    let clavePrevia = usuarioActivo === "Invitado" ? "" : (c.password || "");

    const overlay = document.createElement('div');
    overlay.id = 'custom-account-popup-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.82)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '99999';

    const popup = document.createElement('div');
    popup.className = 'ventanita-notificacion-flotante positivo';
    popup.style.width = '360px';
    popup.style.pointerEvents = 'auto';

    popup.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div class="toast-titulo" style="font-size: 1rem; margin: 0; font-weight: bold;">⚙️ SUBSISTEMA DE OPERADORES</div>
            <button onclick="cerrarModalCuenta()" style="background: none; border: none; color: var(--text-primary); font-size: 1.4rem; cursor: pointer; font-family: monospace; line-height: 1;">×</button>
        </div>
        <div class="toast-cuerpo" style="display: flex; flex-direction: column; gap: 12px;">
            <p style="margin: 0 0 6px 0; font-size: 0.85rem;">Terminal activa: <strong style="color:var(--text-primary);">${usuarioActivo}</strong></p>
            
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: bold;">Alias de Operador:</label>
                <input type="text" id="custom-account-username" value="${aliasPrevio}" placeholder="Ej: Operador_Alpha" style="width: 100%; box-sizing: border-box; background: var(--bg-main); color: var(--text-primary); border: 1px solid var(--bubble-border); padding: 7px; font-family: 'Courier New', monospace; outline: none;">
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: bold;">Contraseña de Terminal:</label>
                <input type="password" id="custom-account-password" value="${clavePrevia}" placeholder="••••••••" style="width: 100%; box-sizing: border-box; background: var(--bg-main); color: var(--text-primary); border: 1px solid var(--bubble-border); padding: 7px; font-family: 'Courier New', monospace; outline: none;">
            </div>
            
            <button class="sub-btn" onclick="guardarNombreCuentaCustom()" style="margin-top: 10px; text-align: center; background: var(--accent-color); color: var(--accent-text); font-family: 'Courier New', monospace; font-weight: bold; padding: 10px; width: 100%; border: none; cursor: pointer;">AUTENTICAR / REGISTRAR TERMINAL</button>
        </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        const inputUser = document.getElementById('custom-account-username');
        if (inputUser) inputUser.focus();
    }, 50);
}

// ==========================================
// 9. RECURSOS COMPLEMENTARIOS Y TOASTS
// ==========================================
function cerrarModalCuenta() {
    const overlay = document.getElementById('custom-account-popup-overlay');
    if (overlay) overlay.remove();
}

function guardarNombreCuentaCustom() {
    const inputUser = document.getElementById('custom-account-username');
    const inputPass = document.getElementById('custom-account-password');
    
    if (!inputUser || !inputPass) return;

    let nuevoNombre = inputUser.value.trim();
    let contrasena = inputPass.value;

    if (nuevoNombre === "") {
        generarVentanitaSistema("⚠️ ALERTA DE ESTRUCTURA", "El identificador de operador no puede permanecer vacío.", "negativo");
        return;
    }

    if (baseCuentas[nuevoNombre] && baseCuentas[nuevoNombre].password && baseCuentas[nuevoNombre].password !== contrasena) {
        generarVentanitaSistema("❌ ACCESO RESTRINGIDO", "Contraseña de terminal incorrecta para este Operador.", "negativo");
        return;
    }

    usuarioActivo = nuevoNombre;
    asegurarEstructuraCuenta(usuarioActivo);
    
    let c = getCuenta();
    c.password = contrasena;

    desbloquearLogro("L16");
    salvarAStorage();
    
    revisarHistorial = false;
    revisarFavorito = false;
    revisarHistorialIndex = null;

    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');

    sincronizarEstadoTurno(c);
    cerrarModalCuenta();
    renderChatActual();
    renderAllData();
    
    generarVentanitaSistema("⚙️ ACCESO AUTORIZADO", `Hilos vinculados al operador: ${usuarioActivo}`, "positivo");
}

function cambiarTema() {
    const selector = document.getElementById('theme-select');
    if (!selector) return;
    let t = selector.value;
    document.body.className = t;
    localStorage.setItem('gugel-tema', t);
    if (t === "modo-hacker") desbloquearLogro("L10");
}

function desbloquearLogro(codigo) {
    let c = getCuenta();
    if (!c.logrosDesbloqueados) c.logrosDesbloqueados = [];
    if (c.logrosDesbloqueados.includes(codigo)) return;
    
    c.logrosDesbloqueados.push(codigo);
    salvarAStorage();
    
    let item = LOGROS_SISTEMA[codigo];
    if (item) {
        generarVentanitaSistema("🏆 ¡LOGRO DESBLOQUEADO!", `${item.titulo}: ${item.desc}`, "positivo");
    }
}

function obtenerElementoNoRepetido(pool, historialReciente) {
    let h = historialReciente || [];
    if (pool.length === 1) return pool[0];
    let filtrado = pool.filter(elem => !h.includes(elem));
    if (filtrado.length === 0) return pool[Math.floor(Math.random() * pool.length)];
    return filtrado[Math.floor(Math.random() * filtrado.length)];
}

function appendMessage(tipo, texto) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const m = document.createElement('div');
    m.className = `message ${tipo}`;
    if (tipo === 'gugel') {
        m.innerHTML = `<strong>GUGEL:</strong> ${texto}`;
    } else {
        m.innerHTML = `<strong>TÚ (COMO IA):</strong> ${texto}`;
    }
    container.appendChild(m);
    container.scrollTop = container.scrollHeight;
}

function generarVentanitaSistema(titulo, mensaje, claseTipo) {
    let contenedor = document.getElementById('notificaciones-sistema');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'notificaciones-sistema';
        document.body.appendChild(contenedor);
    }

    const nuevaVentanita = document.createElement('div');
    nuevaVentanita.className = `ventanita-notificacion-flotante ${claseTipo}`;

    nuevaVentanita.innerHTML = `
        <div class="toast-titulo">${titulo}</div>
        <div class="toast-cuerpo">${mensaje}</div>
    `;

    contenedor.appendChild(nuevaVentanita);

    setTimeout(() => {
        nuevaVentanita.classList.add('salida-toast');
        nuevaVentanita.addEventListener('transitionend', () => {
            nuevaVentanita.remove();
        });
    }, 4000);
}

// ==========================================
// 10. EVENTO INICIAL DE CARGA Y EXPOSICIÓN GLOBAL
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('gugel-tema') || 'modo-hacker';
    document.body.className = temaGuardado;
    const s = document.getElementById('theme-select');
    if (s) s.value = temaGuardado;
    
    // 1. Sincronizar estado interno
    let c = getCuenta();
    sincronizarEstadoTurno(c);
    
    // 2. Renderizar el estado visual del chat principal
    renderChatActual();
    
    // 3. Vincular el formulario de envío de mensajes
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', enviarRespuesta);
    }

    // 4. Vincular clics de elementos estáticos
    const sidebarUser = document.getElementById('sidebar-user-display');
    if (sidebarUser) {
        sidebarUser.style.cursor = 'pointer';
        sidebarUser.addEventListener('click', abrirModalCuenta);
    }
    
    // 5. Renderizado diferido de datos secundarios
    setTimeout(() => {
        renderAllData();
    }, 100);
});

// Vinculación al objeto global window para su lectura desde el HTML
window.cargarChatHistorico = cargarChatHistorico;
window.cargarChatFavorito = cargarChatFavorito;
window.eliminarDeFavoritos = eliminarDeFavoritos;
window.switchView = switchView;
window.seleccionarModoJuego = seleccionarModoJuego;
window.abrirModalCuenta = abrirModalCuenta;
window.cerrarModalCuenta = cerrarModalCuenta;
window.guardarNombreCuentaCustom = guardarNombreCuentaCustom;
window.cambiarTema = cambiarTema;
window.clickBotonContinuar = clickBotonContinuar;
window.nextRound = nextRound;
window.enviarRespuesta = enviarRespuesta;

// Mapeos y alias de compatibilidad directa para los botones del HTML
window.agregarAFavoritos = agregarAFavoritos;
window.marcarActualComoFavorito = agregarAFavoritos;
window.copiarHistorialPortapapeles = copiarHistorialPortapapeles;
window.exportCoreData = copiarHistorialPortapapeles;
window.exportarHistorialJSON = exportarHistorialJSON;
window.exportarHistorialCompleto = exportarHistorialJSON;

window.marcarHistoricoComoFavorito = function(index) {
    let c = getCuenta();
    if (!c.history || !c.history[index]) return;
    let log = c.history[index];
    if (!c.favorites) c.favorites = [];
    let yaExiste = c.favorites.some(f => f.pregunta === log.pregunta && f.userText === log.userText);
    if (yaExiste) {
        generarVentanitaSistema("📁 REGISTRO EXISTENTE", "Esta consulta ya está en tus favoritos.", "negativo");
        return;
    }
    c.favorites.push({ pregunta: log.pregunta, respuesta: log.respuesta, userText: log.userText });
    salvarAStorage();
    renderAllData();
    generarVentanitaSistema("⭐️ FAVORITO GUARDADO", "Consulta enviada al almacén de favoritos.", "positivo");
};
