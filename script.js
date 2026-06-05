// ==========================================
// 1. CONSTANTES, PLANTILLAS Y DICCIONARIOS
// ==========================================

const PLANTILLAS_PREGUNTAS = [
    "[s] [p]", 
    "porque [s] [p]", 
    "como hacer que [s] [p]", 
    "que pasa si [s] [p]", 
    "ayuda mi [s] [p]",
    "es normal que [s] [p]",
    "tutorial de como evitar que [s] [p]",
    "puedo reparar si [s] [p]",
    "motivos por los que [s] [p]",
    "xq [s] [p]"
];

const PREGUNTAS_CAMPANA = [
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

const FRASES_OK = [
    "vale me sirve gracias xd", 
    "ah ok ahora si lo entiendo", 
    "buena info me aclara la duda", 
    "eso tiene bastante sentido", 
    "perfecto me cuadra la explicacion",
    "entendido gracias por la ayuda",
    "vale ya veo por donde vas",
    "ahora si pirula bien gracias",
    "directo al grano me gusta",
    "ok me guardo la informacion"
];

const FRASES_RECHAZO = [
    "un poco corta la respuesta no?", 
    "me he quedado un poco igual la verdad", 
    "explicate un poco mejor que no me entero",
    "esto se queda a medias falta texto",
    "esperaba algo mas detallado",
    "no me convence mucho esta respuesta",
    "eso no arregla mi duda exactamente"
];

const FRASES_CRITICAS = [
    "pero que dices? eso no tiene sentido", 
    "te has inventado la respuesta o que xd", 
    "estas repitiendo lo mismo y no ayuda", 
    "vaya liada de respuesta no tiene nada que ver",
    "has tardado un monton para no decir nada",
    "vaya desastre no entiende la pregunta",
    "esta respuesta es malisima no me sirve para nada"
];

// Variantes de interacción basadas en la longitud de la respuesta
const FRASES_MUCHO_TEXTO = [
    "bua mucho texto me da pereza leer tanto xd",
    "vaya biblia me has soltado no me da la vida",
    "demasiada chapa para una pregunta tan simple",
    "me he perdido a mitad del parrafo de todo lo que has escrito"
];

const FRASES_DOS_PALABRAS = [
    "solo dos palabras? curratelo un poco mas",
    "te ha faltado bastante desarrollo aqui",
    "te has quedado a gusto con la respuesta que corta es",
    "un poco racano con las palabras no?"
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "jaja", "ño", "si", "no", "uwu", "xd", "quizas", "error 404", "procesando...", "recalculando", "pfff"];

const INFINITO_SUJETOS = [
    "mi gato vader", "cubo rubik 3x3", "fingerboard rampa", "servidor minecraft", 
    "piezas lego star wars", "mi cuenta discord", "teclado mecanico", "router fibra", 
    "mi ultima neurona", "internet pueblo", "mando ps5", "bateria movil",
    "conexion wifi", "pantalla oled", "rodamiento del finger", "bloque comandos"
];

const INFINITO_PREDICADOS = [
    "hace ruido raro malo", "gira lento como arreglar", "no enciende luz roja", "va a pedales xq", 
    "piezas atascadas ayuda", "no carga fotos", "teclas no van", "va lento lluvia", 
    "no funciona xq", "explota si caliento", "se desconecta solo", "gasta rapido xq",
    "hace maullido raro", "tiene holgura sucia", "esta roto por dentro", "no responde nada"
];

const RESPUESTAS_LOGRO_RAPIDO = [
    "bua que rapido lo has puesto",
    "procesado al momento me sirve",
    "eso es velocidad y lo demas son tonterias"
];

const REACCIONES_COMENTARIOS = {
    critica: [
        "el usuario se esta cabreando bastante", 
        "alerta: respuesta sin ningun sentido", 
        "la paciencia del usuario esta bajo minimos",
        "vaya desastre de procesamiento de datos",
        "se detectan picos de enfado en el chat"
    ],
    rechazo: [
        "al usuario no le convence la respuesta", 
        "el usuario ha puesto cara rara", 
        "esta respuesta se ha quedado muy floja",
        "el usuario suspira fuertemente",
        "desviacion de respuesta detectada"
    ],
    ok: [
        "todo correcto el usuario esta contento", 
        "satisfaccion subiendo buena respuesta", 
        "el usuario lo ha entendido a la primera",
        "el usuario asiente con la cabeza",
        "informacion guardada correctamente"
    ]
};

const OPINIONES_BAJA = [
    "«Bastante mala. Le pides ayuda con algo y te contesta con evasivas que no vienen a cuento.»",
    "«Inutil. No se entera de nada de lo que le dices y las respuestas no tienen logica.»",
    "«Un desastre total. Es como hablar con un bot roto que se inventa las cosas.»",
    "«No entiende las consultas basicas. Se queda a medias o te ignora.»"
];
const OPINIONES_MEDIA_BAJA = [
    "«A veces acierta, pero la mayoria de las veces se va por las ramas. Regular.»",
    "«Es un poco vaga respondiendo. Si no le insistes mucho no te soluciona nada.»",
    "«Cumple a duras penas. Como le des una respuesta un poco corta se rompe por completo.»",
    "«Un simulador curioso, pero la IA que controlamos pierde el hilo muy facilmente.»"
];
const OPINIONES_MEDIA_ALT_A = [
    "«Bastante decente. Si sabes como guiarla te da respuestas utiles para salir del paso.»",
    "«Me gusta el estilo que tiene. No es perfecta, pero cumple bien con lo que le pides.»",
    "«Rendimiento estable. Las respuestas del operador mantienen bien la satisfaccion.»",
    "«Una buena herramienta de entrenamiento, responde con coherencia casi siempre.»"
];
const OPINIONES_ALTA = [
    "«¡Increible simulacion! El procesamiento es buenisimo y las respuestas se adaptan genial.»",
    "«La mejor IA que he probado. Entiende perfectamente las consultas y da soluciones buenas.»",
    "«Logica impecable. Si detallas bien los argumentos, la barra de satisfaccion vuela al 100%.»",
    "«Una delicia de optimizacion de datos. El sistema de logros añade un reto muy bueno.»"
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
    "L09": { titulo: "Fidelidad Absoluta", desc: "Has alcanzó el 100% exacto de satisfacción del cliente.", oculto: false },
    "L10": { titulo: "Tema Hacker Activo", desc: "Has cambiado la interfaz visual al tema de terminal de hacker.", oculto: true },
    "L11": { titulo: "Silencio Administrativo", desc: "Has enviado una respuesta completamente vacía al usuario.", oculto: true },
    "L12": { titulo: "Persistencia Infinita", desc: "Has procesado un total de 15 consultas en el modo infinito.", oculto: false },
    "L13": { titulo: "Lector de Mentes", desc: "Tu respuesta coincide exactamente con una de las frases analíticas del usuario.", oculto: true },
    "L14": { titulo: "Crítica Destructiva", desc: "Has recibido 3 valoraciones críticas consecutivas por parte del usuario.", oculto: false },
    "L15": { titulo: "Estabilidad del Sistema", desc: "Has mantenido la satisfacción entre el 45% y el 55% durante 5 turnos seguidos.", oculto: true },
    "L16": { titulo: "Administrador Concienzudo", desc: "Has registrado de forma oficial un Alias de Operador personalizado.", oculto: false },
    "L17": { titulo: "Auditor Interno", desc: "Has inspeccionado las Estadísticas del sistema.", oculto: true },
    "L18": { titulo: "Historiador de Datos", desc: "Has abierto el Historial de chats por primera vez.", oculto: true },
    "L19": { titulo: "Maestro Constructor", desc: "Has respondido incluyendo la palabra 'lego' o 'bloque' para solucionar un problema.", oculto: false },
    "L20": { titulo: "Lubricación Avanzada", desc: "Has mencionado 'cubo', 'rubik' o 'capas' para dar soporte técnico a Gugel.", oculto: false },
    "L21": { titulo: "Truco de Salón", desc: "Has integrado de forma óptima términos de 'fingerboard' o 'skate' en tus respuestas.", oculto: false },
    "L22": { titulo: "El Ojo de Vader", desc: "Has redactado una instrucción directa que incluye la palabra 'gato' o 'felino'.", oculto: false },
    "L23": { titulo: "Lógica Multicapa", desc: "Has utilizado un conector explicativo ('porque', 'debido a') en una reseña de satisfacción alta.", oculto: true },
    "L24": { titulo: "Procesador de Texto Largo", desc: "Tu respuesta enviada al buffer ha superado los 120 caracteres de longitud.", oculto: false },
    "L25": { titulo: "Operador Conciso", desc: "Has resuelto con éxito un turno con una respuesta de exactamente 3 palabras.", oculto: true },
    "L26": { titulo: "Universo Paralelo", desc: "Has usado el término 'universo', 'sistema' o 'planeta' en tus cadenas de texto.", oculto: false },
    "L27": { titulo: "Respuesta Meticulosa", desc: "Has redactado una solución que tiene la misma longitud exacta que la consulta cruda.", oculto: true },
    "L28": { titulo: "Estética Rosa", desc: "Has interactuado con los sistemas simulados vistiendo la interfaz con el Tema Rosa.", oculto: true },
    "L29": { titulo: "Explorador del Cosmos", desc: "Has cargado y ejecutado operaciones bajo la atmósfera del Tema Espacial.", oculto: true },
    "L30": { titulo: "Inversión de Roles", desc: "Has finalizado una respuesta usando un signo de interrogación contra el sujeto.", oculto: false },
    "L31": { titulo: "Ensalada de Datos", desc: "Has provocado una respuesta del núcleo mencionando 'tomate' o 'zanahoria'.", oculto: false },
    "L32": { titulo: "Control Extremo de Daños", desc: "Has recuperado la satisfacción de un nivel crítico (<25%) a un rango estable (>60%).", oculto: false },
    "L33": { titulo: "Archivo Redundante", desc: "Has intentado guardar un log en favoritos que ya se encontraba registrado.", oculto: true },
    "L34": { titulo: "Purista de Datos", desc: "Has enviado una respuesta interactiva sin utilizar signos de puntuación.", oculto: false },
    "L35": { titulo: "Resiliencia de Red", desc: "Has completado 8 consultas continuas sin bajar del 70% de valoración.", oculto: false },
    "L36": { titulo: "Evasión Consecutiva", desc: "Has encadenado dos respuestas consecutivas usando términos puramente evasivos.", oculto: true },
    "L37": { titulo: "Bucle de Sheldon", desc: "Tu barra de satisfacción global ha terminado en un número par perfecto tras un análisis extenso.", oculto: true },
    "L38": { titulo: "Inspector de Respuestas", desc: "Has cargado un chat histórico desde el Historial de chats para su revisión.", oculto: true },
    "L39": { titulo: "Superador de Límites", desc: "Has alcanzado un total de 30 consultas procesadas con éxito en el Core.", oculto: false },
    "L40": { titulo: "GUGEL Core Max", desc: "Has completado con éxito el desbloqueo de la mitad de los logros del sistema (20 logros).", oculto: false }
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

let segundosPregunta = 5; 
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
        recentOpinions: [], 
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
        if (!cuentaInvitadoVolatil) cuentaInvitadoVolatil = plantilla;
        cuentaDestino = cuentaInvitadoVolatil;
    } else {
        if (!baseCuentas[nombre]) baseCuentas[nombre] = plantilla;
        cuentaDestino = baseCuentas[nombre];
    }

    Object.keys(plantilla).forEach(key => {
        if (cuentaDestino[key] === undefined || cuentaDestino[key] === null) {
            cuentaDestino[key] = plantilla[key];
        } else if (Array.isArray(plantilla[key]) && !Array.isArray(cuentaDestino[key])) {
            cuentaDestino[key] = [];
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
// 4. SISTEMA DE RENDERIZADO AISLADO EN BLOQUES
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
    
    try {
        const btnCamp = document.getElementById('btn-modo-campaña');
        const btnInfi = document.getElementById('btn-modo-infinito');
        if (btnCamp) {
            if (c.campanaIndex >= PREGUNTAS_CAMPANA.length) {
                btnCamp.style.display = 'none';
            } else {
                btnCamp.style.display = ''; 
            }
        }
        if (btnCamp) btnCamp.classList.remove('active');
        if (btnInfi) btnInfi.classList.remove('active');
        if (c.modo === "campaña" && btnCamp) btnCamp.classList.add('active');
        if (c.modo === "infinito" && btnInfi) btnInfi.classList.add('active');
    } catch (err) {
        console.error("Fallo controlado en sección Modos:", err);
    }

    try {
        const userDisplay = document.getElementById('sidebar-user-display');
        if (userDisplay) userDisplay.innerText = usuarioActivo;
        
        const profUsuario = document.getElementById('prof-usuario');
        if (profUsuario) profUsuario.innerText = usuarioActivo;
        
        const profSatis = document.getElementById('prof-satisfaction');
        if (profSatis) profSatis.innerText = `${c.satisfaction}%`;
        
        const profOpin = document.getElementById('prof-opinion');
        if (profOpin) {
            let poolInteres = c.satisfaction < 35 ? OPINIONES_BAJA : c.satisfaction < 55 ? OPINIONES_MEDIA_BAJA : c.satisfaction < 80 ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA;
            let opElegida = obtenerElementoNoRepetido(poolInteres, c.recentOpinions);
            profOpin.innerText = opElegida;
            
            c.recentOpinions.push(opElegida);
            if (c.recentOpinions.length > 4) c.recentOpinions.shift();
        }
    } catch (err) {
        console.error("Fallo controlado en sección Perfil:", err);
    }

    try {
        const logrosCount = document.getElementById('logros-count');
        if (logrosCount) logrosCount.innerText = c.logrosDesbloqueados ? c.logrosDesbloqueados.length : 0;
        
        const logrosContainer = document.getElementById('logros-container');
        if (logrosContainer) {
            if (!c.logrosDesbloqueados || c.logrosDesbloqueados.length === 0) {
                logrosContainer.innerHTML = "<p style='color:var(--text-muted); font-style:italic;'>Ningún logro registrado en esta cuenta todavía.</p>";
            } else {
                logrosContainer.innerHTML = Object.keys(LOGROS_SISTEMA)
                    .filter(key => Array.isArray(c.logrosDesbloqueados) && c.logrosDesbloqueados.includes(key))
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
    } catch (err) {
        console.error("Fallo controlado en sección Logros:", err);
    }

    try {
        const histContainer = document.getElementById('history-list-container');
        if (histContainer) {
            histContainer.innerHTML = ""; 
            
            if (!c.history || !Array.isArray(c.history) || c.history.length === 0) {
                histContainer.innerHTML = "<p style='color:var(--text-muted); font-style:italic; padding: 10px 0;'>Historial de chats vacío. Realiza consultas para generar registros.</p>";
            } else {
                histContainer.innerHTML = c.history.map((h, index) => `
                    <div class="log-item-card" onclick="cargarChatHistorico(${index})" style="cursor:pointer; margin-bottom:10px; padding:12px; background:var(--bg-inner); border-left:3px solid var(--accent-color); border-radius:4px;">
                        <div class="log-item-info">
                            <strong style="color:var(--accent-color);">Q:</strong> ${h.pregunta || ''}<br>
                            <span style="font-size:0.85rem;"><strong>A:</strong> ${h.userText || ''}</span><br>
                            <span style="font-size:0.75rem; color: var(--text-muted);"><em>Reacción:</em> "${h.reaccion || 'Analizada'}"</span>
                        </div>
                        <div class="log-item-action" onclick="event.stopPropagation();" style="margin-top:8px;">
                            <button class="mini-fav-btn" onclick="marcarHistoricoComoFavorito(${index})">⭐ Guardar en Favoritos</button>
                        </div>
                    </div>
                `).join('');
            }
        }
    } catch (err) {
        console.error("Error recuperado al pintar el Historial Central:", err);
    }
    
    try { renderFavorites(); } catch (err) {}
}

function renderFavorites() {
    let c = getCuenta();
    const favContainer = document.getElementById('favorites-list-container');
    if (!favContainer) return;

    if (!c.favorites || !Array.isArray(c.favorites) || c.favorites.length === 0) {
        favContainer.innerHTML = "<p style='color:var(--text-muted); font-style:italic; padding:10px 0;'>No hay registros marcados como favoritos.</p>";
    } else {
        favContainer.innerHTML = c.favorites.map((f, index) => `
            <div class="log-item-card favorito" style="position:relative; margin-bottom:8px; padding:12px; background:rgba(255,215,0,0.01); border:1px solid var(--bubble-border); border-radius:4px;">
                <div class="log-item-info" onclick="cargarChatFavorito(${index})" style="cursor:pointer; padding-right:30px;">
                    <strong>Q:</strong> ${f.pregunta || ''}<br>
                    <span style="font-size:0.85rem; color:var(--text-muted);">Resp: ${f.respuesta || ''}</span>
                </div>
                <button class="remove-fav-btn" onclick="eliminarDeFavoritos(${index}); event.stopPropagation();" style="position:absolute; right:12px; top:12px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.2rem; line-height:1;">×</button>
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

    if (c.modo === "campaña" && c.campanaIndex < PREGUNTAS_CAMPANA.length) {
        if (!c.currentPreguntaCampana) {
            c.currentPreguntaCampana = PREGUNTAS_CAMPANA[c.campanaIndex];
        }
        c.currentPregunta = c.currentPreguntaCampana;
    } else {
        c.modo = "infinito";
        if (!c.currentPreguntaInfinito || c.esperandoInfinito) {
            let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
            let suj = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
            let pred = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
            c.currentPreguntaInfinito = plantilla.replace("[s]", suj).replace("[p]", pred);
            c.esperandoInfinito = false;
        }
        c.currentPregunta = c.currentPreguntaInfinito;
    }

    segundosPregunta = 5; 
    renderChatActual();

    intervaloPregunta = setInterval(() => {
        segundosPregunta--;
        if (segundosPregunta <= 0) {
            clearInterval(intervaloPregunta);
            preguntaBloqueada = false;
            tiempoInicioPregunta = Date.now();
            renderChatActual();
            setTimeout(() => {
                const inputElem = document.getElementById('user-input');
                if (inputElem) inputElem.focus();
            }, 20);
        } else {
            const timerElem = document.getElementById('timer-lock-info');
            if (timerElem) timerElem.innerText = `⏳ Procesando buffers de entrada... (${segundosPregunta}s)`;
        }
    }, 1000);
}

function iniciarCuentaAtrasReaccion() {
    clearInterval(intervaloReaccion);
    reaccionBloqueada = true;
    segundosReaccion = 5;
    renderChatActual();

    intervaloReaccion = setInterval(() => {
        segundosReaccion--;
        if (segundosReaccion <= 0) {
            clearInterval(intervaloReaccion);
            reaccionBloqueada = false;
            renderChatActual();
        } else {
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn && !revisarHistorial) {
                continueBtn.innerText = `SIGUIENTE CONSULTA (${segundosReaccion}s)`;
            }
        }
    }, 1000);
}

// ==========================================
// 6. FLUJO DE LOGS INTERACTIVOS Y RESPUESTAS
// ==========================================
function calcularCambioSatisfaccion(texto) {
    let minus = texto.toLowerCase();
    if (minus === "") return -15;
    if (EVASIVAS.includes(minus)) return -8;
    
    let puntos = 0;
    if (minus.length < 8) puntos -= 6;
    if (minus.length > 90) puntos -= 3;
    
    if (minus.includes("porque") || minus.includes("debido a") || minus.includes("ya que") || minus.includes("por ejemplo")) {
        puntos += 12;
    }
    if (minus.includes("gugel") || minus.includes("ia") || minus.includes("algoritmo") || minus.includes("sistema")) {
        puntos += 6;
    }
    return puntos === 0 ? 2 : puntos;
}

function enviarRespuesta(e) {
    if (e) e.preventDefault();
    if (!esperandoRespuestaDeTurno || preguntaBloqueada) return;

    let entrada = document.getElementById('user-input');
    if (!entrada) return;
    
    let texto = entrada.value.trim();
    let c = getCuenta();
    
    if (texto.toLowerCase() === c.currentPregunta.toLowerCase()) {
        generarVentanitaSistema("⚠️ ERROR DE PARADOJA", "No puedes responder a la IA usando su propia pregunta.", "negativo");
        entrada.value = "";
        return;
    }
    
    c.lastUserText = texto;
    entrada.value = "";
    
    clearInterval(intervaloPregunta);
    procesarRespuestaIA(texto);
}

function procesarRespuestaIA(texto) {
    let c = getCuenta();
    let minus = texto.toLowerCase();
    let tiempoEmpleado = (Date.now() - tiempoInicioPregunta) / 1000;

    let listaPalabras = texto.split(/\s+/).filter(Boolean);
    let totalPalabras = listaPalabras.length;

    if (texto === "") desbloquearLogro("L11");
    if (tiempoEmpleado < 0.5) desbloquearLogro("L03");
    if (tiempoEmpleado > 25) desbloquearLogro("L04");
    if (EVASIVAS.includes(minus)) desbloquearLogro("L07");
    
    if (minus.includes("lego") || minus.includes("bloque")) desbloquearLogro("L19");
    if (minus.includes("cubo") || minus.includes("rubik") || minus.includes("capa")) desbloquearLogro("L20");
    if (minus.includes("fingerboard") || minus.includes("skate")) desbloquearLogro("L21");
    if (minus.includes("gato") || minus.includes("felino")) desbloquearLogro("L22");
    if (texto.length > 120) desbloquearLogro("L24");
    if (totalPalabras === 3) desbloquearLogro("L25");
    if (minus.includes("universo") || minus.includes("sistema") || minus.includes("planeta")) desbloquearLogro("L26");
    if (texto.length === c.currentPregunta.length) desbloquearLogro("L27");
    if (minus.includes("?") || minus.includes("¿")) desbloquearLogro("L30");
    if (minus.includes("tomate") || minus.includes("zanahoria")) desbloquearLogro("L31");
    if (!/[.,\/#!$%\^&\*;:{}=\-_`~()]/g.test(texto) && texto !== "") desbloquearLogro("L34");

    let delta = calcularCambioSatisfaccion(texto);
    c.satisfaction = Math.max(0, Math.min(100, c.satisfaction + delta));
    c.historySatisfaction.push(c.satisfaction);

    if (c.satisfaction >= 90) desbloquearLogro("L05");
    if (c.satisfaction <= 20) desbloquearLogro("L06");
    if (c.satisfaction === 100) desbloquearLogro("L09");
    if (c.satisfaction % 2 === 0 && texto.length > 40) desbloquearLogro("L37");

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

    if (tipoReaccion === "ok") {
        if (minus.includes("lego") || minus.includes("bloque")) {
            respuestaGugel = "vale me sirve asi puedo encajar mejor las piezas de lego";
            desbloquearLogro("L23");
        } else if (minus.includes("cubo") || minus.includes("rubik") || minus.includes("capa")) {
            respuestaGugel = "ah ok tocara echarle lubricante a las capas del rubik a ver si gira bien";
            desbloquearLogro("L23");
        } else if (minus.includes("fingerboard") || minus.includes("skate") || minus.includes("rampa")) {
            respuestaGugel = "entendido tocara limpiar los rodamientos de la rampa del finger";
        } else if (minus.includes("gato") || minus.includes("vader") || minus.includes("felino")) {
            respuestaGugel = "buena info vigilare al gato vader por si acaso";
        }
    } else {
        if (minus.includes("lego") || minus.includes("rubik") || minus.includes("gato")) {
            respuestaGugel = "me dices cosas raras y sigo teniendo el problema con el cubo o el gato igual";
        }
    }

    if (texto !== "") {
        if (totalPalabras <= 2) {
            respuestaGugel = FRASES_DOS_PALABRAS[Math.floor(Math.random() * FRASES_DOS_PALABRAS.length)];
        } else if (texto.length > 120) {
            respuestaGugel = FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)];
        }
    }

    if (tiempoEmpleado < 0.5 && delta >= 0) {
        respuestaGugel = RESPUESTAS_LOGRO_RAPIDO[Math.floor(Math.random() * RESPUESTAS_LOGRO_RAPIDO.length)];
    }

    let poolComentariosInternos = REACCIONES_COMENTARIOS[tipoReaccion];
    let comentarioElegidoSystem = poolComentariosInternos[Math.floor(Math.random() * poolComentariosInternos.length)];

    c.history.push({
        pregunta: c.currentPregunta,
        userText: texto,
        respuesta: respuestaGugel,
        reaccion: comentarioElegidoSystem,
        satisfact: c.satisfaction
    });

    if (c.history.length >= 15) desbloquearLogro("L12");
    if (c.history.length >= 30) desbloquearLogro("L39");

    esperandoRespuestaDeTurno = false;
    iniciarCuentaAtrasReaccion();
    salvarAStorage();
    renderChatActual();
    renderAllData();
}

function nextRound() {
    if (reaccionBloqueada) return;
    let c = getCuenta();
    esperandoRespuestaDeTurno = true;
    
    if (c.modo === "campaña") {
        c.campanaIndex++;
        if (c.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            desbloquearLogro("L02");
            alert("🎉 ¡CAMPANA COMPLETADA!\n\nHas resuelto las 10 consultas de las preguntas predeterminadas.\nCambiando a Preguntas infinitas de forma automatica.");
            c.modo = "infinito";
            c.currentPreguntaInfinito = "";
            c.esperandoInfinito = true;
        } else {
            c.currentPreguntaCampana = PREGUNTAS_CAMPANA[c.campanaIndex];
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
    
    desbloquearLogro("L38");
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
    renderChatActual();
    renderAllData();
}

function marcarActualComoFavorito() {
    let c = getCuenta();
    if (c.history.length === 0) return;
    let ultimoLog = c.history[c.history.length - 1];
    
    if (!c.favorites) c.favorites = [];
    let yaExiste = c.favorites.some(f => f.pregunta === ultimoLog.pregunta && f.userText === ultimoLog.userText);
    
    if (yaExiste) {
        desbloquearLogro("L33");
        generarVentanitaSistema("📁 REGISTRO EXISTENTE", "Esta consulta ya está en tus favoritos.", "negativo");
        return;
    }
    c.favorites.push(ultimoLog);
    if (c.favorites.length >= 5) desbloquearLogro("L08");
    if (c.favorites.length >= 10) desbloquearLogro("L32");
    
    generarVentanitaSistema("⭐ FAVORITO REGISTRADO", "Consulta volcada en tu marcador permanente.", "positivo");
    salvarAStorage();
    renderAllData();
}

function marcarHistoricoComoFavorito(index) {
    let c = getCuenta();
    if (!c.history || !c.history[index]) return;
    let log = c.history[index];
    if (!c.favorites) c.favorites = [];
    
    let yaExiste = c.favorites.some(f => f.pregunta === log.pregunta && f.userText === log.userText);
    if (yaExiste) {
        desbloquearLogro("L33");
        generarVentanitaSistema("📁 REGISTRO EXISTENTE", "Esta consulta ya está en tus favoritos.", "negativo");
        return;
    }
    c.favorites.push(log);
    if (c.favorites.length >= 5) desbloquearLogro("L08");
    if (c.favorites.length >= 10) desbloquearLogro("L32");
    
    generarVentanitaSistema("⭐ FAVORITO REGISTRADO", "Guardado desde el historial de chats.", "positivo");
    salvarAStorage();
    renderAllData();
}

function eliminarDeFavoritos(index) {
    let c = getCuenta();
    if (!c.favorites || !c.favorites[index]) return;
    c.favorites.splice(index, 1);
    generarVentanitaSistema("🗑️ MARCADOR ELIMINADO", "Registro purgado con éxito de favoritos.", "positivo");
    salvarAStorage();
    renderAllData();
}

function copiarHistorialPortapapeles() {
    let c = getCuenta();
    if (!c.history || c.history.length === 0) {
        generarVentanitaSistema("⚠️ OPERACIÓN RECHAZADA", "No hay logs para copiar.", "negativo");
        return;
    }
    let formateado = c.history.map((h, i) => {
        return `--- REGISTRO #${i + 1} ---\nSOLICITUD: ${h.pregunta}\nRESPUESTA IA: ${h.userText || '[Vacío]'}\nFEEDBACK GUGEL: ${h.respuesta}\n`;
    }).join('\n');

    navigator.clipboard.writeText(formateado).then(() => {
        generarVentanitaSistema("📋 COPIADO CON ÉXITO", "Historial volcado al portapapeles.", "positivo");
    }).catch(() => {
        generarVentanitaSistema("❌ FALLO DE SUBSISTEMA", "Error al acceder al portapapeles.", "negativo");
    });
}

function exportarHistorialJSON() {
    let c = getCuenta();
    if (!c.history || c.history.length === 0) {
        generarVentanitaSistema("⚠️ ABORTADO", "El búfer está vacío.", "negativo");
        return;
    }
    let contenidoJson = JSON.stringify(c.history, null, 2);
    let blob = new Blob([contenidoJson], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = `gugel_chats_${usuarioActivo.toLowerCase()}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    generarVentanitaSistema("📥 EXPORTACIÓN REALIZADA", "Archivo JSON generado correctamente.", "positivo");
}

// ==========================================
// 8. INTERFAZ, MENÚS Y CUENTAS DE OPERADOR
// ==========================================
function switchView(viewId) {
    revisarHistorial = false;
    revisarFavorito = false;
    revisarHistorialIndex = null;
    
    if (viewId === "view-perfil") desbloquearLogro("L17");
    if (viewId === "view-historial") desbloquearLogro("L18");

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
            let botonSidebar = document.querySelector(`[onclick="switchView('${viewId}')"]`);
            if (botonSidebar) botonSidebar.classList.add('active');
        }
    }
}

function seleccionarModoJuego(modo) {
    let c = getCuenta();
    c.modo = modo;
    revisarHistorial = false;
    revisarFavorito = false;
    revisarHistorialIndex = null;
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    
    sincronizarEstadoTurno(c);
    salvarAStorage();
    renderChatActual();
    renderAllData();
}

function cambiarTema(nuevoTema) {
    if (!nuevoTema) return;
    document.body.className = nuevoTema;
    if (nuevoTema === "modo-hacker") desbloquearLogro("L10");
    if (nuevoTema === "modo-rosa") desbloquearLogro("L28");
    if (nuevoTema === "modo-espacial") desbloquearLogro("L29");
}

function abrirModalCuenta() {
    let aliasPrevio = usuarioActivo === "Invitado" ? "" : usuarioActivo;
    let clavePrevia = usuarioActivo === "Invitado" ? "" : (baseCuentas[usuarioActivo]?.password || "");

    let overlay = document.createElement('div');
    overlay.id = "custom-modal-overlay";
    overlay.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.75); z-index:99999; display:flex; align-items:center; justify-content:center; padding:15px;";
    
    let popup = document.createElement('div');
    popup.className = "card";
    popup.style = "width:100%; max-width:420px; background:var(--bg-inner); border:2px solid var(--bubble-border); padding:20px; box-shadow: 0 4px 20px rgba(0,0,0,0.6);";
    popup.innerHTML = `
        <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div class="toast-titulo" style="font-size: 1rem; margin: 0; font-weight: bold;">⚙️ SUBSISTEMA DE REGISTRO</div>
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
            <button class="sub-btn" onclick="guardarNombreCuentaCustom()" style="margin-top: 10px; text-align: center; background: var(--accent-color); color: var(--accent-text); font-family: 'Courier New', monospace; font-weight: bold; padding: 10px; width: 100%; border: none; cursor: pointer;">REGISTRAR TERMINAL</button>
        </div>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

function cerrarModalCuenta() {
    const o = document.getElementById('custom-modal-overlay');
    if (o) o.remove();
}

function guardarNombreCuentaCustom() {
    const userIn = document.getElementById('custom-account-username');
    const passIn = document.getElementById('custom-account-password');
    if (!userIn || !passIn) return;

    let nombre = userIn.value.trim();
    let clave = passIn.value;

    if (nombre === "" || nombre.toLowerCase() === "invitado") {
        usuarioActivo = "Invitado";
        cerrarModalCuenta();
        sincronizarEstadoTurno(getCuenta());
        renderChatActual();
        renderAllData();
        return;
    }

    if (baseCuentas[nombre]) {
        if (baseCuentas[nombre].password !== clave) {
            generarVentanitaSistema("❌ ACCESO DENEGADO", "Clave de terminal incorrecta para este alias.", "negativo");
            return;
        }
    } else {
        baseCuentas[nombre] = crearEstructuraVacia();
        baseCuentas[nombre].password = clave;
    }

    usuarioActivo = nombre;
    asegurarEstructuraCuenta(usuarioActivo);
    desbloquearLogro("L16");
    salvarAStorage();
    cerrarModalCuenta();
    
    sincronizarEstadoTurno(getCuenta());
    renderChatActual();
    renderAllData();
}

// ==========================================
// 9. AUXILIARES E INYECTORES DEL DOM
// ==========================================
function desbloquearLogro(codigo) {
    let c = getCuenta();
    if (!c.logrosDesbloqueados) c.logrosDesbloqueados = [];
    if (c.logrosDesbloqueados.includes(codigo)) return;

    c.logrosDesbloqueados.push(codigo);
    let item = LOGROS_SISTEMA[codigo];
    
    if (item) {
        generarVentanitaSistema("🏆 ¡LOGRO DESBLOQUEADO!", `${item.titulo}: ${item.desc}`, "positivo");
    }

    if (c.logrosDesbloqueados.length >= 20) {
        desbloquearLogro("L40");
    }
    salvarAStorage();
    renderAllData();
}

function obtenerElementoNoRepetido(pool, historialReciente) {
    let h = Array.isArray(historialReciente) ? historialReciente : [];
    if (!Array.isArray(pool) || pool.length === 0) return "...";
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

    const t = document.createElement('div');
    t.className = `ventanita-notificacion-flotante ${claseTipo || ''}`;
    t.innerHTML = `
        <div style="font-weight:bold; font-size:0.85rem; margin-bottom:3px; display:flex; align-items:center; gap:5px;">
            <span>${titulo}</span>
        </div>
        <div style="font-size:0.8rem; opacity:0.95; line-height:1.3;">${mensaje}</div>
    `;
    
    contenedor.appendChild(t);
    
    setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateY(-10px)';
        setTimeout(() => t.remove(), 300);
    }, 2000); 
}

window.addEventListener('DOMContentLoaded', () => {
    let c = getCuenta();
    sincronizarEstadoTurno(c);
    renderAllData();
});

window.switchView = switchView;
window.seleccionarModoJuego = seleccionarModoJuego;
window.abrirModalCuenta = abrirModalCuenta;
window.cerrarModalCuenta = cerrarModalCuenta;
window.guardarNombreCuentaCustom = guardarNombreCuentaCustom;
window.cambiarTema = cambiarTema;
window.clickBotonContinuar = clickBotonContinuar;
window.nextRound = nextRound;
window.enviarRespuesta = enviarRespuesta;
window.agregarAFavoritos = marcarActualComoFavorito;
window.marcarActualComoFavorito = marcarActualComoFavorito;
window.copiarHistorialPortapapeles = copiarHistorialPortapapeles;
window.exportCoreData = copiarHistorialPortapapeles;
window.exportarHistorialJSON = exportarHistorialJSON;
window.exportarHistorialCompleto = exportarHistorialJSON;
window.marcarHistoricoComoFavorito = marcarHistoricoComoFavorito;
window.eliminarDeFavoritos = eliminarDeFavoritos;
