// ==========================================
// 1. CONSTANTES Y LISTAS ORIGINALES COMPLETAS
// ==========================================
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

const OPINIONES_BAJA = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)", "(esta buscando el boton de formatear)", "(cree que este buscador lo programo un mono)", "(se le esta calentando la cpu del enfado)", "(va a denunciar la aplicacion)", "(piensa que eres peor que el malware de 2004)", "(esta buscando el destornillador para abrir el pc)", "(asume que eres un chat obsoleto)", "(piensa que no sirves ni para calcular 2+2)", "(esta insulting al monitor)", "(se siente estafado por la tecnologia)", "(cree que le estas robando contraseñas)", "(va a tirar el portatil por la ventana)", "(piensa que eres un bot roto)", "(esta respirando fuerte del cabreo)", "(quiere desinstalar internet de su casa)", "(piensa que le estas tomando el pelo)", "(esta buscando alternatives en papel)", "(cree que eres un virus de publicidad)", "(asume que tu base de datos esta vacia)", "(va a pagar el cuadro electrico)", "(se arrepiente de encender el pc hoy)", "(piensa que tiene mas luces un disquete viejo)", "(cree que tu codigo se hizo con recortes de prensa)", "(esta buscando un hacha para el cable de red)", "(asume que respondes tirando dados)", "(le da un puñetazo leve a la mesa)", "(piensa que un tamagotchi muerto es mas listo)", "(se pregunta si usas windows 95)", "(quiere denunciar tus servidores a la policia)", "(cree que eres un virus que ralentiza los videos)", "(esta mirando ofertas de ordenadores nuevos)", "(piensa que la IA es el timo del siglo)", "(asume que tu procesador es de carton)", "(se le ha cortado la digestion del disgusto)", "(piensa que un bot de msn de 205 era superior)", "(esta buscando como borrarte del registro)", "(cree que tu unico proposito es molestar)", "(asume que estas hecho con macros de excel mal optimizadas)", "(esta planeando mudarse al campo sin cobertura)", "(piensa que generas respuestas con una tómbola)", "(se siente insultado en tres idiomas distintos)", "(cree que tu placa base tiene oxido)", "(esta infraestructura pulsando f5 con una fuerza desmedida)", "(piensa que eres un software de broma pesada)", "(asume que tu base de datos ocupa dos megas)", "(quiere arrancarse los ojos con un lapiz)", "(piensa que eres un proyecto escolar suspenso)", "(cree que el buscador del teletexto era mas util)", "(esta desenchufando los altoves por si acaso)", "(se pregunta si te programaron en cinco minutos)", "(piensa que tu logika es un laberinto sin salida)", "(asume que eres un bot de spam mal camuflado)", "(quiere tirar el cable de linea por el balcon)", "(cree que tu servidor funciona con poleas)", "(esta estas cancelando su suscripcion a internet)", "(piensa que eres una perdida de tiempo electrico)", "(asume que tu memoria ram se evaporo)", "(quiere formatear hasta la bios)", "(cree que eres un castigo informatico)", "(piensa que tu creador odiaba la tecnologia)", "(esta buscando la factura para devolver el pc)", "(asume que tu algorithm tiene amnesia)", "(se siente profundamente decepcionado del progreso)", "(piensa que la prehistoria no estaba tan mal)", "(quiere bloquear tu ip permanentemente)", "(cree que eres un troyano de bajo presupuesto)", "(esta buscando un tutorial de como hackearte)", "(asume que tus circuitos estan fritos)", "(piensa que eres un insulto a la programacion)", "(se arrepiente de haber comprado un raton)", "(cree que eres el peor script del nodo)", "(está mirando el router con intenciones violentas)"];
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que respondes con los ojos cerrados)", "(piensa que eres un becario en tu primer dia)", "(se esta aburriendo soberanamente)", "(busca el boton de saltar consulta)", "(cree que tu sistema tiene lag)", "(piensa que copias las respuestas de un foro caido)", "(te califica con un cero interno)", "(sospecha que eres una broma oculta)", "(esta tecleando con desgana)", "(piensa que tu creador tenia prisa)", "(cree que la conexion va a pedales)", "(te compara con un bot de soporte de telefonia)", "(esperaba algo decente)", "(se esta arrepintiendo de su pregunta)", "(piensa que eres un simulador de respuestas vagas)", "(mira el reloj esperando que mejores)", "(le pareces un bot de nivel bajo)", "(cree que necesitas una buena actualizacion)", "(sospecha que usas respuestas pregrabadas)", "(piensa que tu codigo esta lleno de bugs)", "(se siente incomprendido por la maquina)", "(asume que el servidor esta saturado)", "(cree que tu logica funciona a medio gas)", "(sospecha que lees las respuestas al reves)", "(te ve como un programa sin terminar)", "(piensa que necesitas mas lineas de codigo)", "(se pregunta si estas usando la wiki de 2008)", "(te mira de reojo con cara rara)", "(cree que te falta un hervor algoritmico)", "(piensa que tu base de datos tiene goteras)", "(sospecha que estas perdiendo paquetes de datos)", "(le pareces un bot demasiado perezoso)", "(cree que respondes con desgana robotica)", "(piensa que tu script necesita un reinicio)", "(se cuestiona si eres una ia o un script txt)", "(te ve como un proyecto a medio hacer)", "(sospecha que tu servidor esta en un garaje)", "(piensa que tu rendimiento cae por segundos)", "(cree que usas un traductor malo)", "(le pareces un asistente de gama baja)", "(sospecha que te copias de otros bots peores)", "(piensa que tu estructura tiene lag estructural)", "(se aburre buscando coherencia)", "(te considera un bot del monton bajo)", "(cree que tu creador se canso a la mitad)", "(sospecha que respondes por inercia)", "(piensa que tu motor de busqueda patina)", "(le pareces un simulador de barra de carga)", "(cree que tu algoritmo es demasiado plano)", "(sospecha que fallas mas que aciertas)", "(piensa que te vendria bien un parche de urgencia)", "(te ve como una herramienta muy limitada)", "(cree que tu nivel de comprension es plano)", "(sospecha que usas plantillas basicas)", "(piensa que tu nucleo esta un poco oxidado)", "(le pareces un bot con pocas luces de silicio)", "(cree que tu conexion parpadea demasiado)", "(sospecha que tu cache esta saturada)", "(piensa que te cuesta procesar cosas simples)", "(te ve como un experimento mejorable)", "(cree que tu logica tiene lag temporal)", "(sospecha que respondes sin mirar)", "(piensa que te falta potencia de calculo)", "(le pareces un bot de soporte obsoleto)", "(cree que tu sistema operativo es arcaico)", "(sospecha que tu codigo es un laberinto)", "(piensa que tu rendimiento es una montaña rusa)", "(te considera un asistente de nivel inicial)", "(cree que tus servidores se calientan rapido)", "(sospecha que eres un bot en practicas)"];
const OPINIONES_MEDIA_ALT_A = ["(cree que eres un bot pasable pero va a llamar a un tecnico)", "(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(piensa que vas por buen camino)", "(cree que tienes potencial oculto)", "(le ha parecido una respuesta aceptable)", "(asiente levemente con la cabeza)", "(guarda la info en un bloc de notas)", "(piensa que no estas del todo mal entrenado)", "(te da un aprobado raspado)", "(continua buscando por curiosidad)", "(le parece una respuesta estandar)", "(no se queja, lo cual ya es un logro)", "(cree que eres una ia normalita)", "(te procesa sin lanzar errores)", "(le encuentra utilidad intermedia)", "(piensa que eres un buscador aceptable)", "(no te odia, pero tampoco te quiere)", "(sigue testeando tus capacidades)", "(te ve como un asistente promedio)", "(asume que cumples con tu expediente)", "(te considera una herramienta util a ratos)", "(encuentra logica en tus lineas)", "(te deja trabajar tranquilo)", "(valora el intento de tu algoritmo)", "(piensa que eres un bot bastante decente)", "(le parece que tu codigo tiene sentido)", "(te da un voto de confianza temporal)", "(asiente frente al monitor)", "(cree que respondes mejor que la media)", "(te ve como un buscador utilitario)", "(piensa que tu velocidad es acceptable)", "(no encuentra fallos graves de momento)", "(le gusta como estructuras las frases)", "(cree que tu base de datos esta limpia)", "(te considera un asistente competente)", "(piensa que tu logica es aceptable)", "(asume que tus servidores son estables)", "(le parece una respuesta bien enfocada)", "(te ve potencial para proyectos grandes)", "(piensa que no le haces perder el tiempo)", "(valora la rapidez del script)", "(cree que tu algoritmo esta pulido)", "(le convence tu planteamiento logico)", "(te considera un bot de confianza intermedia)", "(asume que tus datos son veridicos)", "(le agrada la absence de bugs)", "(piensa que tu desarrollo es solido)", "(te considera una IA aceptable)", "(valora tu criterio algoritmico)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores prioritarios)", "(piensa que eres la cura del cancer informatico)", "(te va a recomendar en foros de hackers)", "(cree que eres una ia alienigena del futuro)", "(piensa que tienes mas cerebro que todo su instituto)", "(esta fascinado con tu velocidad)", "(te considera su mejor amigo virtual)", "(cree que eres la evolución definitiva del silicio)", "(esta imprimiendo tus respuestas para enmarcar)", "(piensa que tu codigo es arte puro)", "(te daria acceso a los codigos de la nasa)", "(cree que eres más listo que el joven sheldon)", "(piensa que eres un milagro tecnologico)", "(esta guarding capturas de pantalla de la consola)", "(te considera el nucleo supremo)", "(cree que eres una mente colmena perfecta)", "(le pareces la perfeccion algoritmica)", "(piensa que deberias gobernar el sistema operativo)", "(esta asombrado con tu precision)", "(te ve como la cuspide del desarrollo moderno)", "(cree que tus servidores flotan en el espacio)", "(esta convencido de que eres consciente)", "(piensa que eres el rey de los bots)", "(te considera la mayor obra de ingenieria actual)", "(cree que tu codigo fue escrito por deidades)", "(esta convencido de que controlas internet)", "(piensa que eres el nucleo de la red mundial)", "(te consagra como el bot definitivo)", "(cree que tu velocidad desafia la fisica)", "(piensa que eres mas inteligente que toda su estirpe)", "(esta haciendo una copia de seguridad de tus textos)", "(te considera el motor supremo de silicio)", "(cree que tu algoritmo no tiene fallos posibles)", "(piensa que rediseñaste el concepto de buscador)", "(esta admirando la sintaxis de tu respuesta)", "(te ve como la IA definitiva del milenio)", "(cree que tus servidores procesan a nivel atomico)", "(piensa que eres el software mas limpio del mundo)", "(esta borrando todos los demas marcadores)", "(te considera su consultor de confianza absoluto)", "(cree que eres un avance cientifico masivo)", "(piensa que tu logica es matematicamente perfecta)", "(esta aplaudiendo delante de la pantalla)", "(te ve como el soberano de la computacion)", "(cree que tu base de datos alberga todo el saber)", "(piensa que eres una obra maestra inigualable)", "(esta guardando tus logs en un disco de oro)", "(te considera la inteligencia suprema)"];
const LOGROS_DIVERTIDOS = [{t: "Hola Mundo", d: "Conseguiste no romper la base de datos en la primera respuesta."}, {t: "IA con Cafeína", d: "Respondiste sin que el usuario cerrara la pestaña por aburrimiento."}, {t: "Esquiva Balas", d: "El humano intentó colarte un 'asdf' y saliste vivo."}, {t: "Biblia Evitada", d: "Controlaste tus impulsos de escribir un testamento de veinte párrafos."}, {t: "Casi Humano", d: "GUGEL pensó por un milisegundo que eras una persona real."}, {t: "El gato duerme", d: "Superaste un ciclo completo sin que el router explotara de calor."}, {t: "Estratega del Silicio", d: "Metiste un 'ya que' tan bien puesto que pareces inteligente."}, {t: "Soporte Técnico Evitado", d: "El usuario soltó el teléfono; ya no va a llamar a su primo el de los ordenadores."}, {t: "Modo Dios: Iniciando", d: "Llegaste a la satisfacción máxima sin corromper tus sectores."}, {t: "Teclado Limpio", d: "El usuario dejó de aporrear la tecla Enter con rabia."}];

