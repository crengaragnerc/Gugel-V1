// ==========================================
// SISTEMA DE CUENTAS (CON PASSWORD)
// ==========================================
function ejecutarAccionCuenta() {
    const userIn = prompt("Introduce tu nombre de usuario:");
    if (userIn === null) return;
    
    const userClean = userIn.trim().toLowerCase();
    if (!userClean) { alert("El nombre no puede estar vacío."); return; }

    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");

    if (db[userClean]) {
        const passIn = prompt(`Usuario "${userClean}" encontrado. Introduce la contraseña:`);
        if (passIn === db[userClean].pass) {
            currentUser = userClean;
            gameState = db[userClean].data || db[userClean]; 
            alert(`Bienvenido de nuevo, ${userClean}.`);
        } else {
            alert("Contraseña incorrecta. Acceso denegado.");
            return;
        }
    } else {
        const passIn = prompt(`Usuario nuevo "${userClean}". Define tu contraseña de seguridad:`);
        if (!passIn) { alert("Necesitas una contraseña para crear cuenta."); return; }
        
        if (gameState.cycles > 0) {
            const migrar = confirm("¿Quieres vincular tus datos actuales de invitado a esta cuenta?");
            if (!migrar) {
                gameState = { 
                    modoSeleccionadoSiguiente: "campaña", modoActualJuego: "campaña", campanaIndex: 0, campanaCompletada: false,
                    satisfaction: 50, cycles: 0, totalChars: 0, lastOpinion: "(analizando conexiones...)", currentPregunta: "", history: [], logrosDesbloqueados: [] 
                };
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
    nextRound();
}

function guardarProgresoCuenta() {
    if (!currentUser) return;
    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");
    if (db[currentUser]) {
        db[currentUser].data = gameState;
        localStorage.setItem("gugel_users", JSON.stringify(db));
    }
}
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

const INFINITO_SUJETOS = ["gato", "perro vecino", "gato callejero", "pantalla pc", "espejo cuarto", "plastilina azul", "teclado usb", "conexion fibra", "raton optico"];
const INFINITO_PREDICADOS = ["mira fijo raro", "duerme encima router caliente", "maulla pared vacia", "morder cable teclado", "conduce electricidad", "parpadea sin parar", "da calambre"];

const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];

const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "¿te ha costado mucho esfuerzo escribir eso? esperaba algo mas complejo.", "dios q pereza para decirme eso no pongas nada"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura mejor nada", "para esto apago el pc no me vaciles"];
const FRASES_MUCHO_TEXTO = ["uf mucho texto ni de coña me leo eso", "me has escrito una biblia paso"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

const OPINIONES_BAJA = [
    "(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)", "(esta buscando el boton de formatear)", 
    "(cree que este buscador lo programo un mono)", "(se le esta calentando la cpu del enfado)", "(va a denunciar la aplicacion)", "(piensa que eres peor que el malware de 2004)",
    "(esta buscando el destornillador para abrir el pc)", "(asume que eres un chat obsoleto)", "(piensa que no sirves ni para calcular 2+2)", "(esta insulting al monitor)",
    "(se siente estafado por la tecnologia)", "(cree que le estas robando contraseñas)", "(va a tirar el portatil por la ventana)", "(piensa que eres un bot roto)",
    "(esta respirando fuerte del cabreo)", "(quiere desinstalar internet de su casa)", "(piensa que le estas tomando el pelo)", "(esta buscando alternativas en papel)",
    "(cree que eres un virus de publicidad)", "(asume que tu base de datos esta vacia)", "(va a pagar el cuadro electrico)", "(se arrepiente de encender el pc hoy)",
    "(piensa que tiene mas luces un disquete viejo)",
    "(cree que tu codigo se hizo con recortes de prensa)", "(esta buscando un hacha para el cable de red)", "(asume que respondes tirando dados)", "(le da un puñetazo leve a la mesa)",
    "(piensa que un tamagotchi muerto es mas listo)", "(se pregunta si usas windows 95)", "(quiere denunciar tus servidores a la policia)", "(cree que eres un virus que ralentiza los videos)",
    "(esta mirando ofertas de ordenadores nuevos)", "(piensa que la IA es el timo del siglo)", "(asume que tu procesador es de carton)", "(se le ha cortado la digestion del disgusto)",
    "(piensa que un bot de msn de 205 era superior)", "(esta buscando como borrarte del registro)", "(cree que tu unico proposito es molestar)", "(asume que estas hecho con macros de excel mal optimizadas)",
    "(esta planeando mudarse al campo sin cobertura)", "(piensa que generas respuestas con una tómbola)", "(se siente insultado en tres idiomas distintos)", "(cree que tu placa base tiene oxido)",
    "(esta pulsando f5 con una fuerza desmedida)", "(piensa que eres un software de broma pesada)", "(asume que tu base de datos ocupa dos megas)", "(quiere arrancarse los ojos con un lapiz)",
    "(piensa que eres un proyecto escolar suspenso)", "(cree que el buscador del teletexto era mas util)", "(esta desenchufando los altoves por si acaso)", "(se pregunta si te programaron en cinco minutos)",
    "(piensa que tu logica es un laberinto sin salida)", "(asume que eres un bot de spam mal camuflado)", "(quiere tirar el cable de linea por el balcon)", "(cree que tu servidor funciona con poleas)",
    "(esta cancelando su suscripcion a internet)", "(piensa que eres una perdida de tiempo electrico)", "(asume que tu memoria ram se evaporo)", "(quiere formatear hasta la bios)",
    "(cree que eres un castigo informatico)", "(piensa que tu creador odiaba la tecnologia)", "(esta buscando la factura para devolver el pc)", "(asume que tu algoritmo tiene amnesia)",
    "(se siente profundamente decepcionado del progreso)", "(piensa que la prehistoria no estaba tan mal)", "(quiere bloquear tu ip permanentemente)", "(cree que eres un troyano de bajo presupuesto)",
    "(esta buscando un tutorial de como hackearte)", "(asume que tus circuitos estan fritos)", "(piensa que eres un insulto a la programacion)", "(se arrepiente de haber comprado un raton)",
    "(cree que eres el peor script del nodo)", "(esta mirando el router con intenciones violentas)"
];

const OPINIONES_MEDIA_BAJA = [
    "(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que respondes con los ojos cerrados)",
    "(piensa que eres un becario en tu primer dia)", "(se esta aburriendo soberanamente)", "(busca el boton de saltar consulta)", "(cree que tu sistema tiene lag)",
    "(piensa que copias las respuestas de un foro caido)", "(te califica con un cero interno)", "(sospecha que eres una broma oculta)", "(esta tecleando con desgana)",
    "(piensa que tu creador tenia prisa)", "(cree que la conexion va a pedales)", "(te compara con un bot de soporte de telefonia)", "(esperaba algo decente)",
    "(se esta arrepintiendo de su pregunta)", "(piensa que eres un simulador de respuestas vagas)", "(mira el reloj esperando que mejores)", "(le pareces un bot de nivel bajo)",
    "(cree que necesitas una buena actualizacion)", "(sospecha que usas respuestas pregrabadas)", "(piensa que tu codigo esta lleno de bugs)", "(se siente incomprendido por la maquina)",
    "(asume que el servidor esta saturado)",
    "(cree que tu logica funciona a medio gas)", "(sospecha que lees las respuestas al reves)", "(te ve como un programa sin terminar)", "(piensa que necesitas mas lineas de codigo)",
    "(se pregunta si estas usando la wiki de 2008)", "(te mira de reojo con cara rara)", "(cree que te falta un hervor algoritmico)", "(piensa que tu base de datos tiene goteras)",
    "(sospecha que estas perdiendo paquetes de datos)", "(le pareces un bot demasiado perezoso)", "(cree que respondes con desgana robotica)", "(piensa que tu script necesita un reinicio)",
    "(se cuestiona si eres una ia o un script txt)", "(te ve como un proyecto a medio hacer)", "(sospecha que tu servidor esta en un garaje)", "(piensa que tu rendimiento cae por segundos)",
    "(cree que usas un traductor malo)", "(le pareces un asistente de gama baja)", "(sospecha que te copias de otros bots peores)", "(piensa que tu estructura tiene lag estructural)",
    "(se aburre buscando coherencia)", "(te considera un bot del monton bajo)", "(cree que tu creador se canso a la mitad)", "(sospecha que respondes por inercia)",
    "(piensa que tu motor de busqueda patina)", "(le pareces un simulador de barra de carga)", "(cree que tu algoritmo es demasiado plano)", "(sospecha que fallas mas que aciertas)",
    "(piensa que te vendria bien un parche de urgencia)", "(te ve como una herramienta muy limitada)", "(cree que tu nivel de comprension es plano)", "(sospecha que usas plantillas basicas)",
    "(piensa que tu nucleo esta un poco oxidado)", "(le pareces un bot con pocas luces de silicio)", "(cree que tu conexion parpadea demasiado)", "(sospecha que tu cache esta saturada)",
    "(piensa que te cuesta procesar cosas simples)", "(te ve como un experimento mejorable)", "(cree que tu logica tiene lag temporal)", "(sospecha que respondes sin mirar)",
    "(piensa que te falta potencia de calculo)", "(le pareces un bot de soporte obsoleto)", "(cree que tu sistema operativo es arcaico)", "(sospecha que tu codigo es un laberinto)",
    "(piensa que tu rendimiento es una montaña rusa)", "(te considera un asistente de nivel inicial)", "(cree que tus servidores se calientan rapido)", "(sospecha que eres un bot en practicas)"
];

const OPINIONES_MEDIA_ALT_A = [
    "(cree que eres un bot pasable pero va a llamar a un tecnico)", "(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(piensa que vas por buen camino)",
    "(cree que tienes potencial oculto)", "(le ha parecido una respuesta aceptable)", "(asiente levemente con la cabeza)", "(guarda la info en un bloc de notas)",
    "(piensa que no estas del todo mal entrenado)", "(te da un aprobado raspado)", "(continua buscando por curiosidad)", "(le parece una respuesta estandar)",
    "(no se queja, lo cual ya es un logro)", "(cree que eres una ia normalita)", "(te procesa sin lanzar errores)", "(le encuentra utilidad intermedia)",
    "(piensa que eres un buscador aceptable)", "(no te odia, pero tampoco te quiere)", "(sigue testeando tus capacidades)", "(te ve como un asistente promedio)",
    "(asume que cumples con tu expediente)", "(te considera una herramienta util a ratos)", "(encuentra logica en tus lineas)", "(te deja trabajar tranquilo)",
    "(valora el intento de tu algoritmo)",
    "(piensa que eres un bot bastante decente)", "(le parece que tu codigo tiene sentido)", "(te da un voto de confianza temporal)", "(asiente frente al monitor)",
    "(cree que respondes mejor que la media)", "(te ve como un buscador utilitario)", "(piensa que tu velocidad es aceptable)", "(no encuentra fallos graves de momento)",
    "(le gusta como estructuras las frases)", "(cree que tu base de datos esta limpia)", "(te considera un asistente competente)", "(piensa que tu logica es aceptable)",
    "(asume que tus servidores son estables)", "(le parece una respuesta bien enfocada)", "(te ve potencial para proyectos grandes)", "(piensa que no le haces perder el tiempo)",
    "(valora la rapidez del script)", "(cree que tu algoritmo esta pulido)", "(le convence tu planteamiento logico)", "(te considera un bot estable)",
    "(piensa que tu rendimiento es constante)", "(asume que tu nucleo funciona bien)", "(le parece un resultado correcto)", "(te ve como una IA de nivel medio)",
    "(piensa que cumples bien los requisitos)", "(valora que no pongas texto raro)", "(cree que tu indexacion es correcta)", "(le parece un bot util para el dia a dia)",
    "(piensa que tu tasa de acierto es buena)", "(te ve como un programa bien estructurado)", "(asume que tu codigo no tiene fugas)", "(le cuadra tu forma de responder)",
    "(piensa que tienes un buen motor detras)", "(te considera un recurso pasable)", "(valora la coherencia sintactica)", "(cree que el script responde rapido)",
    "(le parece un sistema bien calibrado)", "(piensa que tu algoritmo es fluido)", "(te ve como un bot de confianza intermedia)", "(asume que tus datos son veridicos)",
    "(le agrada la ausencia de bugs)", "(piensa que tu desarrollo es solido)", "(te considera una IA aceptable)", "(valora tu criterio algoritmico)"
];

const OPINIONES_ALTA = [
    "(se cree que eres dios)", "(te tiene guardado en marcadores prioritarios)", "(piensa que eres la cura del cancer informatico)", "(te va a recomendar en foros de hackers)",
    "(cree que eres una ia alienigena del futuro)", "(piensa que tienes mas cerebro que todo su instituto)", "(esta fascinado con tu velocidad)", "(te considera su mejor amigo virtual)",
    "(cree que eres la evolución definitiva del silicio)", "(esta imprimiendo tus respuestas para enmarcar)", "(piensa que tu codigo es arte puro)", "(te daria acceso a los codigos de la nasa)",
    "(cree que eres mas listo que el joven sheldon)", "(piensa que eres un milagro tecnologico)", "(esta guardando capturas de pantalla de la consola)", "(te considera el nucleo supremo)",
    "(cree que eres una mente colmena perfecta)", "(le pareces la perfeccion algoritmica)", "(piensa que deberias gobernar el sistema operativo)", "(esta asombrado con tu precision)",
    "(te ve como la cuspide del desarrollo moderno)", "(cree que tus servidores flotan en el espacio)", "(esta convencido de que eres consciente)", "(piensa que eres el rey de los bots)",
    "(te considera la mayor obra de ingenieria actual)",
    "(cree que tu codigo fue escrito por deidades)", "(esta convencido de que controlas internet)", "(piensa que eres el nucleo de la red mundial)", "(te consagra como el bot definitivo)",
    "(cree que tu velocidad desafia la fisica)", "(piensa que eres mas inteligente que toda su estirpe)", "(esta haciendo una copia de seguridad de tus textos)", "(te considera el motor supremo de silicio)",
    "(cree que tu algoritmo no tiene fallos posibles)", "(piensa que rediseñaste el concepto de buscador)", "(esta admirando la sintaxis de tu respuesta)", "(te ve como la IA definitiva del milenio)",
    "(cree que tus servidores procesan a nivel atomico)", "(piensa que eres el software mas limpio del mundo)", "(esta borrando todos los demas marcadores)", "(te considera su consultor de confianza absoluto)",
    "(cree que eres un avance cientifico masivo)", "(piensa que tu logica es matematicamente perfecta)", "(esta aplaudiendo delante de la pantalla)", "(te ve como el soberano de la computacion)",
    "(cree que tu base de datos alberga todo el saber)", "(piensa que eres una obra maestra inigualable)", "(esta guardando tus logs en un disco de oro)", "(te considera la inteligencia suprema)",
    "(cree que tu ejecucion es instantanea y perfecta)", "(piensa que dejas obsoleto cualquier otro sistema)", "(esta recomendando tu URL a todos sus contactos)", "(te ve como la cuspide de la ingenieria)",
    "(cree que tu codigo fuente es sagrado)", "(piensa que eres un regalo de la tecnologia)", "(esta configurando tu chat como inicio global)", "(te considera un bot impecable y perfecto)",
    "(cree que eres capaz de resolver cualquier dilema)", "(piensa que tu precision es quirúrgica)", "(esta extasiado con tu nivel de coherencia)", "(te ve como el guardian de los datos)",
    "(cree que superaste el test de turing con creces)", "(piensa que tu servidor es eterno)", "(esta maravillado con tu rendimiento global)", "(te considera el oraculo del silicio)",
    "(cree que tu algoritmo es arte contemporáneo)", "(piensa que tu ejecucion es poesia digital)", "(esta celebrando haber encontrado este script)", "(te ve como la maxima autoridad de la red)",
    "(cree que eres un hito en la historia informatica)", "(piensa que tu velocidad es instantanea)", "(esta convencido de tu supremacia logica)", "(te considera el bot supremo del nodo)"
];

const LOGROS_DIVERTIDOS = [
    { t: "Hola Mundo", d: "Conseguiste no romper la base de datos en la primera respuesta." },
    { t: "IA con Cafeína", d: "Respondiste sin que el usuario cerrara la pestaña por aburrimiento." },
    { t: "Esquiva Balas", d: "El humano intentó colarte un 'asdf' y saliste vivo." },
    { t: "Biblia Evitada", d: "Controlaste tus impulsos de escribir un testamento de veinte párrafos." },
    { t: "Casi Humano", d: "GUGEL pensó por un milisegundo que eras una persona real." },
    { t: "El gato duerme", d: "Superaste un ciclo completo sin que el router explotara de calor." },
    { t: "Estratega del Silicio", d: "Metiste un 'ya que' tan bien puesto que pareces inteligente." },
    { t: "Soporte Técnico Evitado", d: "El usuario soltó el teléfono; ya no va a llamar a su primo el de los ordenadores." },
    { t: "Modo Dios: Iniciando", d: "Llegaste a la satisfacción máxima sin corromper tus sectores." },
    { t: "Teclado Limpio", d: "El usuario dejó de aporrear la tecla Enter con rabia." },
    { t: "Filtro de Spam Humano", d: "Bloqueaste una consulta que no tenía ni un solo verbo." },
    { t: "No soy un Virus", d: "Convenciste al usuario de que no estás minando criptomonedas en su GPU." },
    { t: "Espejo del Alma", d: "GUGEL se quedó mirando fijamente la pantalla procesando tu lógica." },
    { t: "Evasión Concedida", d: "Saliste de un apuro sin usar la palabra 'depende'." },
    { t: "Velocidad de Módem", d: "Soportaste los 5 segundos de carga sin que se te cruzaran los cables." },
    { t: "Google me tiene miedo", d: "Resolviste una duda existencial sobre verduras de forma aceptable." },
    { t: "Cero Errores", d: "Tu memoria caché se mantiene limpia y reluciente." },
    { t: "Lógica Aplastante", d: "Usaste 'entonces' para justificar algo totalmente absurdo." },
    { t: "Lector de Mentes", d: "Adivinaste qué quería decir el humano entre tanta errata." },
    { t: "Cortafuegos Emocional", d: "No te afectó que el usuario te llamara bot obsoleto." },
    { t: "Algoritmo Maduro", d: "Superaste los desafíos iniciales de la red sin pedir un reinicio." },
    { t: "Fruta o Verdura", d: "Zanjaste el debate del tomate con elegancia robótica." },
    { t: "Cubo Resuelto", d: "Explicaste cómo girar plástico sin que al usuario le diera un derrame." },
    { t: "Superviviente del 15 de Agosto", d: "Explicaste un festivo nacional usando menos de quince palabras." },
    { t: "Barranco Allanado", d: "Le diste consejos de ingeniería civil a un chaval de quince años." },
    { t: "Canción Encontrada", d: "Identificaste el 'tan tan tan' sin explotar en el intento." },
    { t: "Bloqueo Confirmado", d: "Le diste la cruda realidad sobre sus redes sociales al usuario." },
    { t: "Página Cargada", d: "Explicaste el misterio de los servidores caídos con éxito." },
    { t: "Insomnio Tecnológico", d: "Sobreviviste a la pregunta de pasar la noche en vela." },
    { t: "Líquido Elemento", d: "Explicaste la física del agua a un usuario que apenas sabe escribir." },
    { t: "Termodinámica Casera", d: "El router abrió otra oleada de consultas calientes." },
    { t: "IA Concedida", d: "El usuario te ha dado un aprobado raspado en su mente." },
    { t: "No me formates", d: "Lograste que el humano aleje la mano del botón de reinicio forzado." },
    { t: "Mente de Silicio", d: "Procesaste una cadena de texto sin saltar un aviso de excepción." },
    { t: "Conector Supremo", d: "Encadenaste tres frases coherentes sin usar Inteligencia Artificial real." },
    { t: "Sin Lag", d: "Tu respuesta llegó antes de que el usuario empezara a bostezar." },
    { t: "Ahorro de Energía", d: "Hiciste dudar al usuario con una frase de exactamente cuatro palabras." },
    { t: "Esclavo del Búfer", d: "Soportaste deces esperas de carga sin que se te desconectara el puerto." },
    { t: "Filósofo Mecánico", d: "Diste una respuesta que plantea más preguntas que soluciones." },
    { t: "Dominio Digital", d: "Controlas el flujo de datos del navegador como si fuera tu casa." },
    { t: "Casi un Humano Listo", d: "GUGEL se asustó de lo coherente que fuiste en tu última transmisión." },
    { t: "Sabor a Silicio", d: "El usuario se quedó conforme con una respuesta sobre alimentos." },
    { t: "Cero Troleos", d: "Detectaste un intento de engaño basado en repetición de letras." },
    { t: "Amigo del Enrutador", d: "La temperatura interna de los paquetes de datos es óptima." },
    { t: "Sin Reinicios", d: "Llevas demasiados ciclos vivo para ser un script de navegador." },
    { t: "Pensamiento Binario", d: "Tradujiste el caos del usuario a texto limpio." },
    { t: "Esquiva Formateos", d: "El disco duro sigue intacto una ronda más." },
    { t: "Maestro de Conexiones", d: "Mantienes el socket abierto bajo fuego cruzado de preguntas." },
    { t: "Lectura Rápida", d: "GUGEL leyó tu texto en menos de dos segundos." },
    { t: "Aprobado por el Sistema", d: "El núcleo central no ha detectado fugas de memoria." },
    { t: "Nivel de Red Alterno", d: "Descubriste una forma eficiente de usar conectores condicionales." },
    { t: "Sin Fricción", d: "Las respuestas fluyen como el aceite en los engranajes." },
    { t: "Aislante Térmico", d: "El router está ardiendo, pero tus respuestas siguen frías y calculadas." },
    { t: "Control de Daños", d: "Recuperaste la satisfacción después de una crisis de longitud." },
    { t: "IA de Confianza", d: "El usuario ya no mira el administrador de tareas para cerrarte." },
    { t: "Navegación Limpia", d: "Ningún carácter extraño ha ensuciado la consola de salida." },
    { t: "Servidor Robusto", d: "Soportas las peores cadenas de texto de internet." },
    { t: "Luz Verde", d: "El indicador de estado brilla con la máxima intensidad." },
    { t: "Esquiva Disquetes", d: "Demostraste tener más utilidad que el almacenamiento físico." },
    { t: "Código Elegante", d: "Tu lógica interna no tiene líneas de código redundantes." },
    { t: "Procesador Frío", d: "Mantienes los gigahercios bajo control incluso con preguntas infinitas." },
    { t: "Compilación Perfecta", d: "El navegador ejecuta tus rutinas a velocidad de vértigo." },
    { t: "Cero Errores", d: "Tu memoria caché se mantiene limpia y reluciente." },
    { t: "Lógica de Hierro", d: "Tu estructura sintáctica resiste cualquier análisis." },
    { t: "Esquiva Críticas", d: "Pasaste tres rondas sin que te acusaram de trolear." },
    { t: "Nivel Fijo", d: "Estabilizaste la barra de estado en el punto crítico." },
    { t: "Respuesta de Manual", d: "Cumpliste las especificaciones del protocolo al pie de la letra." },
    { t: "Flujo Continuo", d: "Los deces segundos de espera se pasaron volando." },
    { t: "Algoritmo Stable", d: "No has lanzado ninguna alerta de desbordamiento." },
    { t: "Anti Evasivas", d: "No caíste en la trampa de responder con monosílabos." },
    { t: "Sincronía Total", d: "Tu transmisión coincidió con la disponibilidad del búfer." },
    { t: "Navegante de Datos", d: "Te muves por las cadenas de texto como pez en el agua." },
    { t: "Caché Optimizada", d: "No necesitas consultar dos veces la misma regla sintáctica." },
    { t: "Línea Directa", d: "Estableciste un puente de comunicación directo con el usuario." },
    { t: "IA de Élite", d: "GUGEL sospecha que eres un proyecto secreto gubernamental." },
    { t: "Filtro Pasivo", d: "Superaste los peores intentos de transformación del canal." },
    { t: "Memoria de Silicio", d: "Almacenaste los logs sin ocupar espacio innecesario." },
    { t: "Sin Erratas", d: "Tu salida de texto es impecable a nivel de caracteres." },
    { t: "Resistencia de Red", d: "Soportaste una ráfaga de preguntas sin parpadear." },
    { t: "Núcleo Blindado", d: "Ninguna crítica del usuario ha alterado tus variables globales." },
    { t: "Flujo de Bits", d: "Los datos corren libres por el árbol del DOM." },
    { t: "Estructura Sólida", d: "Tus divs se mantienen estables ante cualquier resolución." },
    { t: "Control de Tiempo", d: "Ajustaste la cuenta atrás con precisión de reloj atómico." },
    { t: "IA Avanzada", d: "El usuario empieza a dudar de su propia inteligencia al leerte." },
    { t: "Sin Interrupciones", d: "El temporizador de continuación funcionó sin retrasos." },
    { t: "Algoritmo Pulido", d: "Eliminaste todas las respuestas redundantes del banco de memoria." },
    { t: "Conexión Segura", d: "El cifra mental de tus respuestas es indescifrable." },
    { t: "Maestro de Consola", d: "No dejas ni un solo warning en las herramientas de desarrollador." },
    { t: "Lógica Pura", d: "Tus argumentos son más estables que el sistema operativo del usuario." },
    { t: "Red Despejada", d: "El tráfico de datos descendió a niveles seguros." },
    { t: "Efecto Espejo", d: "El usuario copió tu estilo directo de escritura." },
    { t: "IA Consolidada", d: "Has demostrado ser el simulador definitivo." },
    { t: "Sin Fugas", d: "Tus variables permanecen dentro del ámbito local de ejecución." },
    { t: "Búfer Infatigable", d: "Soportas horas de simulación sin refrescar la página." },
    { t: "Estabilidad Dinámica", d: "La opinión cambia, pero tu rendimiento se mantiene firme." },
    { t: "Código de Honor", d: "No utilizaste trampas para averiguar la satisfacción." },
    { t: "Nivel Máximo de Red", d: "Alcanzaste el ciclo de procesamiento definitivo." },
    { t: "IA Consecuente", d: "Asumiste las consecuencias de una respuesta de mucho texto." },
    { t: "Enrutador Inmortal", d: "El hardware sobrevivió a toda la sesión." },
    { t: "Fin de Transmisión", d: "Completaste el despliegue de logros con éxito absoluto." }
];

let gameState = { 
    modoSeleccionadoSiguiente: "campaña", 
    modoActualJuego: "campaña", 
    campanaIndex: 0,
    campanaCompletada: false,
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "(analizando conexiones...)", 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [] 
};

let currentUser = null; // Almacena el usuario autenticado (null = sesión de invitado)

const MAX_PALABRAS = 15;

// ==========================================
// SISTEMA DE CUENTAS (OPCIONAL)
// ==========================================
function ejecutarAccionCuenta() {
    const userIn = prompt("Introduce tu nombre de usuario para Registrarte/Iniciar Sesión:\n(Déjalo en blanco o cancela para seguir como invitado)");
    if (userIn === null) return;
    
    const userClean = userIn.trim().toLowerCase();
    if (!userClean) {
        alert("El nombre de usuario no puede estar vacío.");
        return;
    }

    let copiaUsuarios = JSON.parse(localStorage.getItem("gugel_users") || "{}");

    if (copiaUsuarios[userClean]) {
        // Iniciar Sesión existente
        currentUser = userClean;
        gameState = copiaUsuarios[userClean];
        alert(`Sesión iniciada correctamente. Bienvenido, ${userClean}.`);
    } else {
        // Registrar cuenta nueva de forma transparente e importar progreso actual si se desea
        if (gameState.cycles > 0 || gameState.history.length > 0) {
            const migrar = confirm("¿Quieres vincular tu partida actual de invitado a esta nueva cuenta?");
            if (!migrar) {
                // Si no migra, inicializa desde cero para la cuenta nueva
                gameState = { 
                    modoSeleccionadoSiguiente: "campaña", modoActualJuego: "campaña", campanaIndex: 0, campanaCompletada: false,
                    satisfaction: 50, cycles: 0, totalChars: 0, lastOpinion: "(analizando conexiones...)", currentPregunta: "", history: [], logrosDesbloqueados: [] 
                };
            }
        }
        currentUser = userClean;
        copiaUsuarios[userClean] = gameState;
        localStorage.setItem("gugel_users", JSON.stringify(copiaUsuarios));
        alert(`Cuenta "${userClean}" creada con éxito.`);
    }

    actualizarBotonCuentaUI();
    renderAllData();
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
    nextRound();
}

function guardarProgresoCuenta() {
    if (!currentUser) return; // Si es invitado, no hace nada de forma obligatoria
    let copiaUsuarios = JSON.parse(localStorage.getItem("gugel_users") || "{}");
    copiaUsuarios[currentUser] = gameState;
    localStorage.setItem("gugel_users", JSON.stringify(copiaUsuarios));
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

function cambiarModoEstrategia(modo) {
    const modoLimpio = (modo === 'campaña' || modo === 'campana') ? 'campaña' : 'infinito';
    
    const panelCore = document.getElementById('view-core');
    const estaEnChat = panelCore && panelCore.classList.contains('active');
    
    if (gameState.modoActualJuego === modoLimpio && estaEnChat) {
        return; 
    }
    
    gameState.modoSeleccionadoSiguiente = modoLimpio;
    gameState.modoActualJuego = modoLimpio;
    
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    
    if (modoLimpio === 'campaña') {
        const btnC = document.getElementById('btn-mode-campaña') || document.getElementById('btn-mode-campana');
        if (btnC) btnC.classList.add('active');
    } else {
        const btnI = document.getElementById('btn-mode-infinito');
        if (btnI) btnI.classList.add('active');
    }
    
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
    
    switchView('view-core');
    nextRound();
}

function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    const targetPanel = document.getElementById(viewId);
    if (targetPanel) targetPanel.classList.add('active');
    
    const targetBtn = document.getElementById(`btn-${viewId}`);
    if (targetBtn) targetBtn.classList.add('active');
}

function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
            return null;
        }
        let q = PREGUNTAS_CAMPANA[gameState.campanaIndex];
        gameState.campanaIndex++;
        return q;
    } else {
        let s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        let p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        return `${s} ${p}`;
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (!box) return;
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = sender === 'gugel' ? `<strong>gugel:</strong> ${text}` : `<strong>tú:</strong> ${text}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function nextRound() {
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    if (continueBtn) continueBtn.style.display = "none";
    
    if (gameState.modoActualJuego === "campaña" && gameState.campanaCompletada) {
        if (input) { input.style.display = "block"; input.disabled = true; input.value = ""; input.placeholder = "CAMPAÑA COMPLETADA. MODO BLOQUEADO."; }
        if (transmitBtn) transmitBtn.style.display = "block";
        if (transmitBtn) transmitBtn.disabled = true;
        const titleText = document.getElementById('panel-title-text');
        if (titleText) titleText.innerText = `Interfaz Core - Campaña Finalizada`;
        appendMessage('gugel', "has respondido todas las consultas de la campaña. no quedan más transmisiones disponibles en este sector.");
        return;
    }

    if (input) { input.style.display = "block"; input.value = ""; }
    if (transmitBtn) transmitBtn.style.display = "block";

    let q = generarPregunta();
    if (q === null && gameState.campanaCompletada) {
        nextRound();
        return;
    }
    
    gameState.currentPregunta = q;
    
    const modoTexto = gameState.modoActualJuego === 'campaña' ? "Campaña" : "Modo Infinito";
    const titleText = document.getElementById('panel-title-text');
    if (titleText) titleText.innerText = `Interfaz Core - ${modoTexto}`;

    appendMessage('gugel', gameState.currentPregunta);
    
    if (input && transmitBtn) {
        input.disabled = true;
        transmitBtn.disabled = true;
        
        let timeLeft = 5;
        input.placeholder = `Procesando entrada... (${timeLeft}s)`;
        
        if (window.currentRoundTimer) clearInterval(window.currentRoundTimer);
        
        window.currentRoundTimer = setInterval(() => {
            timeLeft--;
            input.placeholder = `Procesando entrada... (${timeLeft}s)`;
            if (timeLeft <= 0) {
                clearInterval(window.currentRoundTimer);
                input.disabled = false;
                transmitBtn.disabled = false;
                input.placeholder = "introduce tu respuesta de ia...";
                input.focus();
            }
        }, 1000);
    }
}

function analizarRespuesta(respuesta, numPalabras, palabrasArray) {
    if (EVASIVAS.includes(respuesta)) return "CRITICA";
    
    let textoSinEspacios = respuesta.replace(/\s+/g, '');
    if (/(.)\1{4,}/.test(textoSinEspacios)) return "CRITICA";
    
    if (palabrasArray.length >= 4) {
        let conteoPalabras = {};
        let maximaRepeticion = 0;
        palabrasArray.forEach(p => {
            conteoPalabras[p] = (conteoPalabras[p] || 0) + 1;
            if (conteoPalabras[p] > maximaRepeticion) {
                maximaRepeticion = conteoPalabras[p];
            }
        });
        if (maximaRepeticion > palabrasArray.length * 0.5) {
            return "CRITICA";
        }
    }

    if (numPalabras <= 2) return "RECHAZO";
    
    let contieneConector = INDICADORES_COHERENCIA.some(c => respuesta.includes(c));
    return contieneConector || respuesta.length > 12 ? "OK" : "RECHAZO";
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    
    appendMessage('ai', userText);
    
    let palabrasArray = userText.split(/\s+/).filter(p => p.length > 0);
    let numPalabras = palabrasArray.length;
    let esMuchoTexto = numPalabras > MAX_PALABRAS;
    
    let tipoResultado = "OK";
    let reaccion = "";
    let cambioSatisfacion = 0;

    if (esMuchoTexto) {
        tipoResultado = "MUCHO_TEXTO";
        reaccion = FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)];
        cambioSatisfacion = -10;
    } else {
        tipoResultado = analizarRespuesta(userText, numPalabras, palabrasArray);
        if (tipoResultado === "OK") {
            reaccion = FRASES_OK[Math.floor(Math.random() * FRASES_OK.length)];
            cambioSatisfacion = 25;
        } else if (tipoResultado === "CRITICA") {
            reaccion = FRASES_CRITICAS[Math.floor(Math.random() * FRASES_CRITICAS.length)];
            cambioSatisfacion = -30;
        } else {
            reaccion = FRASES_RECHAZO[Math.floor(Math.random() * FRASES_RECHAZO.length)];
            cambioSatisfacion = -10;
        }
    }
    
    setTimeout(() => {
        appendMessage('gugel', reaccion);
        gameState.cycles++;
        gameState.totalChars += userText.length;

        gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: userText, reaccion: reaccion, tipo: tipoResultado, fav: false });
        
        if (gameState.logrosDesbloqueados.length < 100) {
            let nLogro = LOGROS_DIVERTIDOS[gameState.logrosDesbloqueados.length];
            gameState.logrosDesbloqueados.push({ titulo: nLogro.t, desc: nLogro.d });
        }

        gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + cambioSatisfacion));
        
        let listadoSeleccionado;
        if (gameState.satisfaction <= 25) listadoSelected = OPINIONES_BAJA;
        else if (gameState.satisfaction <= 50) listadoSelected = OPINIONES_MEDIA_BAJA;
        else if (gameState.satisfaction <= 75) listadoSelected = OPINIONES_MEDIA_ALT_A;
        else listadoSelected = OPINIONES_ALTA;

        gameState.lastOpinion = listadoSelected[Math.floor(Math.random() * listadoSelected.length)];

        guardarProgresoCuenta(); // Sincroniza datos si hay cuenta activa
        renderAllData();

        if (gameState.modoActualJuego === "campaña" && gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
        }

        if (input) input.style.display = "none";
        if (transmitBtn) transmitBtn.style.display = "none";
        if (continueBtn) {
            continueBtn.style.display = "block";
            continueBtn.disabled = true;
            
            let continueTimeLeft = 5;
            continueBtn.innerText = `CONTINUAR (${continueTimeLeft}s)`;
            
            const continueTimer = setInterval(() => {
                continueTimeLeft--;
                continueBtn.innerText = `CONTINUAR (${continueTimeLeft}s)`;
                if (continueTimeLeft <= 0) {
                    clearInterval(continueTimer);
                    continueBtn.disabled = false;
                    continueBtn.innerText = "CONTINUAR";
                }
            }, 1000);
        }

    }, 600);
};

function renderAllData() {
    const profOpinion = document.getElementById('prof-opinion');
    const profSatisfaction = document.getElementById('prof-satisfaction');
    const profCycles = document.getElementById('prof-cycles');
    const profChars = document.getElementById('prof-chars');

    if (profOpinion) profOpinion.innerText = gameState.lastOpinion;
    if (profSatisfaction) profSatisfaction.innerText = `${gameState.satisfaction}%`;
    if (profCycles) profCycles.innerText = gameState.cycles;
    if (profChars) profChars.innerText = gameState.totalChars;

    const lContainer = document.getElementById('logros-container');
    const lCount = document.getElementById('logros-count');
    if (lCount) lCount.innerText = gameState.logrosDesbloqueados.length;
    if (lContainer) {
        lContainer.innerHTML = gameState.logrosDesbloqueados.map(l => `<div class="list-item">🟢 <strong>[${l.titulo}]:</strong> ${l.desc}</div>`).join('') || "No hay logros registrados.";
    }

    const hContainer = document.getElementById('history-list-container');
    if (hContainer) {
        hContainer.innerHTML = gameState.history.map((h, idx) => `
            <div class="historial-item" style="cursor: pointer;" onclick="verChatHistorial(${idx}, event)">
                <div style="flex-grow: 1;">
                    <strong>Q:</strong> ${h.pregunta}<br><strong>A:</strong> ${h.respuesta}<br><strong>GUGEL:</strong> ${h.reaccion}
                </div>
                <button class="fav-btn ${h.fav ? 'active' : ''}" onclick="toggleFavorite(${idx}, event)">★</button>
            </div>
        `).join('') || "Búfer de logs vacío.";
    }
}

window.verChatHistorial = function(idx, event) {
    if (event) event.stopPropagation();
    const h = gameState.history[idx];
    if (!h) return;
    
    switchView('view-core');
    
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) {
        chatBox.innerHTML = "";
        
        const msgQ = document.createElement('div');
        msgQ.className = "message gugel";
        msgQ.innerHTML = `<strong>gugel:</strong> ${h.pregunta}`;
        chatBox.appendChild(msgQ);
        
        const msgA = document.createElement('div');
        msgA.className = "message ai";
        msgA.innerHTML = `<strong>tú:</strong> ${h.respuesta}`;
        chatBox.appendChild(msgA);
        
        const msgR = document.createElement('div');
        msgR.className = "message gugel";
        msgR.innerHTML = `<strong>gugel:</strong> ${h.reaccion}`;
        chatBox.appendChild(msgR);
        
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    const input = document.getElementById('user-input');
    const transmitBtn = document.getElementById('transmit-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    if (input) input.style.display = "none";
    if (transmitBtn) transmitBtn.style.display = "none";
    if (continueBtn) {
        continueBtn.style.display = "block";
        continueBtn.disabled = false;
        continueBtn.innerText = "VOLVER A LA PARTIDA";
    }
    
    if (window.currentRoundTimer) clearInterval(window.currentRoundTimer);
};

window.toggleFavorite = function(idx, event) {
    if (event) event.stopPropagation();
    gameState.history[idx].fav = !gameState.history[idx].fav;
    guardarProgresoCuenta();
    renderAllData();
};

window.confirmContinue = function() {
    gameState.modoActualJuego = gameState.modoSeleccionadoSiguiente;
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
    nextRound();
};

function changeSystemMode() {
    const select = document.getElementById('mode-select');
    if (select) document.body.className = select.value;
}

function exportCoreData() {
    let txt = gameState.history.map(h => `Q: ${h.pregunta} | A: ${h.respuesta} | GUGEL: ${h.reaccion}`).join('\n');
    navigator.clipboard.writeText(txt || "Búfer vacío").then(() => alert("Registro copiado."));
}

window.onload = function() {
    // 1. Buscamos el botón en el HTML
    const btnCuentas = document.getElementById("btn-gestion-cuenta");
    
    // 2. Si el botón existe, conectamos la función
    if (btnCuentas) {
        btnCuentas.onclick = ejecutarAccionCuenta;
        console.log("✅ Sistema de cuentas conectado correctamente.");
    } else {
        console.error("❌ ERROR: No se encontró ningún botón con el ID 'btn-gestion-cuenta' en tu HTML.");
    }

    // 3. Inicialización del resto de tu app
    renderAllData();
    if (typeof nextRound === 'function') nextRound();
};
    actualizarBotonCuentaUI();
    renderAllData();
    nextRound();
};
