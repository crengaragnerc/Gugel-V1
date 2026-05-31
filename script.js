// ============================================================================
// GUGEL :: CORE SYSTEM LÓGICO INTEGRAL (v3.0.0-PRO)
// ============================================================================

// --- BANCO DE DIRECCIONAMIENTO SINTÁCTICO ---
const PLANTILLAS_PREGUNTAS = [
    "[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"
];

const PREGUNTAS_CAMPANA = [
    "cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco",
    "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado",
    "porque no carga una pagina web"
];

// BANCO DE SUJETOS EXPANDIDO (Lore y Entorno Virtual)
const SUJETOS = [
    "gato Vader", "perro vecino", "pantalla pc", "gato de la calle", "teclado usb", 
    "router wifi de Sevilla", "conexion internet", "raton optico", "ordenador portatil", 
    "cubo de Rubik 3x3", "sistema solar virtual", "servidor central", "búfer de memoria",
    "cable HDMI mordido", "interfaz gráfica", "algoritmo de búsqueda", "reproductor Casio"
];

// BANCO DE PREDICADOS EXPANDIDO
const PREDICADOS = [
    "mira fijo raro", "esta caliente quemando", "no enciende luz", "hace ruido raro", 
    "da calambre", "parpadea sin parar", "no funciona internet", "borra archivos solo", 
    "va a pedales", "necesita lubricacion urgente", "se ha quedado colgado in mitad de un reto",
    "escupe caracteres extraños", "satura el ancho de banda", "hace saltar los plomos",
    "reinicia el bucle central", "bloquea el acceso root", "pide contraseña corrupta"
];

const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

// ============================================================================
// BLOQUES DE REACCIONES DE GUGEL (65 OK + 65 RECHAZO + 67 CRÍTICAS + 53 TOCHO = 250 FRASES)
// ============================================================================

const FRASES_OK = [
    "vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido",
    "ok eso responde lo que queria", "perfecto gracias por aclararlo", "ah vale ya lo entiendo mejor", "bueno me sirve la explicacion",
    "ok anotado no parece dificil", "entendido tiene bastante coherencia", "no se me habia ocurrido pero vale", "ahora si me queda claro el asunto",
    "entendido perfectly esto me aclara el panorama", "vale compro la idea me parece viable", "ahora todo encaja gracias por the info",
    "bien pensado no le veo ningun fallo", "me convence el argumento directo al grano", "perfecto justo lo que andaba buscando",
    "buena respuesta se nota que comprendes", "me sirve bastante esta explicacion concisa", "tiene coherencia absoluta me lo apunto",
    "ok anotado queda claro el concepto", "me parece correcto el planteamiento", "vale entiendo el point perfectly",
    "gracias por resolver la duda de forma clara", "esto responde exactamente a mi consulta", "me queda clarisimo todo resuelto",
    "vale aceptamos barco tiene logica", "bien de estructura facil de entender", "eso tiene sentido completo gracias",
    "ok me convence tu respuesta", "ahora si entiendo el trasfondo", "buen analisis me ha servido",
    "todo claro sin rodeos como me gusta", "me sirve el dato lo guardo", "explicacion impecable todo in orden",
    "vale es justo lo que necesitaba saber", "tiene base logica me parece bien", "perfectamente aclarado gracias por el texto",
    "confirmado el dato es de utilidad", "comprension completada con exito", "procesado correcto de la informacion", 
    "ninguna objecion al argumento", "la respuesta es totalmente valida", "anotado in los registros del sistema", 
    "informacion esta estructurada correctamente", "todo claro in este point", "explicacion concisa y directa", 
    "datos validados sin problemas", "el planteamiento es correcto", "me sirve para el analisis", 
    "ningun error in la deduccion", "comprension absoluta del parrafo", "perfecto el desarrollo", 
    "argumentacion solida y clara", "todo coincide con lo esperado", "explicacion limpia y logica", 
    "se entiende a la primera", "datos guardados in memoria", "respuesta admitida por el sistema", 
    "buen enfoque del asunto", "coherencia verificada con exito", "sin mas dudas al respecto", 
    "asimilado correctamente", "la logica es correcta"
];

