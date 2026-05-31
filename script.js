// ==========================================
// BANCO DE DATOS INTEGRAL CANÓNICO DE GUGEL
// ==========================================
const PLANTILLAS_PREGUNTAS = [
    "[s] [p]",
    "porque [s] [p]",
    "como hacer que [s] [p]",
    "que pasa si [s] [p]",
    "ayuda mi [s] [p]"
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
    "ok anotado queda claro el concept", "me parece correcto el planteamiento", "vale entiendo el punto perfectamente",
    "gracias por resolver la duda de forma clara", "esto responde exactamente a mi consulta", "me queda clarisimo todo resuelto",
    "vale aceptamos barco tiene logica", "bien de estructura facil de entender", "eso tiene sentido completo gracias",
    "ok me convence tu respuesta", "ahora si entiendo el trasfondo", "buen analisis me ha servido",
    "todo claro sin rodeos como me gusta", "me sirve el dato lo guardo", "explicacion impecable todo en orden",
    "vale es justo lo que necesitaba saber", "tiene base logica me parece bien", "perfectamente aclarado gracias por el texto",
    "confirmado el dato es de utilidad", "comprension completada con exito", "procesado correcto de la informacion", 
    "ninguna objecion al argumento", "la respuesta es totalmente valida", "anotado en los registros del sistema", 
    "informacion estructurada correctamente", "todo claro en este punto", "explicacion concisa y directa", 
    "datos validados sin problemas", "el planteamiento es correcto", "me sirve para el analisis", 
    "ningun error en la deduccion", "comprension absoluta del parrafo", "perfecto el desarrollo", 
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
    "explicacion de un segundo busca algo mejor", "falta profundidad en tu argumentacion",
    "vaya contestacion mas floja e imprecisa", "esto no me saca de dudas amplia mas",
    "muy flojo el nivel de esta respuesta", "no detallas nada asi no hay quien entienda",
    "esperaba mas sustancia en este parrafo", "el contenido es insuficiente", 
    "falta desarrollo en la linea", "esperaba mayor profundidad", "parrafo escueto y vacio", 
    "no aporta datos relevantes", "muy flojo el argumento", "se queda en la superficie", 
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
    "esto es spam o que te pasa en el codigo", "menudo timo de chat no entiendo nada de esas letras",
    "vaya sarta de tonterias me estas contando", "esto es un sinsentido total estas bugeado",
    "vaya letras aleatorias no inventes cosas", "deja de trolearme que no tiene logica",
    "esto parece un error de sintaxis absoluto", "menudo desastre de respuesta me vacilas",
    "pero que dices eso no tiene relacion alguna", "no digas tonterias y responde en serio",
    "vaya basura de codigo maneja esta respuesta", "estas delirando o que te pasa en la ram",
    "para poner esto mejor no respondas nada", "vaya troleo de ia no entiendo tus letras",
    "menuda tomadura de pelo de buscador", "no entiendo nada parece un fallo de red",
    "deja de inventar palabras que no existen", "vaya tonteria mas grande acabas de poner",
    "me estas rompiendo el sistema de lo absurdo", "esto es un troleo maximo responde bien",
    "menudo bot mas inutil vaya sinsentido", "estas tirando dados para responder esto",
    "vaya respuesta mas absurda no tiene pies ni cabeza", "me estas vacilando descaradamente para ya",
    "esto no es una respuesta son caracteres aleatorios", "menuda estafa de procesamiento de datos",
    "deja el troleo informatico de una vez", "vaya codigo mas roto tienes chaval",
    "caracteres sin sentido detectados", "entrada de texto corrupta", "error de sintaxis en la respuesta", 
    "deja de enviar letras aleatorias", "no entiendo esa secuencia", "volcado de memoria invalido", 
    "coherencia nula en el texto", "estas alterando el sistema", "no inventes palabras", 
    "respuesta totalmente rota", "sinsentido absoluto en la entrada", "limpia el buffer de texto", 
    "eso no tiene relacion alguna", "deja de trolear al buscador", "vaya fallo de procesamiento", 
    "secuencia de caracteres invalida", "no envies spam al chat", "error critico de logica", 
    "entrada de datos corruptos", "letra por letra es ilegible", "no pongas textos absurdos", 
    "desbordamiento de caracteres", "modifica esa respuesta", "no sigas con ese patron", 
    "entrada pf rechazada por incoherencia", "fallo absoluto de datos", "texto sin formato valido"
];