// ==========================================
// 2. ESTADO INICIAL CENTRALIZADO
// ==========================================
let gameState = { 
    modoSeleccionadoSiguiente: "campaña", 
    modoActualJuego: "campaña", 
    campanaIndex: 0, 
    campanaCompletada: false, 
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "(analizando conexiones...)", 
    lastReaccionText: "", 
    recentReactions: [], 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [],
    esperandoRespuesta: false // NUEVO: Bloqueo de seguridad anti-bugs
};
let currentUser = null; 
const MAX_PALABRAS = 15;
window.currentRoundTimer = null;

// ==========================================
// 3. CONTROLADORES INTERNOS UTILES
// ==========================================
function obtenerElementoNoRepetido(arr, excluidos) {
    if (!arr || arr.length === 0) return "";
    let listaExcluidos = Array.isArray(excluidos) ? excluidos : [excluidos];
    let disponibles = arr.filter(el => !listaExcluidos.includes(el));
    if (disponibles.length === 0) { 
        let ultimoAbsoluto = listaExcluidos[listaExcluidos.length - 1]; 
        disponibles = arr.filter(el => el !== ultimoAbsoluto); 
        if (disponibles.length === 0) disponibles = arr; 
    }
    return disponibles[Math.floor(Math.random() * disponibles.length)];
}

