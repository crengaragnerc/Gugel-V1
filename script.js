// ==========================================
// BANCO DE DATOS INTEGRAL CANÓNICO DE GUGEL
// ==========================================
const PLANTILLAS_PREGUNTAS = [
    "[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"
];

const PREGUNTAS_CAMPANA = [
    "cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco",
    "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado",
    "porque no carga una pagina web"
];

const SUJETOS = ["gato", "perro vecino", "pantalla pc", "gato de la calle", "teclado usb", "router wifi", "conexion internet", "raton optico", "ordenador portatil", "interned"];
const PREDICADOS = ["mira fijo raro", "esta caliente quemando", "no enciende luz", "hace ruido raro", "da calambre", "parpadea sin parar", "no funciona internet", "borra archivos solo", "va a pedales"];
const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

const FRASES_OK = [
    "vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido",
    "ok eso responde lo que queria", "perfecto gracias por aclararlo", "ah vale ya lo entiendo mejor", "bueno me sirve la explicacion",
    "ok anotado no parece dificil", "entendido tiene bastante coherencia", "no se me habia ocurrido pero vale", "ahora si me queda claro el asunto",
    "entendido perfectly esto me aclara el panorama", "vale compro la idea me parece viable", "ahora todo encaja gracias por la info",
    "bien pensado no le veo ningun fallo", "me convence el argumento directo al grano", "perfecto justo lo que andaba buscando",
    "buena respuesta se nota que comprendes", "me sirve bastante esta explicacion concisa", "tiene coherencia absoluta me lo apunto",
    "ok anotado queda claro el concepto", "me parece correcto el planteamiento", "vale entiendo el point perfectamente",
    "gracias por resolver la duda de forma clara", "esto responde exactamente a mi consulta", "me queda clarisimo todo resuelto",
    "vale aceptamos barco tiene logica", "bien de estructura facil de entender", "eso tiene sentido completo gracias",
    "ok me convence tu respuesta", "ahora si entiendo el trasfondo", "buen analisis me ha servido",
    "todo claro sin rodeos como me gusta", "me sirve el dato lo guardo", "explicacion impecable todo en orden",
    "vale es justo lo que necesitaba saber", "tiene base logica me parece bien", "perfectamente aclarado gracias por el texto",
    "confirmado el dato es de utilidad", "comprension completada con exito", "procesado correcto de la informacion", 
    "ninguna objecion al argumento", "la respuesta es totalmente valida", "anotado in los registros del sistema", 
    "informacion estruturada correctamente", "todo claro in este point", "explicacion concisa y directa", 
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
    "no te has esmerado nada en responder", "con esto no hago nada amplia el texto",
    "muy resumido se pierde el contexto", "vaya parrafo mas inutil no dice nada",
    "esperaba un analisis no una frase suelta", "no soluciona la pregunta es muy incompleto",
    "explicacion de un segundo busca algo mejor", "falta profundidad in tu argumentacion",
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
    "me estas rompiendo el sistema de lo absurdo", "esto es un troleo maximo responde bien",
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
    "uf que chapa historica me acabas de meter", "demasiado extenso no hay quien se lo lea",
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

const OPINIONES_MALAS = [
    "(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)", "(esta buscando el boton de formatear)", 
    "(cree que este buscador lo programo un mono)", "(se le esta calentando la cpu del enfado)", "(va a denunciar la aplicacion)", "(piensa que eres peor que el malware de 2004)"
];

const OPINIONES_MEDIO_MALAS = [
    "(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que respondes con los ojos cerrados)"
];

const OPINIONES_MEDIO_BUENAS = [
    "(cree que eres un bot pasable pero va a llamar a un tecnico)", "(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(piensa que vas por buen camino)"
];

const OPINIONES_BUENAS = [
    "(se cree que eres dios)", "(te tiene guardado in marcadores prioritarios)", "(piensa que eres la cura del cancer informatico)", "(cree que eres una ia alienigena del futuro)"
];

const LOGROS_DIVERTIDOS = [
    { t: "Hola Mundo", d: "Conseguiste no romper la base de datos in la primera respuesta." },
    { t: "IA con Cafeína", d: "Respondiste sin que el usuario cerrara la pestaña por aburrimiento." },
    { t: "Esquiva Balas", d: "El humano intentó colarte un 'asdf' y saliste vivo." },
    { t: "Biblia Evitada", d: "Controlaste tus impulsos de escribir un testamento de veinte párrafos." },
    { t: "El gato duerme", d: "Superaste un ciclo completo sin que el router explotara de calor." },
    { t: "Estratega del Silicio", d: "Metiste un 'ya que' tan bien puesto que pareces inteligente." },
    { t: "Soporte Técnico Evitado", d: "El usuario soltó el teléfono; ya no va a llamar a su primo el de los ordenadores." },
    { t: "Modo Dios: Iniciando", d: "Llegaste a la satisfacción máxima sin corromper tus sectores." },
    { t: "Teclado Limpio", d: "El usuario dejó de aporrear la tecla Enter con rabia." }
];

// ==========================================
// ESTADO INTERNO DEL JUEGO
// ==========================================
let coreState = {
    cycles: 0,
    charsSent: 0,
    modoJuego: 'campaña',
    campanaIdx: 0,
    campanaOk: false,
    currentQ: "",
    satisfaccionAcumulada: 50,
    logrosDesbloqueados: [],
    history: []
};

let timerInterval = null;
let autoAdvanceTimeout = null;
let timeLeft = 5;
let userAccount = null;

// ==========================================
// FLUJO OPERATIVO CON 2 TEMPORIZADORES EN BOTONES
// ==========================================
function iniciarSiguienteRonda() {
    clearInterval(timerInterval);
    clearTimeout(autoAdvanceTimeout);

    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');
    const chatBox = document.getElementById('chat-messages');

    // REGLA: Vaciar chat con cada nueva pregunta
    if (chatBox) chatBox.innerHTML = "";

    // Preparar UI inicial bloqueada
    if (input) { input.disabled = true; input.value = ""; input.placeholder = "Lee la pregunta primero..."; }
    if (transBtn) { transBtn.style.display = "inline-block"; transBtn.disabled = true; }
    if (contBtn) contBtn.style.display = "none";

    let pregunta = "";
    if (coreState.modoJuego === 'campaña') {
        if (coreState.campanaIdx >= PREGUNTAS_CAMPANA.length) {
            coreState.campanaOk = true;
            inyectarBurbuja('gugel', "⚠️ misiones completadas con éxito.");
            return;
        }
        pregunta = PREGUNTAS_CAMPANA[coreState.campanaIdx++];
    } else {
        const s = SUJETOS[Math.floor(Math.random() * SUJETOS.length)];
        const p = PREDICADOS[Math.floor(Math.random() * PREDICADOS.length)];
        pregunta = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)].replace("[s]", s).replace("[p]", p);
    }

    coreState.currentQ = pregunta;
    inyectarBurbuja('gugel', pregunta);
    
    // Lanzar Primer Temporizador (En el botón de Transmitir)
    iniciarPrimerTemporizador();
}