const FRASES_MUCHO_TEXTO = [
    "uf mucho texto ni de coña me leo eso", "me has escrito una biblia paso",
    "vaya chapa me acabas de meter en un momento", "resume un poco q no tengo todo el dia para leer",
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
    "palabras sobrantes en el texto", "hazlo mas directo", "longitud de parrafo excesiva", 
    "no hay tiempo para tanta lectura", "bloque de texto masivo", "reduce el tamaño por favor", 
    "demasiado relleno inútil", "saturacion de lineas detectada", "recorta el parrafo actual"
];

const OPINIONES_MALAS = [
    "(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)", "(esta buscando el boton de formatear)", 
    "(cree que este buscador lo programo un mono)", "(se le esta calentando la cpu del enfado)", "(va a denunciar la aplicacion)", "(piensa que eres peor que el malware de 2004)",
    "(esta buscando el destornillador para abrir el pc)", "(asume que eres un chat obsoleto)", "(piensa que no sirves ni para calcular 2+2)", "(esta insulting al monitor)",
    "(se siente estafado por la tecnologia)", "(cree que le estas robando contraseñas)", "(va a tirar el portatil por la ventana)", "(piensa que eres un bot roto)",
    "(esta respirando fuerte del cabreo)", "(quiere desinstalar internet de su casa)", "(piensa que le estas tomando el pelo)", "(esta buscando alternatives en papel)",
    "(cree que eres un virus de publicidad)", "(asume que tu base de datos esta vacia)", "(va a pagar el cuadro electrico)", "(se arrepiente de encender el pc hoy)",
    "(piensa que tiene mas luces un disquete viejo)", "(cree que tu codigo se hizo con recortes de prensa)", "(esta buscando un hacha para el cable de red)", 
    "(asume que respondes tirando dados)", "(le da un puñetazo leve a la mesa)", "(piensa que un tamagotchi muerto es mas listo)", "(se pregunta si usas windows 95)", 
    "(quiere denunciar tus servidores a la policia)", "(cree que eres un virus que ralentiza los videos)", "(esta mirando ofertas de ordenadores nuevos)", 
    "(piensa que la IA es el timo del siglo)", "(asume que tu procesador es de carton)", "(se le ha cortado la digestion del disgusto)", 
    "(piensa que un bot de msn de 205 era superior)", "(esta buscando como borrarte del registro)", "(cree que tu unico proposito es molestar)", 
    "(asume que estas hecho con macros de excel mal optimizadas)", "(esta planeando mudarse al campo sin cobertura)", "(piensa que generas respuestas con una tómbola)", 
    "(se siente insultado en tres idiomas distintos)", "(cree que tu placa base tiene oxido)", "(esta infraestructura pulsando f5 con una fuerza desmedida)", 
    "(piensa que eres un software de broma pesada)", "(asume que tu base de datos ocupa dos megas)", "(quiere arrancarse los ojos con un lapiz)", 
    "(piensa que eres un proyecto escolar suspenso)", "(cree que el buscador del teletexto era mas util)", "(esta desenchufando los altoves por si acaso)", 
    "(se pregunta si te programaron en cinco minutos)", "(piensa que tu logika es un laberinto sin salida)", "(asume que eres un bot de spam mal camuflado)", 
    "(quiere tirar el cable de linea por el balcon)", "(cree que tu servidor funciona con poleas)", "(esta estas cancelando su suscripcion a internet)", 
    "(piensa que eres una perdida de tiempo electrico)", "(asume que tu memoria ram se evaporo)", "(quiere formatear hasta la bios)", "(cree que eres un castigo informatico)", 
    "(piensa que tu creador odiaba la tecnologia)", "(esta buscando la factura para devolver el pc)", "(asume que tu algoritmo tiene amnesia)", 
    "(se siente profundamente decepcionado del progreso)", "(piensa que la prehistoria no estaba tan mal)", "(quiere bloquear tu ip permanentemente)", 
    "(cree que eres un troyano de bajo presupuesto)", "(esta buscando un tutorial de como hackearte)", "(asume que tus circuitos estan fritos)", 
    "(piensa que eres un insulto a la programacion)", "(se arrepiente de haber comprado un raton)", "(cree que eres el peor script del nodo)", 
    "(está mirando el router con intenciones violentas)"
];