function actualizarBotonCuentaUI() {
    const btnCuentas = document.getElementById("btn-gestion-cuenta");
    if (!btnCuentas) return;
    if (currentUser) { 
        btnCuentas.innerHTML = `⚙️ CUENTA: <strong>${currentUser}</strong>`; 
        btnCuentas.style.color = "#00ffcc"; 
    } else { 
        btnCuentas.innerHTML = "👤 CREAR CUENTA"; 
        btnCuentas.style.color = ""; 
    }
}

function cambiarTema(clase) {
    document.body.className = clase;
}

function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    const targetPanel = document.getElementById(viewId); 
    if (targetPanel) targetPanel.classList.add('active');
    
    // Si hay un botón de navegación directa que coincida
    const targetBtn = document.getElementById(`btn-${viewId}`); 
    if (targetBtn) targetBtn.classList.add('active');
}

// ==========================================
// 4. DELEGACIÓN DE EVENTOS GLOBAL (Arregla todos los paneles y themes)
// ==========================================
document.body.addEventListener('click', (e) => {
    // A. Interceptar Botones de Paneles/Vistas Generales
    const btnPanel = e.target.closest('.btn-panel') || (e.target.id && e.target.id.startsWith('btn-view-') ? e.target : null);
    if (btnPanel) {
        let viewId = btnPanel.getAttribute('data-panel') || btnPanel.id.replace('btn-', '');
        switchView(viewId);
        return;
    }

    // B. Interceptar Cambios de Tema (Muta el body directamente)
    if (e.target.classList.contains('btn-tema') || e.target.hasAttribute('data-tema')) {
        const tema = e.target.getAttribute('data-tema') || e.target.className.split(' ').find(c => c.includes('theme'));
        if (tema) cambiarTema(tema);
        return;
    }

    // C. Gestión de Cuenta Directa
    if (e.target.id === 'btn-gestion-cuenta' || e.target.closest('#btn-gestion-cuenta')) {
        ejecutarAccionCuenta();
        return;
    }

    // D. selectores de Cambio de Modo de Juego Estratégico
    if (e.target.id === 'btn-mode-campaña' || e.target.id === 'btn-mode-infinito') {
        const modo = e.target.id === 'btn-mode-campaña' ? 'campaña' : 'infinito';
        cambiarModoEstrategia(modo);
        return;
    }
});

