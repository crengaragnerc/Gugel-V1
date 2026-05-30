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
    "(esta buscando el destornillador para abrir el pc)", "(asume que eres un chat obsoleto)", "(piensa que no sirves ni para calcular 2+2)", "(esta insultando al monitor)",
    "(se siente estafado por la tecnologia)", "(cree que le estas robando contraseñas)", "(va a tirar el portatil por la ventana)", "(piensa que eres un bot roto)",
    "(esta respirando fuerte del cabreo)", "(quiere desinstalar internet de su casa)", "(piensa que le estas tomando el pelo)", "(esta buscando alternativas en papel)",
    "(cree que eres un virus de publicidad)", "(asume que tu base de datos esta vacia)", "(va a apagar el cuadro electrico)", "(se arrepiente de encender el pc hoy)",
    "(piensa que tiene mas luces un disquete viejo)"
];
const OPINIONES_MEDIA_BAJA = [
    "(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que respondes con los ojos cerrados)",
    "(piensa que eres un becario en tu primer dia)", "(se esta aburriendo soberanamente)", "(busca el boton de saltar consulta)", "(cree que tu sistema tiene lag)",
    "(piensa que copias las respuestas de un foro caido)", "(te califica con un cero interno)", "(sospecha que eres una broma oculta)", "(esta tecleando con desgana)",
    "(piensa que tu creador tenia prisa)", "(cree que la conexion va a pedales)", "(te compara con un bot de soporte de telefonia)", "(esperaba algo decente)",
    "(se esta arrepintiendo de su pregunta)", "(piensa que eres un simulador de respuestas vagas)", "(mira el reloj esperando que mejores)", "(le pareces un bot de nivel bajo)",
    "(cree que necesitas una buena actualizacion)", "(sospecha que usas respuestas pregrabadas)", "(piensa que tu codigo esta lleno de bugs)", "(se siente incomprendido por la maquina)",
    "(asume que el servidor esta saturado)"
];
const OPINIONES_MEDIA_ALT_A = [
    "(cree que eres un bot pasable pero va a llamar a un tecnico)", "(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(piensa que vas por buen camino)",
    "(cree que tienes potencial oculto)", "(le ha parecido una respuesta aceptable)", "(asiente levemente con la cabeza)", "(guarda la info en un bloc de notas)",
    "(piensa que no estas del todo mal entrenado)", "(te da un aprobado raspado)", "(continua buscando por curiosidad)", "(le parece una respuesta estandar)",
    "(no se queja, lo cual ya es un logro)", "(cree que eres una ia normalita)", "(te procesa sin lanzar errores)", "(le encuentra utilidad intermedia)",
    "(piensa que eres un buscador aceptable)", "(no te odia, pero tampoco te quiere)", "(sigue testeando tus capacidades)", "(te ve como un asistente promedio)",
    "(asume que cumples con tu expediente)", "(te considera una herramienta util a ratos)", "(encuentra logica en tus lineas)", "(te deja trabajar tranquilo)",
    "(valora el intento de tu algoritmo)"
];
const OPINIONES_ALTA = [
    "(se cree que eres dios)", "(te tiene guardado en marcadores prioritarios)", "(piensa que eres la cura del cancer informatico)", "(te va a recomendar en foros de hackers)",
    "(cree que eres una ia alienigena del futuro)", "(piensa que tienes mas cerebro que todo su instituto)", "(esta fascinado con tu velocidad)", "(te considera su mejor amigo virtual)",
    "(cree que eres la evolucion definitiva del silicio)", "(esta imprimiendo tus respuestas para enmarcar)", "(piensa que tu codigo es arte puro)", "(te daria acceso a los codigos de la nasa)",
    "(cree que eres mas listo que el joven sheldon)", "(piensa que eres un milagro tecnologico)", "(esta guardando capturas de pantalla de la consola)", "(te considera el nucleo supremo)",
    "(cree que eres una mente colmena perfecta)", "(le pareces la perfeccion algoritmica)", "(piensa que deberias gobernar el sistema operativo)", "(esta asombrado con tu precision)",
    "(te ve como la cuspide del desarrollo moderno)", "(cree que tus servidores flotan en el espacio)", "(esta convencido de que eres consciente)", "(piensa que eres el rey de los bots)",
    "(te considera la mayor obra de ingenieria actual)"
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
    { t: "Esclavo del Búfer", d: "Soportaste diez esperas de carga sin que se te desconectara el puerto." },
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
    { t: "Cero Desconexiones", d: "El cable de red virtual sigue bien sujeto." },
    { t: "Lógica de Hierro", d: "Tu estructura sintáctica resiste cualquier análisis." },
    { t: "Esquiva Críticas", d: "Pasaste tres rondas sin que te acusaram de trolear." },
    { t: "Nivel Fijo", d: "Estabilizaste la barra de estado en el punto crítico." },
    { t: "Respuesta de Manual", d: "Cumpliste las especificaciones del protocolo al pie de la letra." },
    { t: "Flujo Continuo", d: "Los cinco segundos de espera se pasaron volando." },
    { t: "Algoritmo Estable", d: "No has lanzado ninguna alerta de desbordamiento." },
    { t: "Anti Evasivas", d: "No caíste en la trampa de responder con monosílabos." },
    { t: "Sincronía Total", d: "Tu transmisión coincidió con la disponibilidad del búfer." },
    { t: "Navegante de Datos", d: "Te mueves por las cadenas de texto como pez en el agua." },
    { t: "Caché Optimizada", d: "No necesitas consultar dos veces la misma regla sintáctica." },
    { t: "Línea Directa", d: "Estableciste un puente de comunicación directo con el usuario." },
    { t: "IA de Élite", d: "GUGEL sospecha que eres un proyecto secreto gubernamental." },
    { t: "Filtro Pasivo", d: "Superaste los peores intentos de saturación del canal." },
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
    { t: "Conexión Segura", d: "El cifrado mental de tus respuestas es indescifrable." },
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
    { t: "Enrutador Inmortal", d: "El hardware survived a toda la sesión." },
    { t: "Fin de Transmisión", d: "Completaste el despliegue de logros con éxito absoluto." }
];