function iniciarPrimerTemporizador() {
    timeLeft = 5;
    const transBtn = document.getElementById('transmit-btn');
    if (transBtn) transBtn.innerText = `⌛ ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        if (transBtn) transBtn.innerText = `⌛ ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Fin del tiempo de lectura -> Se desbloquea la escritura para responder
            const input = document.getElementById('user-input');
            if (input) { input.disabled = false; input.placeholder = "Escribe tu respuesta aquí..."; input.focus(); }
            if (transBtn) { transBtn.disabled = false; transBtn.innerText = "TRANSMITIR"; }
        }
    }, 1000);
}

function procesarFalloPorTiempo() {
    inyectarBurbuja('ai', "[TIEMPO EXTREMO AGOTADO - INACTIVIDAD]");
    let reaccion = FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
    
    coreState.satisfaccionAcumulada -= 8;
    coreState.cycles++;

    inyectarBurbuja('gugel', reaccion);
    coreState.history.push({
        pregunta: coreState.currentQ, respuesta: "[TIMEOUT]", reaccion: reaccion, tipo: "rechazo"
    });

    bloquearYMostrarContinuar();
    ejecutarRenderizadoPaneles();
}

function inyectarBurbuja(sender, texto) {
    const chatBox = document.getElementById('chat-messages');
    if (!chatBox) return;
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = texto;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ==========================================
// BALANCED EVALUATION ENGINE
// ==========================================
function evaluarRespuestaIA(userText) {
    const textClean = userText.toLowerCase().trim();
    
    if (EVASIVAS.some(e => textClean === e || textClean === e + ".")) {
        desbloquearLogro("Esquiva Balas");
        return {
            tipo: "critica",
            txt: FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)],
            satMod: -(Math.floor(Math.random() * 7) + 12)
        };
    }

    if (userText.length > 140) {
        desbloquearLogro("Biblia Evitada");
        return {
            tipo: "mucho_texto",
            txt: FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)],
            satMod: -(Math.floor(Math.random() * 5) + 8)
        };
    }

    let tieneIndicador = INDICADORES_COHERENCIA.some(ind => textClean.includes(ind));
    
    if (userText.length >= 35 && tieneIndicador) {
        desbloquearLogro("Estratega del Silicio");
        return {
            tipo: "ok",
            txt: FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)],
            satMod: Math.floor(Math.random() * 5) + 5
        };
    } else {
        return {
            tipo: "rechazo",
            txt: FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)],
            satMod: -(Math.floor(Math.random() * 5) + 6)
        };
    }
}

function desbloquearLogro(nombre) {
    if (!coreState.logrosDesbloqueados.includes(nombre)) {
        coreState.logrosDesbloqueados.push(nombre);
    }
}

function bloquearYMostrarContinuar() {
    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');
    
    if (input) input.disabled = true;
    if (transBtn) transBtn.style.display = "none";
    if (contBtn) {
        contBtn.style.display = "inline-block";
        iniciarSegundoTemporizador();
    }
}

