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

// GENERACIÓN DE LAS 100 OPINIONES SEGÚN RANGOS DE SATISFACCIÓN
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

// GENERACIÓN DE LOS 100 LOGROS
const GENERADOR_LOGROS = [];
for (let i = 1; i <= 100; i++) {
    GENERADOR_LOGROS.push({
        titulo: `Logro Core #${i}`,
        desc: `Fase de optimizacion del nucleo superada con exito en el ciclo operacional numero ${i}.`
    });
}

let gameState = { 
    modoSeleccionadoSiguiente: "campaña", // Almacena la seleccion sin reiniciar el chat
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

// CORRECCIÓN CLAVE: NO REINICIA LA PREGUNTA AL CLICAR LOS BOTONES DE MODO
function cambiarModoEstrategia(modo) {
    gameState.modoSeleccionadoSiguiente = modo;
    
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-mode-${modo}`).classList.add('active');
    
    // Solo cambia visualmente el encabezado para indicar que la proxima pregunta sera de ese modo
    const modoTexto = modo === 'campaña' ? "Campaña" : "Modo Infinito";
    document.getElementById('panel-title-text').innerText = `Interfaz Core - ${modoTexto}`;
    
    // Nos asegura de llevar al usuario a la pantalla del chat sin alterar la pregunta actual
    switchView('view-core');
}

function switchView(viewId) {
    // Correccion de superposición eliminando la clase active de todas las vistas antes de asignar
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(viewId).classList.add('active');
    
    const targetBtn = document.getElementById(`btn-${viewId}`);
    if (targetBtn) targetBtn.classList.add('active');
}

function generarPregunta() {
    // Sincroniza el modo real de ejecucion al empezar una nueva ronda limpia
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
    appendMessage('gugel', gameState.currentPregunta);
    
    input.disabled = true;
    transmitBtn.disabled = true;
    
    let timeLeft = 5;
    input.placeholder = `Procesando conexión... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `Procesando conexión... (${timeLeft}s)`;
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
        
        // Asignacion de logros de la lista de 100 progresivamente
        if (gameState.logrosDesbloqueados.length < 100) {
            gameState.logrosDesbloqueados.push(GENERADOR_LOGROS[gameState.logrosDesbloqueados.length]);
        }

        gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction + cambioSatisfacion));
        
        // ASIGNACIÓN EXCLUSIVA DE LAS 100 OPINIONES SEGÚN RANGO
        let listadoSeleccionado;
        if (gameState.satisfaction <= 25) listadoSeleccionado = OPINIONES_BAJA;
        else if (gameState.satisfaction <= 50) listadoSeleccionado = OPINIONES_MEDIA_BAJA;
        else if (gameState.satisfaction <= 75) listadoSeleccionado = OPINIONES_MEDIA_ALT_A;
        else listadoSeleccionado = OPINIONES_ALTA;

        // Selecciona una opinion de las 25 disponibles de ese rango especifico de forma aleatoria
        gameState.lastOpinion = listadoSeleccionado[Math.floor(Math.random() * listadoSeleccionado.length)];

        renderAllData();
    }, 600);

    input.value = "";
    input.style.display = "none";
    transmitBtn.style.display = "none";
    continueBtn.style.display = "block";
};

function renderAllData() {
    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;

    // Render Logros
    const lContainer = document.getElementById('logros-container');
    document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    lContainer.innerHTML = gameState.logrosDesbloqueados.map(l => `<div class="list-item">🟢 <strong>[${l.titulo}]:</strong> ${l.desc}</div>`).join('') || "No hay logros registrados.";

    // Render Historial
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
