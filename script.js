// ==========================================
// 1. CONSTANTES Y LISTAS (ESENCIA GUGEL)
// ==========================================
const PLANTILLAS_PREGUNTAS = ["[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"];
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];
const INFINITO_SUJETOS = ["gato", "perro vecino", "pantalla pc", "gato de la calle", "teclado usb", "router wifi", "conexion internet", "raton optico", "ordenador portatil", "interned"];
const INFINITO_PREDICADOS = ["mira fijo raro", "esta caliente quemando", "no enciende luz", "hace ruido raro", "da calambre", "parpadea sin parar", "no funciona internet", "borra archivos solo", "va a pedales"];
const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];

const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido", "ok eso responde lo que queria", "perfecto gracias por aclararlo", "ah vale ya lo entiendo mejor", "bueno me sirve la explicacion", "ok anotado no parece dificil", "entendido tiene bastante coherencia", "no se me habia ocurrido pero vale", "ahora si me queda claro el asunto", "entendido perfectly esto me aclara el panorama", "vale compro la idea me parece viable", "ahora todo encaja gracias por la info", "bien pensado no le veo ningun fallo", "me convence el argumento directo al grano", "perfecto justo lo que andaba buscando", "buena respuesta se nota que comprendes", "me sirve bastante esta explicacion concisa", "tiene coherencia absoluta me lo apunto", "ok anotado queda claro el concepto", "me parece correcto el planteamiento", "vale entiendo el punto perfectamente", "gracias por resolver la duda de forma clara", "esto responde exactamente a mi consulta", "me queda clarisimo todo resuelto", "vale aceptamos barco tiene logica", "bien estructurado facil de entender", "eso tiene sentido completo gracias", "ok me convence tu respuesta", "ahora si entiendo el trasfondo", "buen analisis me ha servido", "todo claro sin rodeos como me gusta", "me sirve el dato lo guardo", "explicacion impecable todo en orden", "vale es justo lo que necesitaba saber", "tiene base logica me parece bien", "perfectamente aclarado gracias por el texto"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "¿te ha costado mucho esfuerzo escribir eso? esperaba algo mas complejo.", "dios q pereza para decirme eso no pongas nada", "menuda porqueria de respuesta muy vacia", "explicate mejor q no me entero de nada", "escribeme algo mas q pareces un bot perezoso", "no me convence eso es muy simple", "poca informacion me das para lo que pregunto", "vaya linea mas pobre búscame otra cosa", "esperaba mas texto y desarrollo de tu parte", "eso no soluciona mi duda busca otra respuesta", "te has quedado a medias falta desarrollo", "un poco pobre la respuesta esperaba mas", "demasiado escueto no me soluciona nada", "busca mejor que eso no aporta valor", "vaya explicacion mas simple e incompleta", "muy vago todo concreta un poco mas", "esto no aclara mi duda es superficial", "esperaba una respuesta mas elaborada", "te falta informacion por todos lados", "no me convence nada demasiado basico", "una linea no es suficiente para esto", "vaya pereza de definicion busca otra", "corta y vacia no me sirve para nada", "poca chicha tiene esto dame mas datos", "no te has esmerado nada en responder", "con esto no hago nada amplia el texto", "muy resumido se pierde el contexto", "vaya parrafo mas inutil no dice nada", "esperaba un analisis no una frase suelta", "no soluciona la pregunta es muy incompleto", "explicacion de un segundo busca algo mejor", "falta profundidad en tu argumentacion", "vaya contestacion mas floja e imprecisa", "esto no me saca de dudas amplia mas", "muy flojo el nivel de esta respuesta", "no detallas nada asi no hay quien entienda", "esperaba mas sustancia en este parrafo"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura mejor nada", "para esto apago el pc no me vaciles", "pero q dices bicho raro no tiene sentido", "estas rompiendome la cabeza con estas respuestas", "que dejes de vacilarme pesado que no soy tonto", "vete a tomar el pelo a otra parte", "menuda estafa de ia me estas vacilando", "no tiene coherencia ninguna lo que pones", "deja de trolear de una vez y responde bien", "esto es spam o que te pasa en el codigo", "menudo timo de chat no entiendo nada de esas letras", "vaya sarta de tonterias me estas contando", "esto es un sinsentido total estas bugeado", "vaya letras aleatorias no inventes cosas", "deja de trolearme que no tiene logica", "esto parece un error de sintaxis absoluto", "menudo desastre de respuesta me vacilas", "pero que dices eso no tiene relacion alguna", "no digas tonterias y responde en serio", "vaya basura de codigo maneja esta respuesta", "estas delirando o que te pasa en la ram", "para poner esto mejor no respondas nada", "vaya troleo de ia no entiendo tus letras", "menuda tomadura de pelo de buscador", "no entiendo nada parece un fallo de red", "deja de inventar palabras que no existen", "vaya tonteria mas grande acabas de poner", "me estas rompiendo el sistema de lo absurdo", "esto es un troleo maximo responde bien", "menudo bot mas inutil vaya sinsentido", "estas tirando dados para responder esto", "vaya respuesta mas absurda no tiene pies ni cabeza", "me estas vacilando descaradamente para ya", "esto no es una respuesta son caracteres aleatorios", "menuda estafa de procesamiento de datos", "deja el troleo informatico de una vez", "vaya codigo mas roto tienes chaval"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