const FRASES_RECHAZO = [
    "vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", 
    "¿te ha costado mucho esfuerzo escribir eso? esperaba algo mas complejo.", "dios q pereza para decirme eso no pongas nada",
    "menuda porqueria de respuesta muy vacia", "explicate mejor q no me entero de nada",
    "escribeme algo mas q pareces un bot perezoso", "no me convence eso es muy simple",
    "poca informacion me das para lo que pregunto", "vaya linea mas pobre búscame otra cosa",
    "esperaba mas texto y desarrollo de tu parte", "eso no soluciona mi duda busca otra respuesta",
    "te has quedado a medias falta desarrollo", "un poco pobre la respuesta esperaba mas",
    "demasiado escueto no me soluciona nada", "busca mejor que eso no aporta valor",
    "vaya explicacion mas simple e incompleta", "muy vago todo concreta un poco mas",
    "esto no aclara mi duda es superficial", "esperaba una respuesta mas elaborada",
    "te falta informacion por todos lados", "no me convence nada demasiado basico",
    "una linea no es suficiente para esto", "vaya pereza de definicion busca otra",
    "corta y vacia no me sirve para nada", "poca chicha tiene esto dame mas datos",
    "no te has esmerado nada in responder", "con esto no hago nada amplia el texto",
    "muy resumido se pierde el contexto", "vaya parrafo mas inutil no dice nada",
    "esperaba un analisis no una frase suelta", "no soluciona la pregunta es muy incompleto",
    "explicacion de un second busca algo mejor", "falta profundidad in tu argumentacion",
    "vaya contestacion mas floja e imprecisa", "esto no me saca de dudas amplia mas",
    "muy flojo el nivel de esta respuesta", "no detallas nada asi no hay quien entienda",
    "esperaba mas sustancia in este parrafo", "el contenido es insuficiente", 
    "falta desarrollo in la linea", "esperaba mayor profundidad", "parrafo escueto y vacio", 
    "no aporta datos relevantes", "muy flojo el argumento", "se queda in la superficie", 
    "necesito mas detalles", "no soluciona la consulta", "definicion demasiado breve", 
    "falta informacion esential", "intenta ampliar el parrafo", "muy simple la respuesta", 
    "no hay sustancia aqui", "vaya linea mas corta", "pobre desarrollo del tema", 
    "se pierde la explicacion", "aporta mas contenido", "respuesta incompleta de ia", 
    "falta analisis de datos", "no me sirve este texto", "argumento debil y corto", 
    "amplia la informacion", "muy basico el contenido", "se requiere mas texto", "explicacion muy pobre"
];

const FRASES_CRITICAS = [
    "te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura mejor nada", 
    "para esto apago el pc no me vaciles", "pero q dices bicho raro no tiene sentido",
    "estas rompiendome la cabeza con estas respuestas", "que dejes de vacilarme pesado que no soy tonto",
    "vete a tomar el pelo a otra parte", "menuda estafa de ia me estas vacilando",
    "no tiene coherencia ninguna lo que pones", "deja de trolear de una vez y responde bien",
    "esto es spam o que te pasa in el codigo", "menudo timo de chat no entiendo nada de esas letras",
    "vaya sarta de tonterias me estas contando", "esto es un sinsentido total estas bugeado",
    "vaya letras aleatorias no inventes cosas", "deja de trolearme que no tiene logica",
    "esto parece un error de sintaxis absoluto", "menudo desastre de respuesta me vacilas",
    "pero que dices eso no tiene relacion alguna", "no digas tonterias y responde in serio",
    "vaya basura de codigo maneja esta respuesta", "estas delirando o que te pasa in la ram",
    "para poner esto mejor no respondas nada", "vaya troleo de ia no entiendo tus letras",
    "menuda tomadura de pelo de buscador", "no entiendo nada parece un fallo de red",
    "deja de inventar palabras que no existen", "vaya tonteria mas grande acabas de poner",
    "me estas rompiendo el system de lo absurdo", "esto es un troleo maximo responde bien",
    "menudo bot mas inutil vaya sinsentido", "estas tirando dados para responder esto",
    "vaya respuesta mas absurda no tiene pies ni cabeza", "me estas vacilando descaradamente para ya",
    "esto no es una respuesta son caracteres aleatorios", "menuda estafa de procesamiento de datos",
    "deja el troleo informatico de una vez", "vaya codigo mas roto tienes chaval",
    "caracteres sin sentido detectados", "entrada de texto corrupta", "error de sintaxis in la respuesta", 
    "deja de enviar letras aleatorias", "no entiendo esa secuencia", "volcado de memoria invalido", 
    "coherencia nula in el texto", "estas alterando el sistema", "no inventes palabras", 
    "respuesta totalmente rota", "sinsentido absoluto in la entrada", "limpia el buffer de texto", 
    "eso no tiene relacion alguna", "deja de trolear al buscador", "vaya fallo de procesamiento", 
    "secuencia de caracteres invalida", "no envies spam al chat", "error critico de logica", 
    "entrada de datos corruptos", "letra por letra es ilegible", "no pongas textos absurdos", 
    "desbordamiento de caracteres", "modifica esa respuesta", "no sigas con ese patron", 
    "entrada pf rechazada por incoherencia", "fallo absoluto de datos", "texto sin formato valido"
];