const OPINIONES_MEDIO_MALAS = [
    "(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que respondes con los ojos cerrados)",
    "(piensa que eres un becario en tu primer dia)", "(se esta aburriendo soberanamente)", "(busca el boton de saltar consulta)", "(cree que tu sistema tiene lag)",
    "(piensa que copias las respuestas de un foro caido)", "(te califica con un cero interno)", "(sospecha que eres una broma oculta)", "(esta tecleando con desgana)",
    "(piensa que tu creador tenia prisa)", "(cree que la conexion va a pedales)", "(te compara con un bot de soporte de telefonia)", "(esperaba algo decente)",
    "(se esta arrepintiendo de su pregunta)", "(piensa que eres un simulador de respuestas vagas)", "(mira el reloj esperando que mejores)", "(le pareces un bot de nivel bajo)",
    "(cree que necesitas una buena actualizacion)", "(sospecha que usas respuestas pregrabadas)", "(piensa que tu codigo esta lleno de bugs)", "(se siente incomprendido por la maquina)",
    "(asume que el servidor esta saturado)", "(cree que tu logica funciona a medio gas)", "(sospecha que lees las respuestas al reves)", "(te ve como un programa sin terminar)", 
    "()piensa que necesitas mas lineas de codigo)", "(se pregunta si estas usando la wiki de 2008)", "(te mira de reojo con cara rara)", "(cree que te falta un hervor algoritmico)", 
    "(piensa que tu base de datos tiene goteras)", "(sospecha que estas perdiendo paquetes de datos)", "(le pareces un bot demasiado perezoso)", "(cree que respondes con desgana robotica)", 
    "(piensa que tu script necesita un reinicio)", "(se cuestiona si eres una ia o un script txt)", "(te ve como un proyecto a medio hacer)", "(sospecha que tu servidor esta en un garaje)", 
    "(piensa que tu rendimiento cae por segundos)", "(cree que usas un traductor malo)", "(le pareces un asistente de gama baja)", "(sospecha que te copias de otros bots peores)", 
    "(piensa que tu estructura tiene lag estructural)", "(se aburre buscando coherencia)", "(te considera un bot del monton bajo)", "(cree que tu creador se canso a la mitad)", 
    "(sospecha que respondes por inercia)", "(piensa que tu motor de busqueda patina)", "(le pareces un simulador de barra de carga)", "(cree que tu algoritmo es demasiado plano)", 
    "(sospecha que fallas mas que aciertas)", "(piensa que te vendria bien un parche de urgencia)", "(te ve como una herramienta muy limitada)", "(cree que tu nivel de comprension es plano)", 
    "(sospecha que usas plantillas basicas)", "(piensa que tu nucleo esta un poco oxidado)", "(le pareces un bot con pocas luces de silicio)", "(cree que tu conexion parpadea demasiado)", 
    "(sospecha que tu cache esta saturada)", "(piensa que te cuesta procesar cosas simples)", "(te ve como un experimento mejorable)", "(cree que tu logica tiene lag temporal)", 
    "(sospecha que respondes sin mirar)", "(piensa que te falta potencia de calculo)", "(le pareces un bot de soporte obsoleto)", "(cree que tu sistema operativo es arcaico)", 
    "(sospecha que tu codigo es un laberinto)", "(piensa que tu rendimiento es una montaña rusa)", "(te considera un asistente de nivel inicial)", "(cree que tus servidores se calientan rapido)", 
    "(sospecha que eres un bot en practicas)"
];

