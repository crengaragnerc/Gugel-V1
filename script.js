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

// --- LAS 65 FRASES OK ORIGINALES AL COMPLETO ---
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
    "informacion estructurada correctamente", "todo claro in este point", "explicacion concisa y directa", 
    "datos validados sin problemas", "el planteamiento es correcto", "me sirve para el analisis", 
    "ningun error in la deduccion", "comprension absoluta del parrafo", "perfecto el desarrollo", 
    "argumentacion solida y clara", "todo coincide con lo esperado", "explicacion limpia y logica", 
    "se entiende a la primera", "datos guardados in memoria", "respuesta admitida por el sistema", 
    "buen enfoque del asunto", "coherencia verificada con exito", "sin mas dudas al respecto", 
    "asimilado correctamente", "la logica es correcta"
];

// --- LAS 65 FRASES RECHAZO ORIGINALES AL COMPLETO ---
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
    "explicacion de un segundo busca algo mejor", "falta profundidad en tu argumentacion",
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

// --- LAS 67 FRASES CRÍTICAS ORIGINALES AL COMPLETO ---
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

// --- LAS 53 FRASES MUCHO TEXTO ORIGINALES AL COMPLETO ---
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

// --- BLOQUES REACCIONALES DE OPINIONES ---
const OPINIONES_MALAS = [
    "(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)", "(esta buscando el boton de formatear)", 
    "(cree que este buscador lo programo un mono)", "(se le esta calentando la cpu del enfado)", "(va a denunciar la aplicacion)", "(piensa que eres peor que el malware de 2004)",
    "(esta buscando el destornillador para abrir el pc)", "(asume que eres un chat obsoleto)", "(piensa que no sirves ni para calcular 2+2)", "(esta insulting al monitor)"
];

const OPINIONES_MEDIO_MALAS = [
    "(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que respondes con los ojos cerrados)",
    "(piensa que eres un becario in tu primer dia)", "(se esta aburriendo soberanamente)", "(busca el boton de saltar consulta)", "(cree que tu sistema tiene lag)"
];

const OPINIONES_MEDIO_BUENAS = [
    "(cree que eres un bot pasable pero va a llamar a un tecnico)", "(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(piensa que vas por buen camino)",
    "(cree que tienes potencial oculto)", "(le ha parecido una respuesta aceptable)", "(asiente levemente con la cabeza)"
];

const OPINIONES_BUENAS = [
    "(se cree que eres dios)", "(te tiene guardado in marcadores prioritarios)", "(piensa que eres la cura del cancer informatico)", "(te va a recomendar in foros de hackers)",
    "(cree que eres una ia alienigena del futuro)", "(esta fascinado con tu velocidad)"
];

// --- REGISTRO DE LOGROS UNIFICADO ---
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

const RECOMENDACIONES_DINAMICAS = {
    "gato": "ayuda mi gato hace ruido raro", "pc": "que pasa si pantalla pc da calambre",
    "teclado": "porque teclado usb borra archivos solo", "router": "como hacer que router wifi parpadea sin parar"
};

// ==========================================
// ESTADO INTERNO Y CONFIGURACIÓN DEL MOTOR
// ==========================================
let coreState = {
    cycles: 0,
    charsSent: 0,
    modoJuego: 'campaña',
    campanaIdx: 0,
    campanaOk: false,
    currentQ: "",
    nextModoSelected: "",
    ultimoSujetoClave: "",
    satisfaccionAcumulada: 50, // Comienzo calibrado estricto
    logrosDesbloqueados: [],
    history: []
};

let timerInterval = null;
let timeLeft = 5;
let userAccount = null;

// ==========================================
// FLUJO OPERATIVO DE RONDAS Y TEMPORIZADOR
// ==========================================
function iniciarSiguienteRonda() {
    clearInterval(timerInterval);
    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');
    const recBox = document.getElementById('streaming-recommendation');

    if (input) { input.disabled = false; input.value = ""; }
    if (transBtn) transBtn.style.display = "inline-block";
    if (contBtn) contBtn.style.display = "none";
    if (recBox) recBox.style.display = "none";

    let pregunta = "";

    if (coreState.modoJuego === 'campaña') {
        if (coreState.campanaIdx >= PREGUNTAS_CAMPANA.length) {
            coreState.campanaOk = true;
            inyectarBurbuja('gugel', "⚠️ misiones completadas con éxito.");
            if (input) input.disabled = true;
            return;
        }
        pregunta = PREGUNTAS_CAMPANA[coreState.campanaIdx++];
        coreState.ultimoSujetoClave = pregunta.includes("gato") ? "gato" : "pc";
    } else {
        const s = SUJETOS[Math.floor(Math.random() * SUJETOS.length)];
        const p = PREDICADOS[Math.floor(Math.random() * PREDICADOS.length)];
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        pregunta = plantilla.replace("[s]", s).replace("[p]", p);
        coreState.ultimoSujetoClave = s.includes("gato") ? "gato" : "router";
    }

    coreState.currentQ = pregunta;
    inyectarBurbuja('gugel', pregunta);
    iniciarTemporizadorRonda();
}