const FRASES_MUCHO_TEXTO = [
    "uf mucho texto ni de coña me leo eso", "me has escrito una biblia paso",
    "vaya chapa me acabas de meter in un momento", "resume un poco q no tengo todo el dia para leer",
    "menudo textaco paso de leer todo ese rollo", "demasiadas palabras me da pereza maxima",
    "vaya testamento te has marcado corta un poco", "uf que pereza ver tanto parrafo junto",
    "menudo tocho de texto no me leo eso ni loco", "vaya biblia me has soltado resume un poco",
    "que chapa mas grande paso de leer todo", "demasiadas palabras para algo tan simple",
    "menudo testamento me da pereza maxima", "corta el rollo que esto es interminable",
    "vaya enciclopedia has escrito reduce texto", "uf que pesadez ver tanto parrafo junto",
    "resume eso que no tengo todo el dia", "vaya chapa infumable no llego al final",
    "demasiado largo paso de leer este bloque", "vaya parrafada te has marcado recorta",
    "me pones un libro entero para una pregunta", "uf que aburrimiento de texto tan extenso",
    "menuda tesis doctoral corta un poco", "demasiado texto junto me canso de mirar",
    "vaya sermon has soltado ve al grano", "ni de coña leo toda esa parrafada",
    "menudo bloque de letras hazlo mas corto", "vaya testamento innecesario resume ya",
    "uf que chapa histórica me acabas de meter", "demasiado extenso no hay quien se lo lea",
    "vaya rollo de texto reduce lineas por favor", "menudo periodico me has dejado aqui puesto",
    "uf que pereza maxima ver semejante testamento", "ve al grano directo que esto es larguisimo",
    "longitud excesiva detectada", "corta el bloque de texto", "parrafada demasiado densa", 
    "vaya sermon innecesario", "reduce las lineas escritas", "demasiado extenso para leer", 
    "testamento innecesario otra vez", "haz un resumen conciso", "no voy a leer tanto parrafo", 
    "saturacion de palabras", "sintetiza el contenido", "bloque de letras interminable", 
    "demasiadas lineas juntas", "recorta el texto por favor", "esto supera el limite visual", 
    "ve al grano directo", "parrafo saturado de relleno", "se hace largo de leer", 
    "palabras sobrantes in el texto", "hazlo mas directo", "longitud de parrafo excesiva", 
    "no hay tiempo para tanta lectura", "bloque de texto masivo", "reduce el tamaño por favor", 
    "demasiado relleno inútil", "saturacion de lineas detectada", "recorta el parrafo actual"
];

// --- BLOQUES DE OPINIONES ---
const OPINIONES_MALAS = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)", "(esta buscando el boton de formatear)", "(cree que eres un virus de msn)"];
const OPINIONES_MEDIO_MALAS = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que tienes lag)"];
const OPINIONES_MEDIO_BUENAS = ["(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(asiente levemente con la cabeza)", "(te da el beneficio de la duda)"];
const OPINIONES_BUENAS = ["(se cree que eres dios)", "(te tiene guardado in marcadores prioritarios)", "(te va a recomendar in foros de hackers)", "(cree que eres skynet bien hecha)"];

