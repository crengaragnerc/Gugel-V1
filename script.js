// --- TODAS TUS LISTAS Y ARRAYS ORIGINALES (INTEGRIDAD TOTAL) ---
const PLANTILLAS_PREGUNTAS = ["[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"];
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];
const INFINITO_SUJETOS = ["gato", "perro vecino", "pantalla pc", "gato de la calle", "teclado usb", "router wifi", "conexion internet", "raton optico", "ordenador portatil", "interned"];
const INFINITO_PREDICADOS = ["mira fijo raro", "esta caliente quemando", "no enciende luz", "hace ruido raro", "da calambre", "parpadea sin parar", "no funciona internet", "borra archivos solo", "va a pedales"];
const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];
const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido", "ok eso responde lo que queria", "perfecto gracias por aclararlo", "ah vale ya lo entiendo mejor", "bueno me sirve la explicacion", "ok anotado no parece dificil", "entendido tiene bastante coherencia", "no se me habia ocurrido pero vale", "ahora si me queda claro el asunto", "entendido perfectly esto me aclara el panorama", "vale compro la idea me parece viable", "ahora todo encaja gracias por la info", "bien pensado no le veo ningun fallo", "me convence el argumento directo al grano", "perfecto justo lo que andaba buscando", "buena respuesta se nota que comprendes", "me sirve bastante esta explicacion concisa", "tiene coherencia absoluta me lo apunto", "ok anotado queda claro el concepto", "me parece correcto el planteamiento", "vale entiendo el punto perfectamente", "gracias por resolver la duda de forma clara", "esto responde exactamente a mi consulta", "me queda clarisimo todo resuelto", "vale aceptamos barco tiene logica", "bien estructurado facil de entender", "eso tiene sentido completo gracias", "ok me convence tu respuesta", "ahora si entiendo el trasfondo", "buen analisis me ha servido", "todo claro sin rodeos como me gusta", "me sirve el dato lo guardo", "explicacion impecable todo en orden", "vale es justo lo que necesitaba saber", "tiene base logica me parece bien", "perfectamente aclarado gracias por el texto"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "¿te ha costado mucho esfuerzo escribir eso? esperaba algo mas complejo.", "dios q pereza para decirme eso no pongas nada", "menuda porqueria de respuesta muy vacia", "explicate mejor q no me entero de nada", "escribeme algo mas q pareces un bot perezoso", "no me convence eso es muy simple", "poca informacion me das para lo que pregunto", "vaya linea mas pobre búscame otra cosa", "esperaba mas texto y desarrollo de tu parte", "eso no soluciona mi duda busca otra respuesta", "te has quedado a medias falta desarrollo", "un poco pobre la respuesta esperaba mas", "demasiado escueto no me soluciona nada", "busca mejor que eso no aporta valor", "vaya explicacion mas simple e incompleta", "muy vago todo concreta un poco mas", "esto no aclara mi duda es superficial", "esperaba una respuesta mas elaborada", "te falta informacion por todos lados", "no me convence nada demasiado basico", "una linea no es suficiente para esto", "vaya pereza de definicion busca otra", "corta y vacia no me sirve para nada", "poca chicha tiene esto dame mas datos", "no te has esmerado nada en responder", "con esto no hago nada amplia el texto", "muy resumido se pierde el contexto", "vaya parrafo mas inutil no dice nada", "esperaba un analisis no una frase suelta", "no soluciona la pregunta es muy incompleto", "explicacion de un segundo busca algo mejor", "falta profundidad en tu argumentacion", "vaya contestacion mas floja e imprecisa", "esto no me saca de dudas amplia mas", "muy flojo el nivel de esta respuesta", "no detallas nada asi no hay quien entienda", "esperaba mas sustancia en este parrafo"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura mejor nada", "para esto apago el pc no me vaciles", "pero q dices bicho raro no tiene sentido", "estas rompiendome la cabeza con estas respuestas", "que dejes de vacilarme pesado que no soy tonto", "vete a tomar el pelo a otra parte", "menuda estafa de ia me estas vacilando", "no tiene coherencia ninguna lo que pones", "deja de trolear de una vez y responde bien", "esto es spam o que te pasa en el codigo", "menudo timo de chat no entiendo nada de esas letras", "vaya sarta de tonterias me estas contando", "esto es un sinsentido total estas bugeado", "vaya letras aleatorias no inventes cosas", "deja de trolearme que no tiene logica", "esto parece un error de sintaxis absoluto", "menudo desastre de respuesta me vacilas", "pero que dices eso no tiene relacion alguna", "no digas tonterias y responde en serio", "vaya basura de codigo maneja esta respuesta", "estas delirando o que te pasa en la ram", "para poner esto mejor no respondas nada", "vaya troleo de ia no entiendo tus letras", "menuda tomadura de pelo de buscador", "no entiendo nada parece un fallo de red", "deja de inventar palabras que no existen", "vaya tonteria mas grande acabas de poner", "me estas rompiendo el sistema de lo absurdo", "esto es un troleo maximo responde bien", "menudo bot mas inutil vaya sinsentido", "estas tirando dados para responder esto", "vaya respuesta mas absurda no tiene pies ni cabeza", "me estas vacilando descaradamente para ya", "esto no es una respuesta son caracteres aleatorios", "menuda estafa de procesamiento de datos", "deja el troleo informatico de una vez", "vaya codigo mas roto tienes chaval"];
const FRASES_MUCHO_TEXTO = ["uf mucho texto ni de coña me leo eso", "me has escrito una biblia paso", "vaya chapa me acabas de meter en un momento", "resume un poco q no tengo todo el dia para leer", "menudo textaco paso de leer todo ese rollo", "demasiadas palabras me da pereza maxima", "vaya testamento te has marcado corta un poco", "uf que pereza ver tanto parrafo junto", "menudo tocho de texto no me leo eso ni loco", "vaya biblia me has soltado resume un poco", "que chapa mas grande paso de leer todo", "demasiadas palabras para algo tan simple", "menudo testamento me da pereza maxima", "corta el rollo que esto es interminable", "vaya enciclopedia has escrito reduce texto", "uf que pesadez ver tanto parrafo junto", "resume eso que no tengo todo el dia", "vaya chapa infumable no llego al final", "demasiado largo paso de leer este bloque", "vaya parrafada te has marcado recorta", "me pones un libro entero para una pregunta", "uf que aburrimiento de texto tan extenso", "menuda tesis doctoral corta un poco", "demasiado texto junto me canso de mirar", "vaya sermon has soltado ve al grano", "ni de coña leo toda esa parrafada", "menudo bloque de letras hazlo mas corto", "vaya testamento innecesario resume ya", "uf que chapa historica me acabas de meter", "demasiado extenso no hay quien se lo lea", "vaya rollo de texto reduce lineas por favor", "menudo periodico me has dejado aqui puesto", "uf que pereza maxima ver semejante testamento", "ve al grano directo que esto es larguisimo"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

// --- ESTADO Y DELEGACIÓN ---
let gameState = { modoActual: "campaña", campanaIndex: 0, esperandoRespuesta: false };

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-tema')) document.body.className = e.target.getAttribute('data-tema');
    if (e.target.classList.contains('btn-panel')) {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        const p = document.getElementById(e.target.getAttribute('data-panel'));
        if (p) p.classList.add('active');
    }
    if (e.target.id === 'btn-gestion-cuenta') alert("Gestión de cuenta lista.");
    if (e.target.id === 'btn-mode-campaña' || e.target.id === 'btn-mode-infinito') cambiarModo(e.target.id === 'btn-mode-campaña' ? 'campaña' : 'infinito');
});

function cambiarModo(modo) {
    gameState.modoActual = modo;
    gameState.campanaIndex = 0;
    document.getElementById('chat-messages').innerHTML = ""; 
    nextRound();
}

function nextRound() {
    if (gameState.esperandoRespuesta) return;
    gameState.esperandoRespuesta = true;
    const input = document.getElementById('user-input');
    input.disabled = false;
    input.value = "";
    input.focus();
    appendMessage('gugel', generarPregunta());
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function generarPregunta() {
    if (gameState.modoActual === "campaña") return PREGUNTAS_CAMPANA[gameState.campanaIndex++] || "Fin.";
    const s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
    const p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
    return PLANTILLAS_PREGUNTAS[0].replace("[s]", s).replace("[p]", p);
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    if (!input.value.trim() || !gameState.esperandoRespuesta) return;
    appendMessage('tú', input.value);
    gameState.esperandoRespuesta = false;
    setTimeout(() => {
        appendMessage('gugel', "Respuesta procesada.");
        nextRound();
    }, 500);
};

window.onload = nextRound;