const OPINIONES_BAJA = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores)"];

// --- SISTEMA LOGROS (150) ---
const BASE_LOGROS = Array.from({ length: 150 }, (_, i) => ({ id: i, titulo: `Logro #${i + 1}`, desc: "Desbloqueo secreto de sistema." }));

// ==========================================
// 2. ESTADO Y LÓGICA (TODO UNIFICADO)
// ==========================================
let gameState = { 
    campanaIndex: 0, 
    satisfaction: 50, 
    history: [], 
    logrosDesbloqueados: [], 
    favoritos: [],
    recentReactions: [] 
};

// --- NAVEGACIÓN Y TEMA ---
function cambiarPanel(panelId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
}

function cambiarTema(nuevoTema) {
    document.body.className = nuevoTema;
    localStorage.setItem('gugel-tema', nuevoTema);
}

// --- UTILIDADES ---
function obtenerElementoNoRepetido(lista, historial) {
    let opciones = lista.filter(item => !historial.includes(item));
    if (opciones.length === 0) opciones = lista;
    let item = opciones[Math.floor(Math.random() * opciones.length)];
    historial.push(item);
    if (historial.length > 10) historial.shift();
    return item;
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (box) {
        const msg = document.createElement('div');
        msg.className = `message ${sender}`;
        msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
        box.appendChild(msg);
    }
    gameState.history.push({ pregunta: gameState.currentPregunta || "Sistema", respuesta: text });
}

function renderAllData() {
    const hist = document.getElementById('history-list-container');
    if (hist) {
        hist.innerHTML = gameState.history.map((h, i) => `<div><strong>${h.pregunta}:</strong> ${h.respuesta} <button onclick="marcarFavorito(${i})">⭐</button></div>`).join('');
    }
    const op = document.getElementById('prof-opinion');
    const sat = document.getElementById('prof-satisfaction');
    if (op) op.innerText = gameState.satisfaction < 50 ? obtenerElementoNoRepetido(OPINIONES_BAJA, []) : obtenerElementoNoRepetido(OPINIONES_ALTA, []);
    if (sat) sat.innerText = gameState.satisfaction + "%";
    
    const logList = document.getElementById('logros-container');
    if (logList) logList.innerHTML = gameState.logrosDesbloqueados.map(l => `<li>${l.titulo}</li>`).join('');
    const count = document.getElementById('logros-count');
    if (count) count.innerText = gameState.logrosDesbloqueados.length + "/150";
}

// --- MOTOR DE JUEGO ---
document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim().toLowerCase();
    
    appendMessage('tú', userText);
    input.value = "";
    
    let tipo = EVASIVAS.includes(userText) ? "CRITICA" : (userText.length <= 15 ? "RECHAZO" : "OK");
    let reaccion = tipo === "CRITICA" ? obtenerElementoNoRepetido(FRASES_CRITICAS, gameState.recentReactions) :
                   tipo === "RECHAZO" ? obtenerElementoNoRepetido(FRASES_RECHAZO, gameState.recentReactions) :
                   obtenerElementoNoRepetido(FRASES_OK, gameState.recentReactions);
    
    gameState.satisfaction += (tipo === "OK" ? 5 : -10);

    setTimeout(() => {
        appendMessage('gugel', reaccion);
        if(gameState.logrosDesbloqueados.length < 150) gameState.logrosDesbloqueados.push(BASE_LOGROS[gameState.logrosDesbloqueados.length]);
        renderAllData();
    }, 500);
};

function nextRound() {
    gameState.currentPregunta = PREGUNTAS_CAMPANA[gameState.campanaIndex++ % PREGUNTAS_CAMPANA.length];
    document.getElementById('chat-messages').innerHTML = "";
    appendMessage('gugel', gameState.currentPregunta);
}

document.addEventListener('DOMContentLoaded', () => { 
    nextRound(); 
    renderAllData(); 
});