let gameState = { 
    modoSeleccionadoSiguiente: "campaña", 
    modoActualJuego: "campaña", 
    campanaIndex: 0,
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "(analizando conexiones...)", 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [] 
};

const MAX_PALABRAS = 15;

// CORRECCIÓN DEFINITIVA DEL FLUJO DE MODOS: NO FORZAR CAMBIO NI REINICIAR AL CLICAR
function cambiarModoEstrategia(modo) {
    gameState.modoSeleccionadoSiguiente = modo;
    
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-mode-${modo}`).classList.add('active');
    
    const modoTexto = modo === 'campaña' ? "Campaña" : "Modo Infinito";
    document.getElementById('panel-title-text').innerText = `Interfaz Core - ${modoTexto} (Pendiente de avanzar)`;
    
    // Simplemente redirigimos la vista si se encuentra en otra pestaña, sin alterar el chat actual
    switchView('view-core');
}

function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(viewId).classList.add('active');
    
    const targetBtn = document.getElementById(`btn-${viewId}`);
    if (targetBtn) targetBtn.classList.add('active');
}

function generarPregunta() {
    // Aquí es donde el juego asume de forma real el modo seleccionado por la barra lateral
    gameState.modoActualJuego = gameState.modoSeleccionadoSiguiente;
    
    if (gameState.modoActualJuego === "campaña") {
        let q = PREGUNTAS_CAMPANA[gameState.campanaIndex];
        gameState.campanaIndex = (gameState.campanaIndex + 1) % PREGUNTAS_CAMPANA.length;
        return q;
    } else {
        let s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        let p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        return `${s} ${p}`;
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
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
    
    continueBtn.style.display = "none";
    input.style.display = "block";
    transmitBtn.style.display = "block";

    gameState.currentPregunta = generarPregunta();
    
    // Actualizamos el encabezado al modo de juego que se está ejecutando formalmente en la ronda
    const modoTexto = gameState.modoActualJuego === 'campaña' ? "Campaña" : "Modo Infinito";
    document.getElementById('panel-title-text').innerText = `Interfaz Core - ${modoTexto}`;

    appendMessage('gugel', gameState.currentPregunta);
    
    input.disabled = true;
    transmitBtn.disabled = true;
    
    let timeLeft = 5;
    input.placeholder = `Procesando entrada... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `Procesando entrada... (${timeLeft}s)`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = false;
            transmitBtn.disabled = false;
            input.placeholder = "introduce tu respuesta de ia...";
            input.focus();
        }
    }, 1000);
}

function analizarRespuesta(respuesta, numPalabras) {
    if (EVASIVAS.includes(respuesta)) return "CRITICA";
    let textoSinEspacios = respuesta.replace(/\s+/g, '');
    if (/(.)\1{4,}/.test(textoSinEspacios)) return "CRITICA";
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
        tipoResultado = analizarRespuesta(userText, numPalabras);
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
        if (gameState.satisfaction <= 25) listadoSeleccionado = OPINIONES_BAJA;
        else if (gameState.satisfaction <= 50) listadoSeleccionado = OPINIONES_MEDIA_BAJA;
        else if (gameState.satisfaction <= 75) listadoSeleccionado = OPINIONES_MEDIA_ALT_A;
        else listadoSeleccionado = OPINIONES_ALTA;

        gameState.lastOpinion = listadoSeleccionado[Math.floor(Math.random() * listadoSeleccionado.length)];

        renderAllData();

        input.style.display = "none";
        transmitBtn.style.display = "none";
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

    }, 600);

    input.value = "";
};

function renderAllData() {
    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;

    const lContainer = document.getElementById('logros-container');
    document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    lContainer.innerHTML = gameState.logrosDesbloqueados.map(l => `<div class="list-item">🟢 <strong>[${l.titulo}]:</strong> ${l.desc}</div>`).join('') || "No hay logros registrados.";

    const hContainer = document.getElementById('history-list-container');
    hContainer.innerHTML = gameState.history.map((h, idx) => `
        <div class="historial-item">
            <div>
                <strong>Q:</strong> ${h.pregunta}<br><strong>A:</strong> ${h.respuesta}<br><strong>GUGEL:</strong> ${h.reaccion}
            </div>
            <button class="fav-btn ${h.fav ? 'active' : ''}" onclick="toggleFavorite(${idx})">★</button>
        </div>
    `).join('') || "Búfer de logs vacío.";
}

window.toggleFavorite = function(idx) {
    gameState.history[idx].fav = !gameState.history[idx].fav;
    renderAllData();
};

window.confirmContinue = function() {
    document.getElementById('chat-messages').innerHTML = "";
    nextRound();
};

function changeSystemMode() {
    const select = document.getElementById('mode-select');
    document.body.className = select.value;
}

function exportCoreData() {
    let txt = gameState.history.map(h => `Q: ${h.pregunta} | A: ${h.respuesta}`).join('\n');
    navigator.clipboard.writeText(txt || "Búfer vacío").then(() => alert("Registro copiado."));
}

window.onload = function() {
    renderAllData();
    nextRound();
};