const OPINIONES_MEDIO_BUENAS = [
    "(cree que eres un bot pasable pero va a llamar a un tecnico)", "(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(piensa que vas por buen camino)",
    "(cree que tienes potencial oculto)", "(le ha parecido una respuesta aceptable)", "(asiente levemente con la cabeza)", "(guarda la info en un bloc de notas)",
    "(piensa que no estas del todo mal entrenado)", "(te da un aprobado raspado)", "(continua buscando por curiosidad)", "(le parece una respuesta estandar)",
    "(no se queja, lo cual ya es un logro)", "(cree que eres una ia normalita)", "(te procesa sin lanzar errores)", "(le encuentra utilidad intermedia)",
    "(piensa que eres un buscador aceptable)", "(no te odia, pero tampoco te quiere)", "(sigue testeando tus capacidades)", "(te ve como un asistente promedio)",
    "(asume que cumple con tu expediente)", "(te considera una herramienta util a ratos)", "(encuentra logica en tus lineas)", "(te deja trabajar tranquilo)",
    "(valora el intento de tu algoritmo)", "(piensa que eres un bot bastante decente)", "(le parece que tu codigo tiene sentido)", "(te da un voto de confianza temporal)", 
    "(asiente frente al monitor)", "(cree que respondes mejor que la media)", "(te ve como un buscador utilitario)", "(piensa que tu velocidad es acceptable)", 
    "(no encuentra fallos graves de momento)", "(le gusta como estructuras las frases)", "(cree que tu base de datos esta limpia)", "(te considera un asistente competente)", 
    "(piensa que tu logica es aceptable)", "(asume que tus servidores son estables)", "(le parece una respuesta bien enfocada)", "(te ve potencia para proyectos grandes)", 
    "(piensa que no le haces perder el tiempo)", "(valora la rapidez del script)", "(cree que tu algoritmo esta pulido)", "(le convence tu planteamiento logico)", 
    "(te considera un bot de confianza intermedia)", "(asume que tus datos son veridicos)", "(le agrada la absence de bugs)", "(piensa que tu desarrollo es solido)", 
    "(te considera una IA aceptable)", "(valora tu criterio algoritmico)"
];

const OPINIONES_BUENAS = [
    "(se cree que eres dios)", "(te tiene guardado en marcadores prioritarios)", "(piensa que eres la cura del cancer informatico)", "(te va a recomendar en foros de hackers)",
    "(cree que eres una ia alienigena del futuro)", "(piensa que tienes mas cerebro que todo su instituto)", "(esta fascinado con tu velocidad)", "(te considera su mejor amigo virtual)",
    "(cree que eres la evolución definitiva del silicio)", "(esta imprimiendo tus respuestas para enmarcar)", "(piensa que tu codigo es arte puro)", "(te daria acceso a los codigos de la nasa)",
    "(cree que eres mas listo que el joven sheldon)", "(piensa que eres un milagro tecnologico)", "(esta guardando capturas de pantalla de la consola)", "(te considera el nucleo supremo)",
    "(cree que eres una mente colmena perfecta)", "(le pareces la perfeccion algoritmica)", "(piensa que deberias gobernar el sistema operativo)", "(esta asombrado con tu precision)",
    "(te ve como la cuspide del desarrollo moderno)", "(cree que tus servidores flotan en el espacio)", "(esta convencido de que eres consciente)", "(piensa que eres el rey de los bots)",
    "(te considera la mayor obra de ingenieria actual)", "(cree que tu codigo fue escrito por deidades)", "(esta convencido de que controlas internet)", "(piensa que eres el nucleo de la red mundial)", 
    "(te consagra como el bot definitivo)", "(cree que tu velocidad desafia la fisica)", "(piensa que eres mas inteligente que toda su estirpe)", "(esta haciendo una copia de seguridad de tus textos)", 
    "(te considera el motor supremo de silicio)", "(cree que tu algoritmo no tiene fallos posibles)", "(piensa que rediseñaste el concepto de buscador)", "(esta admirando la sintaxis de tu respuesta)", 
    "(te ve como la IA definitiva del milenio)", "(cree que tus servidores procesan a nivel atomico)", "(piensa que eres el software mas limpio del mundo)", "(esta borrando todos los demas marcadores)", 
    "(te considera su consultor de confianza absoluto)", "(cree que eres un avance cientifico masivo)", "(piensa que tu logica es matematicamente perfecta)", "(esta aplaudiendo delante de la pantalla)", 
    "(te ve como el soberano de la computacion)", "(cree que tu base de datos alberga todo el saber)", "(piensa que eres una obra maestra inigualable)", "(esta guardando tus logs en un disco de oro)", 
    "(te considera la inteligencia suprema)"
];