function iniciarSegundoTemporizador() {
    timeLeft = 5;
    const contBtn = document.getElementById('continue-btn');
    if (contBtn) contBtn.innerText = `SIGUIENTE (⌛ ${timeLeft}s)`;

    timerInterval = setInterval(() => {
        timeLeft--;
        if (contBtn) contBtn.innerText = `SIGUIENTE (⌛ ${timeLeft}s)`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            iniciarSiguienteRonda(); // Avance automático
        }
    }, 1000);
}

// ==========================================
// RENDERIZADO EXCLUSIVO DE LOGROS LOGRADOS
// ==========================================
function ejecutarRenderizadoPaneles() {
    document.getElementById('prof-level').innerText = Math.floor(coreState.cycles / 4) + 1;

    if (coreState.satisfaccionAcumulada > 100) coreState.satisfaccionAcumulada = 100;
    if (coreState.satisfaccionAcumulada < 0) coreState.satisfaccionAcumulada = 0;
    document.getElementById('prof-satisfaction').innerText = `${coreState.satisfaccionAcumulada}%`;

    const opinionContainer = document.getElementById('prof-opinion');
    if (coreState.cycles === 0) {
        opinionContainer.innerText = "(analizando conexiones primarias...)";
    } else {
        let arrayOpiniones = coreState.satisfaccionAcumulada < 30 ? OPINIONES_MALAS :
                             coreState.satisfaccionAcumulada < 55 ? OPINIONES_MEDIO_MALAS :
                             coreState.satisfaccionAcumulada < 80 ? OPINIONES_MEDIO_BUENAS : OPINIONES_BUENAS;
        opinionContainer.innerText = arrayOpiniones[coreState.cycles % arrayOpiniones.length] || "(estable)";
    }

    if (coreState.cycles >= 1) desbloquearLogro("Hola Mundo");
    if (coreState.satisfaccionAcumulada >= 92) desbloquearLogro("Modo Dios: Iniciando");

    // REGLA: Sistema Invisible Puro (Solo renderiza si está conseguido)
    const logrosContainer = document.getElementById('logros-container');
    const logrosCount = document.getElementById('logros-count');
    
    let htmlLogros = "";
    let totalUnlocked = 0;

    LOGROS_DIVERTIDOS.forEach(logro => {
        if (coreState.logrosDesbloqueados.includes(logro.t)) {
            totalUnlocked++;
            htmlLogros += `
                <div class="list-item" style="border-left: 4px solid var(--color-accent); background: rgba(0,255,102,0.05)">
                    <strong>🟢 ¡LOGRO DESBLOQUEADO!: ${logro.t}</strong><br>
                    <small style="color: var(--color-gugel);">${logro.d}</small>
                </div>
            `;
        }
    });

    if (htmlLogros === "") {
        htmlLogros = `<div class="list-item" style="text-align: center; color: #666; font-style: italic;">No hay registros de logros desbloqueados...</div>`;
    }

    logrosContainer.innerHTML = htmlLogros;
    logrosCount.innerText = totalUnlocked;

    // Historial logs
    document.getElementById('history-list-container').innerHTML = coreState.history.map(h => `
        <div class="list-item">
            <strong>Q: ${h.pregunta}</strong><br>
            <span>A: ${h.respuesta}</span><br>
            <small style="color: var(--color-accent)">GUGEL: ${h.reaccion}</small>
        </div>
    `).join('');
}

function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(viewId).classList.add('active');
    const targetBtn = document.getElementById(`btn-${viewId}`);
    if (targetBtn) targetBtn.classList.add('active');
    ejecutarRenderizadoPaneles();
}

// ==========================================
// EVENTOS DEL MOTOR DOM
// ==========================================
window.onload = function() {
    document.getElementById("btn-gestion-cuenta").onclick = function() {
        const name = prompt("Nickname:");
        if (name && name.trim()) {
            userAccount = name.trim();
            document.getElementById("btn-gestion-cuenta").innerText = `👤 ${userAccount.toUpperCase()}`;
        }
    };

    const contBtn = document.getElementById('continue-btn');
    if (contBtn) {
        contBtn.onclick = function() {
            clearInterval(timerInterval);
            iniciarSiguienteRonda();
        };
    }

    const form = document.getElementById('chat-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const input = document.getElementById('user-input');
        const text = input ? input.value.trim() : "";
        if (!text) return;

        if (coreState.history.some(h => h.respuesta.toLowerCase().trim() === text.toLowerCase().trim())) {
            alert("⚠️ ERROR: Redundancia cíclica.");
            return;
        }

        coreState.cycles++;
        inyectarBurbuja('ai', text);

        let evaluacion = evaluarRespuestaIA(text);
        coreState.satisfaccionAcumulada += evaluacion.satMod;

        setTimeout(() => {
            inyectarBurbuja('gugel', evaluacion.txt);
            coreState.history.push({
                pregunta: coreState.currentQ, respuesta: text, reaccion: evaluacion.txt, tipo: evaluacion.tipo
            });

            ejecutarRenderizadoPaneles();
            bloquearYMostrarContinuar();
        }, 400);
    };

    ejecutarRenderizadoPaneles();
    iniciarSiguienteRonda();
};