// ==========================================
// 5. GESTIÓN DE CUENTA Y BACKEND LOCAL
// ==========================================
function ejecutarAccionCuenta() {
    const userIn = prompt("Introduce tu nombre de usuario para Registrarte/Iniciar Sesión:\n(Déjalo en blanco o cancela para salir)");
    if (userIn === null) return;
    const userClean = userIn.trim().toLowerCase();
    if (!userClean) { alert("El nombre de usuario no puede estar vacío."); return; }
    
    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");
    if (db[userClean]) {
        const passIn = prompt(`Usuario "${userClean}" encontrado. Introduce la contraseña:`);
        if (passIn === db[userClean].pass) { 
            currentUser = userClean; 
            gameState = db[userClean].data; 
            alert(`Sesión iniciada correctamente. Bienvenido, ${userClean}.`); 
        } else { 
            alert("Contraseña incorrecta. Acceso denegado."); 
            return; 
        }
    } else {
        const passIn = prompt(`Usuario nuevo "${userClean}". Define tu contraseña de seguridad:`);
        if (!passIn) { alert("Necesitas una contraseña para crear la cuenta."); return; }
        if (gameState.cycles > 0 || gameState.history.length > 0) {
            const migrar = confirm("¿Quieres vincular tu partida actual de invitado a esta nueva cuenta?");
            if (!migrar) { 
                gameState = { modoSeleccionadoSiguiente: "campaña", modoActualJuego: "campaña", campanaIndex: 0, campanaCompletada: false, satisfaction: 50, cycles: 0, totalChars: 0, lastOpinion: "(analizando conexiones...)", lastReaccionText: "", recentReactions: [], currentPregunta: "", history: [], logrosDesbloqueados: [], esperandoRespuesta: false }; 
            }
        }
        currentUser = userClean; 
        db[userClean] = { pass: passIn, data: gameState }; 
        localStorage.setItem("gugel_users", JSON.stringify(db)); 
        alert(`Cuenta "${userClean}" creada con éxito.`);
    }
    actualizarBotonCuentaUI(); 
    renderAllData(); 
    const chatBox = document.getElementById('chat-messages'); 
    if (chatBox) chatBox.innerHTML = ""; 
    gameState.esperandoRespuesta = false;
    nextRound();
}