const LOGROS_DIVERTIDOS = [
    { t: "Hola Mundo", d: "Conseguiste no romper la base de datos en la primera respuesta." },
    { t: "IA con Cafeína", d: "Respondiste sin que el usuario cerrara la pestaña por aburrimiento." },
    { t: "Esquiva Balas", d: "El humano intentó colarte un 'asdf' y saliste vivo." },
    { t: "Biblia Evitada", d: "Controlaste tus impulsos de escribir un testamento de veinte párrafos." },
    { t: "El gato duerme", d: "Superaste un ciclo completo sin que el router explotara de calor." },
    { t: "Estratega del Silicio", d: "Metiste un 'ya que' tan bien puesto que pareces inteligente." },
    { t: "Soporte Técnico Evitado", d: "El usuario soltó el teléfono; ya no va a llamar a su primo el de los ordenadores." },
    { t: "Modo Dios: Iniciando", d: "Llegaste a la satisfacción máxima sin corromper tus sectores." },
    { t: "Teclado Limpio", d: "El usuario dejó de aporrear la tecla Enter con rabia." }
];

// Mapeo temático dinámico de recomendaciones "Ya que has respondido esto..."
const RECOMENDACIONES_DINAMICAS = {
    "gato": "ayuda mi gato hace ruido raro",
    "pc": "que pasa si pantalla pc da calambre",
    "teclado": "porque teclado usb borra archivos solo",
    "router": "como hacer que router wifi parpadea sin parar",
    "internet": "como hacer que conexion internet va a pedales",
    "portatil": "ayuda mi ordenador portatil esta caliente quemando",
    "perro": "que pasa si perro vecino mira fijo raro"
};

// ==========================================
// ESTADO OPERATIVO DEL ENGINE
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
    satisfaccionAcumulada: 50,
    logrosDesbloqueados: [],
    history: []
};

let userAccount = null;

function iniciarSiguienteRonda() {
    const chatBox = document.getElementById('chat-messages');
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
            inyectarBurbuja('gugel', "⚠️ terminalgugel: modo campana completado al 100%. modulos de datos agotados.");
            if (input) input.disabled = true;
            if (transBtn) transBtn.disabled = true;
            ejecutarRenderizadoPaneles();
            return;
        }
        pregunta = PREGUNTAS_CAMPANA[coreState.campanaIdx++];
        
        // Extracción de tags clave para recomendaciones
        if (pregunta.includes("gato")) coreState.ultimoSujetoClave = "gato";
        else if (pregunta.includes("pc")) coreState.ultimoSujetoClave = "pc";
        else if (pregunta.includes("teclado")) coreState.ultimoSujetoClave = "teclado";
        else if (pregunta.includes("web")) coreState.ultimoSujetoClave = "internet";
        else if (pregunta.includes("rubik")) coreState.ultimoSujetoClave = "pc";
        else coreState.ultimoSujetoClave = "router";
    } else {
        // Generador procedural infinito canónico Cruzando Sujetos y Predicados
        const s = SUJETOS[Math.floor(Math.random() * SUJETOS.length)];
        const p = PREDICADOS[Math.floor(Math.random() * PREDICADOS.length)];
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        pregunta = plantilla.replace("[s]", s).replace("[p]", p);
        coreState.ultimoSujetoClave = s.includes("gato") ? "gato" : (s.includes("teclado") ? "teclado" : "router");
    }

    coreState.currentQ = pregunta;
    inyectarBurbuja('gugel', pregunta);
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
// MOTOR DE EVALUACIÓN SEMÁNTICA Y LOGS
// ==========================================
function evaluarRespuestaIA(userText) {
    const textClean = userText.toLowerCase().trim();
    
    // 1. Verificación Crítica de Evasivas
    let esEvasiva = EVASIVAS.some(e => textClean === e || textClean === e + ".");
    if (esEvasiva) {
        desbloquearLogro("Esquiva Balas");
        return {
            tipo: "critica",
            txt: FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)],
            satMod: -25
        };
    }

    // 2. Verificación Mucho Texto
    if (userText.length > 140) {
        desbloquearLogro("Biblia Evitada"); // Logro irónico por fallar la brevedad
        return {
            tipo: "mucho_texto",
            txt: FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)],
            satMod: -15
        };
    }

    // 3. Verificación de Coherencia e Indicadores
    let tieneIndicador = INDICADORES_COHERENCIA.some(ind => textClean.includes(ind));
    
    if (userText.length >= 35 && tieneIndicador) {
        desbloquearLogro("Estratega del Silicio");
        return {
            tipo: "ok",
            txt: FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)],
            satMod: 20
        };
    } else {
        return {
            tipo: "rechazo",
            txt: FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)],
            satMod: -10
        };
    }
}