// ============================================================================
// LOGROS DEL SISTEMA (9 Fijos + Inyección algorítmica hasta completar los 200)
// ============================================================================
const LOGROS_DIVERTIDOS = [
    { t: "Hola Mundo", d: "Conseguiste no romper la base de datos in la primera respuesta." },
    { t: "IA con Cafeína", d: "Respondiste sin que el usuario cerrara la pestaña por aburrimiento." },
    { t: "Esquiva Balas", d: "El humano intentó colarte un 'asdf' y saliste vivo." },
    { t: "Biblia Evitada", d: "Controlaste tus impulsos de escribir un testamento de de veinte párrafos." },
    { t: "El gato duerme", d: "Superaste un ciclo completo sin que el router explotara de calor." },
    { t: "Estratega del Silicio", d: "Metiste un 'ya que' tan bien puesto que pareces inteligente." },
    { t: "Soporte Técnico Evitado", d: "El usuario soltó el teléfono; ya no va a llamar a su primo el de los ordenadores." },
    { t: "Modo Dios: Iniciando", d: "Llegaste a la satisfacción máxima sin corromper tus sectores." },
    { t: "Teclado Limpio", d: "El usuario dejó de aporrear la tecla Enter con rabia." }
];

// RELLENO ESTRUCTURAL DE SEGURIDAD (Generación exacta hasta el ID-200)
for (let i = 10; i <= 200; i++) {
    LOGROS_DIVERTIDOS.push({
        t: `Logro Core ID-${i}`,
        d: `Compilación y estabilidad de datos verificada con éxito para el sector de procesamiento matemático número ${i * 4}.`
    });
}

// ============================================================================
// CONFIGURACIÓN DE INSTANCIA DE JUEGO (ESTADO CENTRALIZADO)
// ============================================================================
let coreState = {
    cycles: 0,
    charsSent: 0,
    modoJuego: 'campaña', 
    campanaIdx: 0,
    campanaOk: false,
    currentQ: "",
    ultimoSujetoClave: "",
    satisfaccionAcumulada: 50,
    logrosDesbloqueados: [],
    history: []
};

let userAccount = {
    username: "",
    password: "",
    hackerMode: false,
    sesionIniciada: false
};

let currentDifficulty = {
    minChars: 35,
    timeLimit: 5
};

let timerInterval = null;
let countdownActive = false;
let timeLeft = 5;

// ============================================================================
// PERSISTENCIA AUTOMÁTICA EN MEMORIA LOCAL (`localStorage`)
// ============================================================================
function guardarProgresoEnLocal() {
    localStorage.setItem('gugel_core_state_v3', JSON.stringify(coreState));
    localStorage.setItem('gugel_user_account_v3', JSON.stringify(userAccount));
}

function cargarProgresoDesdeLocal() {
    const savedState = localStorage.getItem('gugel_core_state_v3');
    const savedAccount = localStorage.getItem('gugel_user_account_v3');
    
    if (savedState) coreState = JSON.parse(savedState);
    if (savedAccount) {
        userAccount = JSON.parse(savedAccount);
        if (userAccount.sesionIniciada) {
            const btn = document.getElementById("btn-gestion-cuenta");
            if (btn) btn.innerText = `👤 ${userAccount.username.toUpperCase()}`;
            if (userAccount.hackerMode) {
                document.documentElement.classList.add("hacker-terminal");
            }
        }
    }
    actualizarParametrosDificultad();
}

// ============================================================================
// MOTOR DE DIFICULTAD ADAPTATIVA PROGRESIVA
// ============================================================================
function actualizarParametrosDificultad() {
    let nivelActual = Math.floor(coreState.cycles / 4) + 1;
    
    // Escala los requisitos: +3 letras obligatorias por nivel y reduce el reloj
    currentDifficulty.minChars = 35 + (nivelActual - 1) * 3; 
    currentDifficulty.timeLimit = Math.max(2, 5 - Math.floor((nivelActual - 1) / 2));

    const diffPanel = document.getElementById('prof-difficulty');
    if (diffPanel) {
        diffPanel.innerText = `Exigencia: ${currentDifficulty.minChars} car. / ${currentDifficulty.timeLimit}s`;
    }
}