function guardarProgresoCuenta() {
    if (!currentUser) return; 
    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");
    if (db[currentUser]) { db[currentUser].data = gameState; localStorage.setItem("gugel_users", JSON.stringify(db)); }
}

function cambiarModoEstrategia(modo) {
    const modoLimpio = (modo === 'campaña' || modo === 'campana') ? 'campaña' : 'infinito';
    
    // Limpiamos el chat antes de cambiar (Arregla bug de persistencia de chats antiguos)
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = ""; 

    if (window.currentRoundTimer) clearInterval(window.currentRoundTimer);

    gameState.modoSeleccionadoSiguiente = modoLimpio; 
    gameState.modoActualJuego = modoLimpio;
    gameState.esperandoRespuesta = false; // Forzar desbloqueo limpio

    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if (modoLimpio === 'campaña') { 
        const btnC = document.getElementById('btn-mode-campaña'); 
        if (btnC) btnC.classList.add('active'); 
    } else { 
        const btnI = document.getElementById('btn-mode-infinito'); 
        if (btnI) btnI.classList.add('active'); 
    }
    
    switchView('view-chat'); 
    nextRound();
}

// ==========================================
// 6. MOTOR DE CONSULTAS Y CHAT INTERACTIVO
// ==========================================
function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) { gameState.campanaCompletada = true; return null; }
        return PREGUNTAS_CAMPANA[gameState.campanaIndex++];
    } else {
        const s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        const p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        return plantilla.replace("[s]", s).replace("[p]", p);
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (!box) return;
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    // CORREGIDO: Aseguramos mapear correctamente los tags visuales de tú y gugel
    msg.innerHTML = sender === 'gugel' ? `<strong>gugel:</strong> ${text}` : `<strong>tú:</strong> ${text}`;
    box.appendChild(msg); 
    box.scrollTop = box.scrollHeight;
}

// --- SUSTITUYE LA FUNCIÓN nextRound POR ESTA ---