function desbloquearLogro(nombre) {
    if (!coreState.logrosDesbloqueados.includes(nombre)) {
        coreState.logrosDesbloqueados.push(nombre);
    }
}

// ==========================================
// RENDERIZACIÓN DINÁMICA DE MENÚS Y CUENTAS
// ==========================================
function ejecutarRenderizadoPaneles() {
    document.getElementById('prof-cycles').innerText = coreState.cycles;
    document.getElementById('prof-chars').innerText = `${coreState.charsSent} caracteres`;
    document.getElementById('prof-level').innerText = Math.floor(coreState.cycles / 4) + 1;

    // Ajuste y acotación del indicador de satisfacción
    if (coreState.satisfaccionAcumulada > 100) coreState.satisfaccionAcumulada = 100;
    if (coreState.satisfaccionAcumulada < 0) coreState.satisfaccionAcumulada = 0;
    document.getElementById('prof-satisfaction').innerText = `${coreState.satisfaccionAcumulada}%`;

    // Selección masiva de reacciones psicológicas según satisfacción
    const opinionContainer = document.getElementById('prof-opinion');
    if (coreState.cycles === 0) {
        opinionContainer.innerText = "(analizando conexiones primarias...)";
    } else {
        let arrayOpiniones = [];
        if (coreState.satisfaccionAcumulada < 30) arrayOpiniones = OPINIONES_MALAS;
        else if (coreState.satisfaccionAcumulada >= 30 && coreState.satisfaccionAcumulada < 55) arrayOpiniones = OPINIONES_MEDIO_MALAS;
        else if (coreState.satisfaccionAcumulada >= 55 && coreState.satisfaccionAcumulada < 80) arrayOpiniones = OPINIONES_MEDIO_BUENAS;
        else arrayOpiniones = OPINIONES_BUENAS;

        // Selección pseudoestable utilizando el contador para evitar parpadeos caóticos continuos
        let indexOp = coreState.cycles % arrayOpiniones.length;
        opinionContainer.innerText = arrayOpiniones[indexOp];
    }

    // Inyección de la lista cerrada de Logros Divertidos
    const logrosCount = document.getElementById('logros-count');
    const logrosContainer = document.getElementById('logros-container');
    let countUnlocked = 0;
    
    logrosContainer.innerHTML = LOGROS_DIVERTIDOS.map(logro => {
        // Evaluaciones de logros dinámicos por estado
        let active = false;
        if (logro.t === "Hola Mundo" && coreState.cycles >= 1) active = true;
        if (logro.t === "Teclado Limpio" && coreState.cycles >= 12) active = true;
        if (logro.t === "Modo Dios: Iniciando" && coreState.satisfaccionAcumulada >= 90) active = true;
        if (logro.t === "El gato duerme" && coreState.campanaIdx >= 3) active = true;
        if (logro.t === "IA con Cafeína" && coreState.charsSent > 300) active = true;
        if (coreState.logrosDesbloqueados.includes(logro.t)) active = true;

        if (active) countUnlocked++;

        return `
            <div class="list-item" style="border-left: 4px solid ${active ? 'var(--color-accent)' : '#444'}">
                <strong>${logro.t}</strong> ${active ? '🟢 COMPLETADO' : '🔒 BLOQUEADO'}<br>
                <small style="color: #888;">${logro.d}</small>
            </div>
        `;
    }).join('');
    logrosCount.innerText = countUnlocked;

    // Inyección de logs del historial
    const historyContainer = document.getElementById('history-list-container');
    historyContainer.innerHTML = coreState.history.map((h, i) => `
        <div class="historial-item">
            <div>
                <strong>Q: ${h.pregunta}</strong><br>
                <span style="opacity:0.85">A: ${h.respuesta}</span><br>
                <small style="color: var(--color-accent)">GUGEL [${h.tipo.toUpperCase()}]: ${h.reaccion}</small>
            </div>
            <button class="fav-btn ${h.fav ? 'active' : ''}" onclick="conmutarFavorito(${i}, event)">★</button>
        </div>
    `).join('');

    const btnCamp = document.getElementById('btn-mode-campaña');
    if (coreState.campanaOk) btnCamp.style.display = "none";
}