function iniciarTemporizadorRonda() {
    timeLeft = 5;
    const timerDisplay = document.getElementById('countdown-timer');
    if (timerDisplay) timerDisplay.innerText = `⏳ ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timerDisplay) timerDisplay.innerText = `⏳ ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            procesarFalloPorTiempo();
        }
    }, 1000);
}

function procesarFalloPorTiempo() {
    inyectarBurbuja('ai', "[TIEMPO EXTREMO AGOTADO - INACTIVIDAD]");
    let reaccion = FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
    
    // Impacto intermedio calibrado por inactividad
    coreState.satisfaccionAcumulada -= 8;
    coreState.cycles++;

    inyectarBurbuja('gugel', reaccion);
    coreState.history.push({
        pregunta: coreState.currentQ, respuesta: "[TIMEOUT]", reaccion: reaccion, tipo: "rechazo", fav: false
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
// BALANCED EVALUATION ENGINE (RITMO INTERMEDIO)
// ==========================================
function evaluarRespuestaIA(userText) {
    const textClean = userText.toLowerCase().trim();
    
    // Bloque 1: Evasivas Directas
    if (EVASIVAS.some(e => textClean === e || textClean === e + ".")) {
        desbloquearLogro("Esquiva Balas");
        return {
            tipo: "critica",
            txt: FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)],
            satMod: -(Math.floor(Math.random() * 7) + 12) // Descenso entre -12% y -18%
        };
    }

    // Bloque 2: Filtrado Mucho Texto
    if (userText.length > 140) {
        desbloquearLogro("Biblia Evitada");
        return {
            tipo: "mucho_texto",
            txt: FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)],
            satMod: -(Math.floor(Math.random() * 5) + 8) // Descenso entre -8% y -12%
        };
    }

    // Bloque 3: Verificación de coherencia y longitud correcta
    let tieneIndicador = INDICADORES_COHERENCIA.some(ind => textClean.includes(ind));
    
    if (userText.length >= 35 && tieneIndicador) {
        desbloquearLogro("Estratega del Silicio");
        return {
            tipo: "ok",
            txt: FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)],
            satMod: Math.floor(Math.random() * 5) + 5 // Subida equilibrada entre +5% y +9%
        };
    } else {
        // Bloque 4: Respuesta corta o inconexa
        return {
            tipo: "rechazo",
            txt: FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)],
            satMod: -(Math.floor(Math.random() * 5) + 6) // Descenso calibrado entre -6% y -10%
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
        contBtn.innerText = "CONTINUAR";
        coreState.nextModoSelected = coreState.modoJuego;
    }
}

// ==========================================
// VISUALIZACIÓN EN CRIPTO (SABER CUÁNTOS, OCULTAR CUÁLES)
// ==========================================
function ejecutarRenderizadoPaneles() {
    document.getElementById('prof-cycles').innerText = coreState.cycles;
    document.getElementById('prof-chars').innerText = `${coreState.charsSent} carac.`;
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

    // Desbloqueos basados en métricas globales
    if (coreState.cycles >= 1) desbloquearLogro("Hola Mundo");
    if (coreState.satisfaccionAcumulada >= 92) desbloquearLogro("Modo Dios: Iniciando");

    // Lógica Criptográfica de Logros
    const logrosContainer = document.getElementById('logros-container');
    const logrosCount = document.getElementById('logros-count');
    
    let htmlLogros = "";
    let totalUnlocked = 0;
    const maxLogrosTotales = LOGLOS_DIVERTIDOS = LOGROS_DIVERTIDOS.length;

    LOGROS_DIVERTIDOS.forEach(logro => {
        if (coreState.logrosDesbloqueados.includes(logro.t)) {
            totalUnlocked++;
            htmlLogros += `
                <div class="list-item" style="border-left: 4px solid var(--color-accent); background: rgba(0,255,102,0.05)">
                    <strong>🟢 ¡LOGRO DESBLOQUEADO!: ${logro.t}</strong><br>
                    <small style="color: var(--color-gugel);">${logro.d}</small>
                </div>
            `;
        } else {
            htmlLogros += `
                <div class="list-item" style="border-left: 4px solid #333; opacity: 0.4; background: rgba(255,255,255,0.01)">
                    <strong>🔒 Logro Secreto Encriptado</strong><br>
                    <small style="color: #555;">Contenido restringido. Sigue operando el Núcleo de la IA para descifrarlo.</small>
                </div>
            `;
        }
    });

    logrosContainer.innerHTML = htmlLogros;
    logrosCount.innerText = `${totalUnlocked} / ${maxLogrosTotales}`;

    // Historial logs
    document.getElementById('history-list-container').innerHTML = coreState.history.map(h => `
        <div class="list-item">
            <strong>Q: ${h.pregunta}</strong><br>
            <span>A: ${h.respuesta}</span><br>
            <small style="color: var(--color-accent)">GUGEL: ${h.reaccion}</small>
        </div>
    `).join('');
}