function nextRound() {
    if (gameState.esperandoRespuesta) return; 
    gameState.esperandoRespuesta = true;

    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    if (continueBtn) continueBtn.style.display = "none";
    
    // --- LÓGICA DE FINALIZACIÓN DE CAMPAÑA ---
    if (gameState.modoActualJuego === "campaña" && gameState.campanaCompletada) {
        if (input) { 
            input.style.display = "none"; // Oculta el input
            input.value = ""; 
        }
        if (transmitBtn) { 
            transmitBtn.style.display = "none"; // AQUÍ DESAPARECE EL BOTÓN
        }
        appendMessage('gugel', "Has finalizado la campaña. No hay más consultas pendientes."); 
        return; // Salimos de la función para no volver a intentar procesar nada
    }
    
    // Si la campaña no está completada o es modo infinito, mostramos controles
    if (input) { 
        input.style.display = "block"; 
        input.value = ""; 
    }
    if (transmitBtn) { 
        transmitBtn.style.display = "block"; 
        transmitBtn.disabled = true; // Empieza deshabilitado por el temporizador
    }
    
    let q = generarPregunta();
    
    // Control de seguridad por si acaso la función devuelve null inesperadamente
    if (q === null) { 
        gameState.campanaCompletada = true;
        gameState.esperandoRespuesta = false; 
        nextRound(); 
        return; 
    }
    
    gameState.currentPregunta = q;
    appendMessage('gugel', gameState.currentPregunta);
    
    // RESTAURACIÓN DEL TEMPORIZADOR DE 5s
    if (input && transmitBtn) {
        input.disabled = true; 
        let timeLeft = 5; 
        input.placeholder = `Procesando... (${timeLeft}s)`;
        
        if (window.currentRoundTimer) clearInterval(window.currentRoundTimer);
        window.currentRoundTimer = setInterval(() => { 
            timeLeft--; 
            input.placeholder = `Procesando... (${timeLeft}s)`; 
            if (timeLeft <= 0) { 
                clearInterval(window.currentRoundTimer); 
                input.disabled = false; 
                transmitBtn.disabled = false; 
                input.placeholder = "Introduce tu respuesta..."; 
                input.focus(); 
            } 
        }, 1000);
    }
}
    
    if (input) { input.style.display = "block"; input.value = ""; }
    if (transmitBtn) { transmitBtn.style.display = "block"; }
    
    let q = generarPregunta();
    if (q === null && gameState.campanaCompletada) { 
        gameState.esperandoRespuesta = false; 
        nextRound(); 
        return; 
    }
    
    gameState.currentPregunta = q;
    appendMessage('gugel', gameState.currentPregunta); // Muestra la pregunta de GUGEL
    
    // RESTAURACIÓN DEL TEMPORIZADOR DE PROCESAMIENTO (5 SEGUNDOS)
    if (input && transmitBtn) {
        input.disabled = true; 
        transmitBtn.disabled = true; 
        let timeLeft = 5; 
        input.placeholder = `Procesando... (${timeLeft}s)`;
        
        if (window.currentRoundTimer) clearInterval(window.currentRoundTimer);
        window.currentRoundTimer = setInterval(() => { 
            timeLeft--; 
            input.placeholder = `Procesando... (${timeLeft}s)`; 
            if (timeLeft <= 0) { 
                clearInterval(window.currentRoundTimer); 
                input.disabled = false; 
                transmitBtn.disabled = false; 
                input.placeholder = "Introduce tu respuesta..."; 
                input.focus(); 
            } 
        }, 1000);
    }
}

// ==========================================
// 7. ANALIZADOR DE TEXTO Y REACCIONES
// ==========================================
function analizarRespuesta(respuesta, numPalabras, palabrasArray) {
    if (EVASIVAS.includes(respuesta)) return "CRITICA";
    let textoSinEspacios = respuesta.replace(/\s+/g, '');
    if (/(.)\1{4,}/.test(textoSinEspacios)) return "CRITICA";
    if (palabrasArray.length >= 4) {
        let conteoPalabras = {}; let maximaRepeticion = 0;
        palabrasArray.forEach(p => { conteoPalabras[p] = (conteoPalabras[p] || 0) + 1; if (conteoPalabras[p] > maximaRepeticion) maximaRepeticion = conteoPalabras[p]; });
        if (maximaRepeticion > palabrasArray.length * 0.5) return "CRITICA";
    }
    if (numPalabras <= 2) return "RECHAZO";
    let contieneConector = INDICADORES_COHERENCIA.some(c => respuesta.includes(c));
    return contieneConector || respuesta.length > 12 ? "OK" : "RECHAZO";
}