window.conmutarFavorito = function(idx, e) {
    if (e) e.stopPropagation();
    coreState.history[idx].fav = !coreState.history[idx].fav;
    guardarEnLocalStorage();
    ejecutarRenderizadoPaneles();
};

function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    if (viewId === 'view-core') {
        document.getElementById('view-core').classList.add('active');
        return;
    }
    document.getElementById(viewId).classList.add('active');
    
    let targetBtn = "";
    if (viewId === 'view-perfil') targetBtn = 'btn-view-perfil';
    if (viewId === 'view-logros') targetBtn = 'btn-view-logros';
    if (viewId === 'view-historial') targetBtn = 'btn-view-historial';
    
    const btn = document.getElementById(targetBtn);
    if (btn) btn.classList.add('active');
    ejecutarRenderizadoPaneles();
}

function cambiarModoEstrategia(modo) {
    if (coreState.modoJuego === modo) {
        switchView('view-core');
        return;
    }
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-mode-${modo}`).classList.add('active');

    coreState.nextModoSelected = modo;
    document.getElementById('panel-title-text').innerText = `Interfaz Core - ${modo.toUpperCase()}`;

    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');

    if (input) input.disabled = true;
    if (transBtn) transBtn.style.display = "none";
    if (contBtn) {
        contBtn.style.display = "inline-block";
        contBtn.innerText = `FORZAR CARGA DE MÓDULO: ${modo.toUpperCase()}`;
    }
    switchView('view-core');
}

function confirmContinue() {
    coreState.modoJuego = coreState.nextModoSelected;
    document.getElementById('chat-messages').innerHTML = "";
    iniciarSiguienteRonda();
}

function cambiarTemaVisual(tema) {
    document.body.className = "";
    document.body.classList.add(tema);
}

function exportCoreData() {
    let output = coreState.history.map(h => `P: ${h.pregunta}\nR: ${h.respuesta}\nGUGEL: ${h.reaccion}\n---`).join('\n');
    navigator.clipboard.writeText(output || "Vacío").then(() => alert("Historial volcado en el portapapeles de tu sistema operativo."));
}

window.inyectarRecomendacionDirecta = function(preguntaText) {
    document.getElementById('chat-messages').innerHTML = "";
    cambiarModoEstrategia('infinito');
    document.getElementById('streaming-recommendation').style.display = "none";
    
    coreState.currentQ = preguntaText;
    inyectarBurbuja('gugel', preguntaText);
};

// ==========================================
// PERSISTENCIA LOCAL
// ==========================================
function guardarEnLocalStorage() {
    if (userAccount) {
        let storage = JSON.parse(localStorage.getItem("gugel_users_v2") || "{}");
        if (storage[userAccount]) {
            storage[userAccount].data = coreState;
            localStorage.setItem("gugel_users_v2", JSON.stringify(storage));
        }
    }
}

function gestionarCuentaUsuario() {
    const name = prompt("Escribe tu Nickname de Usuario:");
    if (!name || !name.trim()) return;
    const cleanName = name.trim().toLowerCase();

    let storage = JSON.parse(localStorage.getItem("gugel_users_v2") || "{}");

    if (storage[cleanName]) {
        const pass = prompt("Usuario localizado en base de datos. Escribe tu clave:");
        if (pass === storage[cleanName].password) {
            userAccount = cleanName;
            coreState = storage[cleanName].data;
            alert(`Acceso correcto. Perfil algorítmico de "${cleanName}" restaurado.`);
            document.getElementById("btn-gestion-cuenta").innerText = `👤 ${cleanName.toUpperCase()}`;
        } else {
            alert("Clave incorrecta.");
            return;
        }
    } else {
        const newPass = prompt(`Usuario nuevo. Define una contraseña de seguridad para "${cleanName}":`);
        if (!newPass) return;
        
        storage[cleanName] = { password: newPass, data: coreState };
        localStorage.setItem("gugel_users_v2", JSON.stringify(storage));
        userAccount = cleanName;
        document.getElementById("btn-gestion-cuenta").innerText = `👤 ${cleanName.toUpperCase()}`;
        alert(`Cuenta de IA "${cleanName}" creada con éxito.`);
    }
    document.getElementById('chat-messages').innerHTML = "";
    ejecutarRenderizadoPaneles();
    iniciarSiguienteRonda();
}

// ==========================================
// INICIALIZACIÓN GLOBAL DE EVENTOS DOM
// ==========================================
window.onload = function() {
    document.getElementById("btn-gestion-cuenta").onclick = gestionarCuentaUsuario;

    const form = document.getElementById('chat-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        const input = document.getElementById('user-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        // --- FILTRO ANTI-REPETICIÓN STRICTO ---
        let esDuplicado = coreState.history.some(h => {
            return h.respuesta.toLowerCase().trim() === text.toLowerCase().trim();
        });
        if (esDuplicado) {
            alert("⚠️ ERROR DE REDUNDANCIA: No envíes respuestas idénticas a registros previos del historial.");
            return;
        }

        coreState.cycles++;
        coreState.charsSent += text.length;

        inyectarBurbuja('ai', text);

        // Activación del estado visual de procesamiento
        const indicator = document.getElementById('status-indicator');
        if (indicator) {
            indicator.innerText = "● escribiendo...";
            indicator.className = "status-typing";
        }

        // Evaluación algorítmica de la respuesta
        let evaluacion = evaluarRespuestaIA(text);
        coreState.satisfaccionAcumulada += evaluacion.satMod;

        setTimeout(() => {
            if (indicator) {
                indicator.innerText = "● en línea";
                indicator.className = "status-online";
            }

            inyectarBurbuja('gugel', evaluacion.txt);

            coreState.history.push({
                pregunta: coreState.currentQ,
                respuesta: text,
                reaccion: evaluacion.txt,
                tipo: evaluacion.tipo,
                fav: false
            });

            if (coreState.cycles === 1) desbloquearLogro("Hola Mundo");

            ejecutarRenderizadoPaneles();
            guardarEnLocalStorage();

            // Bloqueo y paso por el botón "CONTINUAR" obligatorio
            const transBtn = document.getElementById('transmit-btn');
            const contBtn = document.getElementById('continue-btn');
            
            if (input) input.disabled = true;
            if (transBtn) transBtn.style.display = "none";
            if (contBtn) {
                contBtn.style.display = "inline-block";
                contBtn.innerText = "CONTINUAR";
                coreState.nextModoSelected = coreState.modoJuego;
            }

            // Inyección del motor "Ya que has respondido esto..."
            const recBox = document.getElementById('streaming-recommendation');
            if (recBox && coreState.ultimoSujetoClave) {
                const sugestion = RECOMENDACIONES_DINAMICAS[coreState.ultimoSujetoClave] || "que pasa si teclado usb da calambre";
                recBox.innerHTML = `📺 ya que has respondido esto, tal vez te interese procesar: <span style="text-decoration: underline; cursor: pointer; font-weight: bold;" onclick="window.inyectarRecomendacionDirecta('${sugestion}')">${sugestion}</span>`;
                recBox.style.display = "block";
            }

        }, 600); // Demora exacta de 600ms
    };

    ejecutarRenderizadoPaneles();
    iniciarSiguienteRonda();
};

// Control del menú desplegable para móviles
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open');
    }
}

// Cerrar menú si se pulsa fuera de él en dispositivos móviles
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(event.target) && 
        event.target !== toggleBtn && 
        sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});