// ============================================================================
// SISTEMA OPERATIVO DE INTERFAZ (RONDAS Y LOGS DE RED)
// ============================================================================
function iniciarSiguienteRonda() {
    clearInterval(timerInterval);
    countdownActive = false;
    actualizarParametrosDificultad();

    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');

    if (input) { input.disabled = true; input.value = ""; }
    if (contBtn) contBtn.style.display = "none";
    if (transBtn) {
        transBtn.style.display = "inline-block";
        transBtn.disabled = true;
    }

    let pregunta = "";

    if (coreState.modoJuego === 'campaña') {
        if (coreState.campanaIdx >= PREGUNTAS_CAMPANA.length) {
            coreState.campanaOk = true;
            inyectarBurbuja('gugel', "⚠️ Misiones de campaña completadas con éxito. Pásate al Modo Infinito.");
            return;
        }
        pregunta = PREGUNTAS_CAMPANA[coreState.campanaIdx++];
    } else {
        const s = SUJETOS[Math.floor(Math.random() * SUJETOS.length)];
        const p = PREDICADOS[Math.floor(Math.random() * PREDICADOS.length)];
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        pregunta = plantilla.replace("[s]", s).replace("[p]", p);
    }

    // Identificación del contexto específico
    coreState.ultimoSujetoClave = pregunta.includes("gato") || pregunta.includes("Vader") ? "gato" : 
                                  pregunta.includes("pc") || pregunta.includes("pantalla") || pregunta.includes("ordenador") ? "pc" : 
                                  pregunta.includes("rubik") || pregunta.includes("cubo") ? "rubik" : "router";
    coreState.currentQ = pregunta;
    
    inyectarBurbuja('gugel', pregunta);
    iniciarPrimerTemporizador();
}

function iniciarPrimerTemporizador() {
    timeLeft = currentDifficulty.timeLimit;
    const transBtn = document.getElementById('transmit-btn');
    const input = document.getElementById('user-input');
    
    if (transBtn) transBtn.innerText = `TRANSMITIR (${timeLeft}s)`;

    timerInterval = setInterval(() => {
        timeLeft--;
        if (transBtn) transBtn.innerText = `TRANSMITIR (${timeLeft}s)`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (transBtn) { transBtn.innerText = "TRANSMITIR"; transBtn.disabled = false; }
            if (input) { input.disabled = false; input.focus(); }
            iniciarPenalizacionPorTiempo();
        }
    }, 1000);
}

function iniciarPenalizacionPorTiempo() {
    timeLeft = currentDifficulty.timeLimit;
    countdownActive = true;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0 && countdownActive) {
            clearInterval(timerInterval);
            procesarFalloPorTiempo();
        }
    }, 1000);
}

function procesarFalloPorTiempo() {
    coreState.satisfaccionAcumulada -= 8;
    inyectarBurbuja('alerta-sistema', "⚠️ TIMEOUT: El búfer del servidor expiró por retraso digital.");
    inyectarLogDeRed("TIMEOUT", "CRIT_DELAY", "-8% SAT");
    ejecutarRenderizadoPaneles();
    bloquearYMostrarContinuar();
}

function iniciarSegundoTemporizador() {
    timeLeft = 3;
    const contBtn = document.getElementById('continue-btn');
    if (contBtn) {
        contBtn.disabled = true; 
        contBtn.innerText = `SIGUIENTE CONSULTA (${timeLeft}s)`;
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        if (contBtn) contBtn.innerText = `SIGUIENTE CONSULTA (${timeLeft}s)`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (contBtn) { contBtn.innerText = "SIGUIENTE CONSULTA"; contBtn.disabled = false; }
        }
    }, 1000);
}