// ==========================================
// MANIPULACIÓN DE VISTAS Y NAVEGACIÓN INTERNA
// ==========================================
function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(viewId).classList.add('active');
    const targetBtn = document.getElementById(`btn-${viewId}`);
    if (targetBtn) targetBtn.classList.add('active');
    ejecutarRenderizadoPaneles();
}

function cambiarModoEstrategia(modo) {
    coreState.modoJuego = modo;
    document.getElementById('panel-title-text').innerText = `Interfaz Core - ${modo.toUpperCase()}`;
    switchView('view-core');
    document.getElementById('chat-messages').innerHTML = "";
    iniciarSiguienteRonda();
}

function confirmContinue() {
    iniciarSiguienteRonda();
}

function cambiarTemaVisual(tema) {
    document.body.className = "";
    document.body.classList.add(tema);
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 768) sidebar.classList.toggle('open');
}

function exportCoreData() {
    let output = coreState.history.map(h => `Q: ${h.pregunta}\nA: ${h.respuesta}\n---`).join('\n');
    navigator.clipboard.writeText(output).then(() => alert("Logs volcados al portapapeles."));
}

window.inyectarRecomendacionDirecta = function(preguntaText) {
    cambiarModoEstrategia('infinito');
    coreState.currentQ = preguntaText;
    inyectarBurbuja('gugel', preguntaText);
    iniciarTemporizadorRonda();
};

// ==========================================
// ASIGNACIÓN DE ENLACES DOM AL CARGAR VENTANA
// ==========================================
window.onload = function() {
    document.getElementById("btn-gestion-cuenta").onclick = function() {
        const name = prompt("Nickname:");
        if (name && name.trim()) {
            userAccount = name.trim();
            document.getElementById("btn-gestion-cuenta").innerText = `👤 ${userAccount.toUpperCase()}`;
        }
    };

    const form = document.getElementById('chat-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        clearInterval(timerInterval); // Cortar cuenta atrás activa
        
        const input = document.getElementById('user-input');
        const text = input ? input.value.trim() : "";
        if (!text) return;

        // Anti-repetición implacable
        if (coreState.history.some(h => h.respuesta.toLowerCase().trim() === text.toLowerCase().trim())) {
            alert("⚠️ ERROR: Redundancia cíclica. Respuesta idéntica ya enviada.");
            iniciarTemporizadorRonda();
            return;
        }

        coreState.cycles++;
        coreState.charsSent += text.length;
        inyectarBurbuja('ai', text);

        let evaluacion = evaluarRespuestaIA(text);
        coreState.satisfaccionAcumulada += evaluacion.satMod;

        setTimeout(() => {
            inyectarBurbuja('gugel', evaluacion.txt);
            coreState.history.push({
                pregunta: coreState.currentQ, respuesta: text, reaccion: evaluacion.txt, tipo: evaluacion.tipo, fav: false
            });

            ejecutarRenderizadoPaneles();
            bloquearYMostrarContinuar();

            const recBox = document.getElementById('streaming-recommendation');
            if (recBox && coreState.ultimoSujetoClave) {
                const sugestion = RECOMENDACIONES_DINAMICAS[coreState.ultimoSujetoClave] || "que pasa si pantalla pc da calambre";
                recBox.innerHTML = `📺 Recomendación por contexto: <span style="text-decoration: underline; cursor: pointer; font-weight: bold;" onclick="window.inyectarRecomendacionDirecta('${sugestion}')">${sugestion}</span>`;
                recBox.style.display = "block";
            }
        }, 400);
    };

    // Cerrar menú si haces clic fuera del contenedor (móviles)
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        if (window.innerWidth <= 768 && !sidebar.contains(event.target) && event.target !== toggleBtn) {
            sidebar.classList.remove('open');
        }
    });

    ejecutarRenderizadoPaneles();
    iniciarSiguienteRonda();
};