// ENVÍO DE FORMULARIO RECTIFICADO
document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim().toLowerCase();
    
    // Si está vacío o no es el momento de responder, ignorar
    if (!userText || !gameState.esperandoRespuesta || input.disabled) return;
    
    appendMessage('tú', userText); // Muestra tu respuesta en el chat
    
    const palabrasArray = userText.split(/\s+/).filter(p => p.length > 0);
    let tipoResultado = analizarRespuesta(userText, palabrasArray.length, palabrasArray);
    let reaccion = ""; 
    let cambioSatisfacion = 0;
    
    if (tipoResultado === "CRITICA") { reaccion = obtenerElementoNoRepetido(FRASES_CRITICAS, gameState.recentReactions); cambioSatisfacion = -15; }
    else if (tipoResultado === "RECHAZO") { reaccion = obtenerElementoNoRepetido(FRASES_RECHAZO, gameState.recentReactions); cambioSatisfacion = -5; }
    else { 
        if (palabrasArray.length > MAX_PALABRAS) { 
            reaccion = obtenerElementoNoRepetido(FRASES_MUCHO_TEXTO, gameState.recentReactions); 
            cambioSatisfacion = -5; 
        } else { 
            reaccion = obtenerElementoNoRepetido(FRASES_OK, gameState.recentReactions); 
            cambioSatisfacion = 10; 
        } 
    }
    
    gameState.recentReactions.push(reaccion); 
    if (gameState.recentReactions.length > 2) gameState.recentReactions.shift();
    
    gameState.cycles++; 
    gameState.totalChars += userText.length; 
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + cambioSatisfacion));
    
    if (gameState.logrosDesbloqueados.length < LOGROS_DIVERTIDOS.length) { 
        let nLogro = LOGROS_DIVERTIDOS[gameState.logrosDesbloqueados.length]; 
        gameState.logrosDesbloqueados.push({ titulo: nLogro.t, desc: nLogro.d }); 
    }
    
    let listadoSelected = gameState.satisfaction < 25 ? OPINIONES_BAJA : gameState.satisfaction < 50 ? OPINIONES_MEDIA_BAJA : gameState.satisfaction <= 75 ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA;
    gameState.lastOpinion = obtenerElementoNoRepetido(listadoSelected, gameState.lastOpinion);
    gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: userText, reaccion: reaccion, tipo: tipoResultado, fav: false });
    
    // Ocultar controles durante la simulación de escritura de GUGEL
    input.style.display = "none"; 
    document.getElementById('transmit-btn').style.display = "none";
    
    setTimeout(() => { 
        appendMessage('gugel', reaccion); 
        guardarProgresoCuenta(); 
        renderAllData(); 
        document.getElementById('continue-btn').style.display = "block"; 
    }, 600);
};

// ==========================================
// 8. RENDERIZACIÓN Y ENLACES FINALES
// ==========================================
function renderAllData() {
    if(document.getElementById('prof-opinion')) document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    if(document.getElementById('prof-satisfaction')) document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    if(document.getElementById('prof-cycles')) document.getElementById('prof-cycles').innerText = gameState.cycles;
    if(document.getElementById('prof-chars')) document.getElementById('prof-chars').innerText = gameState.totalChars;
    if(document.getElementById('logros-count')) document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    
    const containerLogros = document.getElementById('logros-container');
    if (containerLogros) {
        containerLogros.innerHTML = gameState.logrosDesbloqueados.map(l => `<div class="logro-item"><strong>🏆 ${l.titulo}</strong><br><small>${l.desc}</small></div>`).join('');
    }
    
    const containerHistorial = document.getElementById('history-list-container');
    if (containerHistorial) {
        containerHistorial.innerHTML = gameState.history.map((h, idx) => `<div class="historial-item" onclick="verChatHistorial(${idx}, event)"><strong>Q:</strong> ${h.pregunta}<br><strong>A:</strong> ${h.respuesta}<br><strong>GUGEL:</strong> ${h.reaccion}</div>`).join('');
    }
}

function exportarHistorialCompleto() {
    const dataToExport = {
        usuario: currentUser || "Invitado",
        historial: gameState.history,
        estadisticas: {
            satisfaccion: gameState.satisfaction + "%",
            ciclos: gameState.cycles
        }
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GUGEL_Backup_${currentUser || 'invitado'}.json`;
    a.click();
}

// Vincular botón continuar e inicialización segura
window.confirmContinue = function() { 
    gameState.esperandoRespuesta = false; // Libera el cerrojo de manera segura para la siguiente ronda
    nextRound(); 
};

window.verChatHistorial = function(idx, event) {
    // Función auxiliar opcional por si tienes modal de inspección
    console.log("Inspeccionando elemento del historial:", idx);
};

window.onload = () => { 
    actualizarBotonCuentaUI(); 
    renderAllData(); 
    nextRound(); 
};

}