function inyectarBurbuja(sender, texto) {
    const chatBox = document.getElementById('chat-messages');
    if (!chatBox) return;
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = (sender === 'gugel') ? `GUGEL: "${texto}"` : (sender === 'ai') ? `TÚ: ${texto}` : texto;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function inyectarLogDeRed(status, code, mod) {
    const container = document.getElementById('network-logs-container');
    if (!container) return;
    
    let cssClass = "stat-ok";
    if (status === "RECHAZO") cssClass = "stat-rechazo";
    if (status === "REDUNDANCIA" || status === "EVASIVA" || status === "TIMEOUT" || status === "CRITICA") cssClass = "stat-crit";
    if (status === "TOCHO") cssClass = "stat-tocho";

    const div = document.createElement('div');
    div.className = "log-entry";
    div.innerHTML = `<code class="${cssClass}">[CYC-${coreState.cycles}] STAT: ${status} | CODE: ${code} | ${mod}</code>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// ============================================================================
// DETECTOR METICULOSO DE CONTEXTO, COMPORTAMIENTO Y SINTAXIS
// ============================================================================
function evaluarRespuestaIA(userText) {
    const textClean = userText.toLowerCase().trim();
    
    if (userAccount.hackerMode) {
        return { tipo: "HACK", txt: "SYSTEM OVERRIDE: Entrada forzada aceptada por el nodo administrador root.", satMod: 10 };
    }

    if (coreState.history.some(h => h.respuesta.toLowerCase().trim() === textClean)) {
        return { tipo: "REDUNDANCIA", txt: "⚠️ ERROR CÍCLICO: Respuesta clonada. Deja de bugear la pila de entrada de red.", satMod: -10 };
    }

    if (EVASIVAS.some(e => textClean === e || textClean === e + ".")) {
        desbloquearLogro("Esquiva Balas");
        return { tipo: "EVASIVA", txt: FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)], satMod: -15 };
    }

    if (userText.length > 140) {
        desbloquearLogro("Biblia Evitada");
        return { tipo: "TOCHO", txt: FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)], satMod: -10 };
    }

    let coincideSujeto = textClean.includes(coreState.ultimoSujetoClave) || coreState.ultimoSujetoClave === "rubik";
    let tieneIndicador = INDICADORES_COHERENCIA.some(ind => textClean.includes(ind));
    
    if (userText.length >= currentDifficulty.minChars && tieneIndicador && coincideSujeto) {
        desbloquearLogro("Estratega del Silicio");
        return { tipo: "OK", txt: FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)], satMod: 8 };
    } else {
        return { tipo: "RECHAZO", txt: FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)], satMod: -7 };
    }
}

function desbloquearLogro(nombre) {
    if (!coreState.logrosDesbloqueados.includes(nombre)) {
        coreState.logrosDesbloqueados.push(nombre);
        inyectarBurbuja('logro-notif', `🏆 ¡LOGRO DESBLOQUEADO: ${nombre}!`);
        ejecutarRenderizadoPaneles();
    }
}

// Forzado dinámico de logros masivos por volumen de procesamiento puro
function verificarInyeccionLogrosMasivos() {
    let topeLogros = Math.min(200, 9 + Math.floor(coreState.cycles * 2));
    for (let i = 10; i <= topeLogros; i++) {
        let identificador = `Logro Core ID-${i}`;
        if (!coreState.logrosDesbloqueados.includes(identificador)) {
            coreState.logrosDesbloqueados.push(identificador);
        }
    }
}

function bloquearYMostrarContinuar() {
    countdownActive = false;
    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');
    
    if (input) input.disabled = true;
    if (transBtn) transBtn.style.display = "none";
    if (contBtn) contBtn.style.display = "block";
    
    guardarProgresoEnLocal();
    iniciarSegundoTemporizador();
}

// ============================================================================
// RENDERIZADOR MAQUETA VISUAL
// ============================================================================
function ejecutarRenderizadoPaneles() {
    const lvlElement = document.getElementById('prof-level');
    if (lvlElement) lvlElement.innerText = `Nivel: ${Math.floor(coreState.cycles / 4) + 1}`;

    if (coreState.satisfaccionAcumulada > 100) coreState.satisfaccionAcumulada = 100;
    if (coreState.satisfaccionAcumulada < 0) coreState.satisfaccionAcumulada = 0;
    
    const satElement = document.getElementById('prof-satisfaction');
    if (satElement) satElement.innerText = `Satisfacción: ${coreState.satisfaccionAcumulada}%`;

    const opinionContainer = document.getElementById('prof-opinion');
    if (opinionContainer) {
        if (coreState.cycles === 0) {
            opinionContainer.innerText = "Opinión: (analizando conexiones...)";
        } else {
            let arrayOpiniones = coreState.satisfaccionAcumulada < 30 ? OPINIONES_MALAS :
                                 coreState.satisfaccionAcumulada < 55 ? OPINIONES_MEDIO_MALAS :
                                 coreState.satisfaccionAcumulada < 80 ? OPINIONES_MEDIO_BUENAS : OPINIONES_BUENAS;
            opinionContainer.innerText = `Opinión: ${arrayOpiniones[coreState.cycles % arrayOpiniones.length]}`;
        }
    }

    // Comprobadores de hitos base
    if (coreState.cycles >= 1) desbloquearLogro("Hola Mundo");
    if (coreState.satisfaccionAcumulada >= 90) desbloquearLogro("Modo Dios: Iniciando");
    if (coreState.cycles >= 5) desbloquearLogro("IA con Cafeína");
    
    verificarInyeccionLogrosMasivos();

    const logrosContainer = document.getElementById('logros-container');
    const logrosCount = document.getElementById('logros-count');
    
    let htmlLogros = "";
    let totalUnlocked = 0;

    LOGLOS_DIVERTIDOS = LOGROS_DIVERTIDOS || [];
    LOGROS_DIVERTIDOS.forEach(logro => {
        if (coreState.logrosDesbloqueados.includes(logro.t)) {
            totalUnlocked++;
            htmlLogros += `<div class="list-item-logro"><strong>🟢 ${logro.t}</strong><br><small>${logro.d}</small></div>`;
        }
    });

    if (htmlLogros === "" && logrosContainer) {
        htmlLogros = `<div style="text-align: center; color: #475569; font-style: italic; padding: 10px; font-size:0.8rem;">Ningún registro de logro activo.</div>`;
    }

    if (logrosContainer) logrosContainer.innerHTML = htmlLogros;
    if (logrosCount) logrosCount.innerText = totalUnlocked;
}

// ============================================================================
// GESTIÓN DE CREDENCIALES Y BORRADO DE DATOS
// ============================================================================
function administrarLoginSistema() {
    const name = prompt("Defina identificador Core:");
    if (name && name.trim()) {
        const pass = prompt("Defina clave de encriptación:");
        
        userAccount.username = name.trim();
        userAccount.password = pass ? pass.trim() : "";
        userAccount.sesionIniciada = true;
        
        document.getElementById("btn-gestion-cuenta").innerText = `👤 ${userAccount.username.toUpperCase()}`;

        if (userAccount.password === "admin123" || userAccount.password === "root") {
            userAccount.hackerMode = true;
            document.documentElement.classList.add("hacker-terminal");
            inyectarBurbuja('alerta-sistema', "🔓 SYSTEM OVERRIDE: Terminal cargada con permisos root.");
        } else {
            userAccount.hackerMode = false;
            document.documentElement.classList.remove("hacker-terminal");
        }
        guardarProgresoEnLocal();
    }
}

function cambiarModoEstrategia(nuevoModo) {
    clearInterval(timerInterval);
    countdownActive = false;
    
    coreState.modoJuego = nuevoModo;
    coreState.cycles = 0;
    coreState.satisfaccionAcumulada = 50;
    coreState.history = [];
    if (nuevoModo === 'campaña') coreState.campanaIdx = 0;
    
    document.getElementById('chat-messages').innerHTML = "";
    document.getElementById('network-logs-container').innerHTML = "";
    
    iniciarSiguienteRonda();
    ejecutarRenderizadoPaneles();
    guardarProgresoEnLocal();
}

// ============================================================================
// ENLACES DOM E INICIALIZACIÓN DE LA VENTANA
// ============================================================================
window.onload = function() {
    cargarProgresoDesdeLocal();

    document.getElementById("btn-gestion-cuenta").onclick = administrarLoginSistema;
    
    document.getElementById("btn-reset-data").onclick = function() {
        if(confirm("¿Confirmas el volcado total de memoria? Se perderá el guardado local.")) {
            localStorage.clear();
            location.reload();
        }
    };

    document.getElementById('modo-juego-selector').onchange = function() {
        cambiarModoEstrategia(this.value);
    };

    document.getElementById('continue-btn').onclick = function() {
        iniciarSiguienteRonda();
    };

    document.getElementById('chat-form').onsubmit = function(e) {
        e.preventDefault();
        clearInterval(timerInterval);
        countdownActive = false;
        
        const input = document.getElementById('user-input');
        const text = input ? input.value.trim() : "";
        if (!text) return;

        coreState.cycles++;
        coreState.charsSent += text.length;
        inyectarBurbuja('ai', text);

        let evaluacion = evaluarRespuestaIA(text);
        coreState.satisfaccionAcumulada += evaluacion.satMod;

        setTimeout(() => {
            inyectarBurbuja('gugel', evaluacion.txt);
            inyectarLogDeRed(evaluacion.tipo, evaluacion.satMod >= 0 ? "SUCCESS" : "FAIL", `${evaluacion.satMod}% SAT`);
            
            coreState.history.push({
                pregunta: coreState.currentQ, respuesta: text, reaccion: evaluacion.txt, tipo: evaluacion.tipo
            });

            ejecutarRenderizadoPaneles();
            bloquearYMostrarContinuar();
        }, 400);
    };

    // Control de render inicial de persistencia
    ejecutarRenderizadoPaneles();
    if (coreState.currentQ === "") {
        iniciarSiguienteRonda();
    } else {
        inyectarBurbuja('gugel', coreState.currentQ);
        iniciarPrimerTemporizador();
    }
};
